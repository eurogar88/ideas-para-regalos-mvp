'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const amazonFunctionSource = fs.readFileSync(path.join(root, 'netlify', 'functions', 'amazon-products.mjs'), 'utf8');
const languageStart = source.indexOf('var LANGUAGE_COPY =');
const analyticsStart = source.indexOf('var ANALYTICS_CONFIG =');
const getQuestionStart = source.indexOf('function getQuestion(id)');
const applyLanguageStart = source.indexOf('function applyLanguage()');
const engineStart = source.indexOf('function budgetFor(value)');
const buildReasonStart = source.indexOf('function buildReason(gift, answers)');
const shareStart = source.indexOf('function buildShareUrl()');
const shareEnd = source.indexOf('function shareSelection()');
const replacementStart = source.indexOf('function findReplacementGift(giftId)');
const replacementEnd = source.indexOf('function showToast(message)', replacementStart);

assert.ok(languageStart > 0 && analyticsStart > languageStart && getQuestionStart > analyticsStart);
assert.ok(applyLanguageStart > getQuestionStart && engineStart > applyLanguageStart);
assert.ok(buildReasonStart > engineStart && shareStart > buildReasonStart && shareEnd > shareStart);
assert.ok(replacementStart > shareEnd && replacementEnd > replacementStart);

function makeStorage() {
  const values = new Map();
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
    removeItem(key) { values.delete(key); },
    clear() { values.clear(); }
  };
}

const storage = makeStorage();
const context = {
  console,
  URL,
  URLSearchParams,
  Math,
  Number,
  Date,
  Object,
  Array,
  String,
  Boolean,
  JSON,
  RegExp,
  localStorage: storage,
  navigator: { languages: ['es-ES'], language: 'es-ES' },
  document: { documentElement: { lang: 'es' } },
  window: {
    location: { origin: 'https://regalazo.xyz', pathname: '/', search: '' },
    RegalazoAnalytics: {},
    RegalazoAnalyticsCore: null
  }
};
context.globalThis = context;

const setup = [
  source.slice(0, languageStart),
  source.slice(languageStart, analyticsStart),
  'var LANGUAGE_STORAGE_KEY = "regalazo-language-v1";\n' +
    'var state = { step: 0, variant: 0, lastRecommendationIds: [], dismissedBaseIds: [], language: "es", recommendationMode: "fit", analyticsStarted: false, answers: { interests: [] } };\n' +
    'var currentRecommendations = [];\nvar sharedRecommendations = null;\n',
  source.slice(getQuestionStart, applyLanguageStart),
  source.slice(engineStart, buildReasonStart),
  source.slice(shareStart, shareEnd),
  source.slice(replacementStart, replacementEnd),
  'globalThis.__api = { GIFT_CATALOG, GIFT_RECIPES, state, currentRecommendations, rankGifts, rememberRecommendations, eligibleCatalogFor, giftClusterKey, buildShareUrl, buildAmazonUrl, readSharedAnswers, readSharedRecommendations, readSharedVariant, baseIdForRecommendationId, isGiftAgeCompatible, isGiftContextCompatible, findReplacementGift, compositionCount };'
].join('\n');

vm.runInNewContext(setup, context, { filename: 'app.js' });
const api = context.__api;

assert.ok(api.GIFT_CATALOG.length >= 360, `expected at least 360 base ideas, got ${api.GIFT_CATALOG.length}`);
assert.ok(api.GIFT_RECIPES.length >= 19, `expected at least 19 editorial angles, got ${api.GIFT_RECIPES.length}`);
assert.ok(api.compositionCount() >= 5000, `expected at least 5000 compatible compositions, got ${api.compositionCount()}`);
assert.ok(new Set(api.GIFT_CATALOG.map((gift) => gift.id)).size >= 360, 'catalog ids must be unique');
assert.ok(new Set(api.GIFT_CATALOG.map((gift) => gift.amazonQuery)).size >= 300, 'catalog needs at least 300 distinct product searches');
assert.match(source, /Ver similares/, 'result cards need a similar-products search fallback');
assert.match(source, /data-gift-link-type="product"/, 'result cards need product link attribution');
assert.match(source, /data-gift-link-type="similar"/, 'result cards need similar-search attribution');
assert.match(amazonFunctionSource, /AMAZON_CREATORS_CLIENT_SECRET/, 'Amazon secret must stay server-side');
assert.match(amazonFunctionSource, /offersV2\.listings\.price/, 'Amazon function must request live offer prices');
assert.match(amazonFunctionSource, /safeAmazonImageUrl/, 'Amazon image URLs must be allowlisted');
assert.match(api.buildAmazonUrl({ amazonQuery: 'test product' }, { budget: '20to40', country: 'ES' }), /tag=lamamihacker-21/);
assert.doesNotMatch(api.buildAmazonUrl({ amazonQuery: 'test product' }, { budget: '20to40', country: 'US' }), /tag=/, 'unverified marketplaces must not reuse the Spanish tag');

function answers(overrides = {}) {
  return Object.assign({
    relation: 'friend',
    gender: 'any',
    age: 'adult',
    occasion: 'birthday',
    budget: '20to40',
    interests: ['any'],
    style: 'any',
    country: 'ES'
  }, overrides);
}

function resetProfile() {
  storage.clear();
  api.state.lastRecommendationIds = [];
  api.state.dismissedBaseIds = [];
  api.state.recommendationMode = 'fit';
}

