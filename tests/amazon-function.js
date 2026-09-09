'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

async function main() {
  const originalFetch = globalThis.fetch;
  const originalNetlify = globalThis.Netlify;
  const calls = [];
  const env = {
    AMAZON_CREATORS_CLIENT_ID: 'unit-client',
    AMAZON_CREATORS_CLIENT_SECRET: 'unit-secret',
    AMAZON_CREATORS_VERSION: '3.2',
    AMAZON_PARTNER_TAG_ES: 'unit-21'
  };

  globalThis.Netlify = { env: { get(name) { return env[name] || ''; } } };
  globalThis.fetch = async function (url, options) {
    calls.push({ url: String(url), options });
    if (String(url).includes('/auth/o2/token')) {
      return new Response(JSON.stringify({ access_token: 'unit-token', expires_in: 3600 }), { status: 200, headers: { 'content-type': 'application/json' } });
    }
    return new Response(JSON.stringify({
      searchResult: {
        items: [{
          asin: 'B000UNIT01',
          detailPageURL: 'https://www.amazon.es/dp/B000UNIT01?tag=unit-21',
          images: { primary: { medium: { url: 'https://m.media-amazon.com/images/I/unit.jpg', width: 600, height: 600 } } },
          itemInfo: { title: { displayValue: 'Producto unitario de prueba' } },
          offersV2: { listings: [{ price: { money: { amount: 19.99, currency: 'EUR', displayAmount: '19,99 €' } } }] }
        }]
      }
    }), { status: 200, headers: { 'content-type': 'application/json' } });
  };

  try {
    const module = await import(pathToFileURL(path.join(__dirname, '..', 'netlify', 'functions', 'amazon-products.mjs')).href);
    const getResponse = await module.default(new Request('https://regalazo.xyz/api/amazon-products', { method: 'GET' }), { ip: 'unit-get' });
    assert.equal(getResponse.status, 405);

    const response = await module.default(new Request('https://regalazo.xyz/api/amazon-products', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ country: 'ES', queries: [{ id: 'gift-1', query: 'cafetera portátil regalo', maxPrice: 40 }] })
    }), { ip: 'unit-products' });
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
    assert.equal(body.products.length, 1);
    assert.equal(body.products[0].asin, 'B000UNIT01');
    assert.equal(body.products[0].detailPageURL, 'https://www.amazon.es/dp/B000UNIT01?tag=unit-21');
    assert.equal(body.products[0].imageUrl, 'https://m.media-amazon.com/images/I/unit.jpg');
    assert.equal(body.products[0].priceDisplay, '19,99 €');
    assert.equal(calls.length, 2, 'expected one token call and one product call');
    assert.match(calls[0].url, /api\.amazon\.co\.uk\/auth\/o2\/token$/);
    assert.match(calls[1].url, /creatorsapi\.amazon\/catalog\/v1\/searchItems$/);
    const requestPayload = JSON.parse(calls[1].options.body);
    assert.equal(requestPayload.partnerTag, 'unit-21');
    assert.equal(requestPayload.marketplace, 'www.amazon.es');
    assert.equal(requestPayload.maxPrice, 4000);

    console.log('PASS: Amazon product function method, auth, marketplace, price, image and URL validation');
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.Netlify = originalNetlify;
  }
}

main().catch(function (error) {
  console.error(error);
  process.exitCode = 1;
});
