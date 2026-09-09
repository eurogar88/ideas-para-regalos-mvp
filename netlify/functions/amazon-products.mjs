const MARKETPLACES = Object.freeze({
  ES: { domain: 'www.amazon.es', tokenRegion: 'EU', currency: 'EUR' },
  US: { domain: 'www.amazon.com', tokenRegion: 'NA', currency: 'USD' },
  GB: { domain: 'www.amazon.co.uk', tokenRegion: 'EU', currency: 'GBP' },
  DE: { domain: 'www.amazon.de', tokenRegion: 'EU', currency: 'EUR' },
  FR: { domain: 'www.amazon.fr', tokenRegion: 'EU', currency: 'EUR' },
  IT: { domain: 'www.amazon.it', tokenRegion: 'EU', currency: 'EUR' },
  CA: { domain: 'www.amazon.ca', tokenRegion: 'NA', currency: 'CAD' }
});

const TOKEN_ENDPOINTS = Object.freeze({
  NA: 'https://api.amazon.com/auth/o2/token',
  EU: 'https://api.amazon.co.uk/auth/o2/token',
  FE: 'https://api.amazon.co.jp/auth/o2/token'
});

const AMAZON_API_URL = 'https://creatorsapi.amazon/catalog/v1/searchItems';
const MAX_QUERIES = 10;
const REQUEST_WINDOW_MS = 60 * 1000;
const REQUESTS_PER_WINDOW = 4;
const requestLog = new Map();
const tokenCache = new Map();

function envValue(name) {
  if (typeof Netlify !== 'undefined' && Netlify.env && typeof Netlify.env.get === 'function') {
    return Netlify.env.get(name) || '';
  }
  return '';
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff'
    }
  });
}

function tokenEndpointFor(version) {
  if (String(version).startsWith('3.1')) return TOKEN_ENDPOINTS.NA;
  if (String(version).startsWith('3.3')) return TOKEN_ENDPOINTS.FE;
  return TOKEN_ENDPOINTS.EU;
}

function partnerTagFor(country) {
  return envValue('AMAZON_PARTNER_TAG_' + country);
}

function normaliseCountry(value) {
  var country = String(value || 'ES').toUpperCase();
  return Object.prototype.hasOwnProperty.call(MARKETPLACES, country) ? country : 'ES';
}

function normaliseQueries(value) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, MAX_QUERIES).map(function (item) {
    if (!item || typeof item !== 'object') return null;
    var id = String(item.id || '').trim().slice(0, 120);
    var query = String(item.query || '').replace(/\s+/g, ' ').trim().slice(0, 180);
    var maxPrice = Number(item.maxPrice);
    if (!id || !query) return null;
    return {
      id: id,
      query: query,
      maxPrice: Number.isFinite(maxPrice) && maxPrice > 0 ? Math.min(Math.round(maxPrice), 100000) : null
    };
  }).filter(Boolean);
}

function isAllowedAmazonUrl(value, domain, partnerTag) {
  try {
    var parsed = new URL(value);
    return parsed.protocol === 'https:' && (parsed.hostname === domain || parsed.hostname === domain.replace(/^www\./, '')) && parsed.searchParams.get('tag') === partnerTag;
  } catch (error) {
    return false;
  }
}

function safeAmazonImageUrl(value) {
  if (!value) return '';
  try {
    var parsed = new URL(String(value));
    var allowedHosts = ['m.media-amazon.com', 'images-na.ssl-images-amazon.com', 'images-eu.ssl-images-amazon.com', 'images-fe.ssl-images-amazon.com', 'images.amazon.com'];
    return parsed.protocol === 'https:' && allowedHosts.indexOf(parsed.hostname) !== -1 ? parsed.toString() : '';
  } catch (error) {
    return '';
  }
}

function firstValue(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return firstValue(value[0]);
  if (typeof value === 'object') {
    if (value.displayValue !== undefined) return firstValue(value.displayValue);
    if (value.displayAmount !== undefined) return firstValue(value.displayAmount);
    if (value.amount !== undefined) return firstValue(value.amount);
    if (value.url !== undefined) return firstValue(value.url);
  }
  return '';
}

function normaliseItem(item, requestId, marketplace, partnerTag) {
  if (!item || !item.asin || !isAllowedAmazonUrl(item.detailPageURL, marketplace.domain, partnerTag)) return null;
  var title = firstValue(item.itemInfo && item.itemInfo.title);
  var image = item.images && item.images.primary && (item.images.primary.large || item.images.primary.medium || item.images.primary.small);
  var listing = item.offersV2 && Array.isArray(item.offersV2.listings) ? item.offersV2.listings[0] : null;
  var price = listing && listing.price ? listing.price : null;
  var priceAmount = price && Number(price.amount);
  var priceDisplay = price && firstValue(price.displayAmount);
  if (!title || !price || !Number.isFinite(priceAmount) || priceAmount <= 0) return null;
  return {
    requestId: requestId,
    asin: String(item.asin).slice(0, 20),
    title: title.slice(0, 240),
    detailPageURL: item.detailPageURL,
    imageUrl: image && image.url ? safeAmazonImageUrl(image.url) : '',
    imageWidth: image && Number.isFinite(Number(image.width)) ? Number(image.width) : null,
    imageHeight: image && Number.isFinite(Number(image.height)) ? Number(image.height) : null,
    price: priceAmount,
    priceDisplay: priceDisplay || (String(priceAmount) + ' ' + marketplace.currency),
    currency: price.currency || marketplace.currency,
    refreshedAt: new Date().toISOString()
  };
}