function baseIds(gifts) {
  return gifts.map((gift) => api.baseIdForRecommendationId(gift.id));
}

for (const budget of ['under20', '20to40', '40to75', '75to150', 'over150']) {
  resetProfile();
  const result = api.rankGifts(answers({ budget }), 101);
  assert.equal(result.length, 10, `budget ${budget} should return 10 ideas`);
  assert.equal(new Set(baseIds(result)).size, 10, `budget ${budget} contains duplicate base ideas`);
  assert.ok(new Set(result.map((gift) => api.giftClusterKey(gift))).size >= 8, `budget ${budget} contains too many equivalent ideas`);
}

for (const age of ['child', 'teen', 'young-adult', 'adult', 'midlife', '50plus', 'unknown']) {
  resetProfile();
  const result = api.rankGifts(answers({ age, relation: age === 'child' ? 'child' : 'friend' }), 202);
  assert.equal(result.length, 10, `age ${age} should return 10 ideas`);
  if (age !== 'unknown') {
    assert.ok(result.every((gift) => api.isGiftAgeCompatible(gift, { age })), `age ${age} leaked an incompatible idea`);
  }
}

const profile = answers({ relation: 'partner', age: 'adult', interests: ['food', 'travel'], style: 'original', budget: '75to150' });
resetProfile();
const seenAcrossRefreshes = new Set();
for (let round = 0; round < 12; round += 1) {
  const result = api.rankGifts(profile, 300 + round);
  assert.equal(result.length, 10, `refresh ${round} should return 10 ideas`);
  const ids = baseIds(result);
  assert.equal(new Set(ids).size, 10, `refresh ${round} contains duplicate base ideas`);
  assert.ok(new Set(result.map((gift) => api.giftClusterKey(gift))).size >= 8, `refresh ${round} contains too many equivalent ideas`);
  ids.forEach((id) => seenAcrossRefreshes.add(id));
  api.state.lastRecommendationIds = result.map((gift) => gift.id);
  api.rememberRecommendations(profile, result);
}
assert.ok(seenAcrossRefreshes.size >= 70, `refreshes produced too little variety: ${seenAcrossRefreshes.size}`);

resetProfile();
const compositionProfile = answers({ relation: 'friend', age: 'adult', interests: ['food'], style: 'any', budget: '20to40' });
const compositions = new Set();
for (let round = 0; round < 42; round += 1) {
  const result = api.rankGifts(compositionProfile, 500 + round);
  result.forEach((gift) => compositions.add(gift.id));
  api.state.lastRecommendationIds = result.map((gift) => gift.id);
  api.rememberRecommendations(compositionProfile, result);
}
assert.ok(compositions.size >= 360, `42 rounds should expose at least 360 compositions: ${compositions.size}`);

resetProfile();
const shareAnswers = answers({ relation: 'partner', gender: 'any', age: 'adult', interests: ['food', 'travel'], style: 'original', budget: '75to150' });
api.state.answers = shareAnswers;
api.state.variant = 987654;
const original = api.rankGifts(shareAnswers, api.state.variant);
api.currentRecommendations.splice(0, api.currentRecommendations.length, ...original);
const shareUrl = api.buildShareUrl();
context.window.location.search = new URL(shareUrl).search;
const parsedAnswers = api.readSharedAnswers();
for (const key of ['relation', 'gender', 'age', 'occasion', 'budget', 'style', 'country']) {
  assert.equal(parsedAnswers[key], shareAnswers[key], `shared answer ${key} did not round-trip`);
}
assert.deepEqual(Array.from(parsedAnswers.interests), shareAnswers.interests, 'shared interests did not round-trip');
const shared = api.readSharedRecommendations(parsedAnswers, api.readSharedVariant());
assert.ok(shared && shared.length === 10, 'shared URL did not reconstruct ten ideas');
assert.deepEqual(shared.map((gift) => gift.id), original.map((gift) => gift.id), 'shared URL changed the recommendation list');

context.window.location.search = '?r=1&relation=partner&gender=any&age=child&occasion=birthday&budget=20to40&style=any&country=ES&interests=any&ideas=' + encodeURIComponent(original.map((gift) => gift.id).join(','));
assert.equal(api.readSharedAnswers(), null, 'invalid partner/child shared profile was accepted');

resetProfile();
api.state.answers = answers({ relation: 'friend', age: 'adult', interests: ['food'], style: 'any', budget: '20to40' });
const replacementOriginal = api.rankGifts(api.state.answers, 987);
api.currentRecommendations.splice(0, api.currentRecommendations.length, ...replacementOriginal);
api.state.lastRecommendationIds = replacementOriginal.map((gift) => gift.id);
api.state.dismissedBaseIds = [api.baseIdForRecommendationId(replacementOriginal[0].id)];
const replacement = api.findReplacementGift(replacementOriginal[0].id);
assert.ok(replacement, 'a dismissed idea should have an individual replacement');
assert.ok(!replacementOriginal.some((gift) => api.baseIdForRecommendationId(gift.id) === api.baseIdForRecommendationId(replacement.id)), 'replacement should not duplicate a visible card');

console.log(`PASS: ${api.GIFT_CATALOG.length} base ideas, ${api.GIFT_RECIPES.length} angles, ${api.compositionCount()} compositions, age/budget/refresh/share checks`);