async function fetchToken(clientId, clientSecret, version) {
  var endpoint = tokenEndpointFor(version);
  var cacheKey = clientId + '|' + endpoint;
  var cached = tokenCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now() + 60000) return cached.accessToken;
  var response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'creatorsapi::default'
    })
  });
  var payload = await response.json().catch(function () { return {}; });
  if (!response.ok || !payload.access_token) throw new Error('token_unavailable');
  tokenCache.set(cacheKey, {
    accessToken: payload.access_token,
    expiresAt: Date.now() + Math.max(300, Number(payload.expires_in || 3600) - 120) * 1000
  });
  return payload.access_token;
}

function apiErrorCode(payload, fallback) {
  var errors = payload && Array.isArray(payload.errors) ? payload.errors : [];
  var first = errors[0] || {};
  return String(first.code || first.reason || fallback || 'amazon_api_error').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 60) || 'amazon_api_error';
}

async function searchItems(token, request, country, partnerTag) {
  var marketplace = MARKETPLACES[country];
  var payload = {
    keywords: request.query,
    searchIndex: 'All',
    partnerTag: partnerTag,
    marketplace: marketplace.domain,
    itemCount: 3,
    itemPage: 1,
    condition: 'New',
    availability: 'Available',
    sortBy: 'Relevance',
    resources: [
      'images.primary.medium',
      'itemInfo.title',
      'offersV2.listings.price',
      'offersV2.listings.availability'
    ]
  };
  if (request.maxPrice) payload.maxPrice = request.maxPrice * 100;
  var response = await fetch(AMAZON_API_URL, {
    method: 'POST',
    headers: {
      authorization: 'Bearer ' + token,
      'content-type': 'application/json',
      'x-marketplace': marketplace.domain
    },
    body: JSON.stringify(payload)
  });
  var result = await response.json().catch(function () { return {}; });
  if (!response.ok) throw new Error(apiErrorCode(result, 'amazon_api_error'));
  var items = result.searchResult && Array.isArray(result.searchResult.items) ? result.searchResult.items : [];
  return items.map(function (item) { return normaliseItem(item, request.id, marketplace, partnerTag); }).filter(Boolean);
}

function allowRequest(ip) {
  var now = Date.now();
  var history = requestLog.get(ip) || [];
  var recent = history.filter(function (timestamp) { return now - timestamp < REQUEST_WINDOW_MS; });
  if (recent.length >= REQUESTS_PER_WINDOW) {
    requestLog.set(ip, recent);
    return false;
  }
  recent.push(now);
  requestLog.set(ip, recent);
  if (requestLog.size > 1000) {
    requestLog.forEach(function (timestamps, key) {
      if (!timestamps.some(function (timestamp) { return now - timestamp < REQUEST_WINDOW_MS; })) requestLog.delete(key);
    });
  }
  return true;
}

export default async function handler(request, context) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204 });
  if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405);
  if (!allowRequest((context && context.ip) || 'anonymous')) return json({ ok: false, error: 'rate_limited' }, 429);

  var clientId = envValue('AMAZON_CREATORS_CLIENT_ID');
  var clientSecret = envValue('AMAZON_CREATORS_CLIENT_SECRET');
  var version = envValue('AMAZON_CREATORS_VERSION') || '3.2';
  if (!clientId || !clientSecret) return json({ ok: false, error: 'amazon_not_configured' }, 503);

  var body = await request.json().catch(function () { return null; });
  var country = normaliseCountry(body && body.country);
  var partnerTag = partnerTagFor(country);
  var queries = normaliseQueries(body && body.queries);
  if (!partnerTag) return json({ ok: false, error: 'marketplace_not_configured' }, 503);
  if (!queries.length) return json({ ok: false, error: 'invalid_queries' }, 400);

  try {
    var token = await fetchToken(clientId, clientSecret, version);
    var products = [];
    var failures = 0;
    for (var index = 0; index < queries.length; index += 1) {
      try {
        var matches = await searchItems(token, queries[index], country, partnerTag);
        var product = matches[0];
        if (product && !products.some(function (item) { return item.asin === product.asin; })) products.push(product);
      } catch (error) {
        failures += 1;
      }
    }
    if (!products.length) return json({ ok: false, error: failures === queries.length ? 'amazon_no_products' : 'amazon_partial_failure', products: [] }, 502);
    return json({
      ok: true,
      source: 'amazon-creators-api',
      country: country,
      products: products,
      failedQueries: failures,
      refreshedAt: new Date().toISOString()
    });
  } catch (error) {
    return json({ ok: false, error: 'amazon_api_unavailable' }, 502);
  }
}

export const config = {
  path: '/api/amazon-products',
  method: ['POST', 'OPTIONS']
};
