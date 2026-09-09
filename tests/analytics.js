'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'analytics.js'), 'utf8');

function makeStorage() {
  const values = new Map();
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
    removeItem(key) { values.delete(key); },
    clear() { values.clear(); }
  };
}

function makeElement(id) {
  return {
    id,
    hidden: true,
    textContent: '',
    innerHTML: '',
    dataset: {},
    classList: { add() {}, remove() {} },
    setAttribute(name, value) { this[name] = value; },
    addEventListener(name, callback) { this[`on${name}`] = callback; },
    focus() {}
  };
}

const storage = makeStorage();
const elements = new Map([
  ['regalazo-privacy-choice', makeElement('regalazo-privacy-choice')],
  ['analytics-consent-title', makeElement('analytics-consent-title')],
  ['analytics-consent-text', makeElement('analytics-consent-text')],
  ['analytics-consent-accept', makeElement('analytics-consent-accept')],
  ['analytics-consent-reject', makeElement('analytics-consent-reject')],
  ['analytics-preferences', makeElement('analytics-preferences')]
]);
elements.get('regalazo-privacy-choice').hidden = true;

const document = {
  readyState: 'complete',
  documentElement: { lang: 'es' },
  body: { classList: { add() {}, remove() {} }, appendChild() {} },
  head: { appendChild(node) { this.lastScript = node; } },
  getElementById(id) { return elements.get(id) || null; },
  querySelector(selector) { return selector === '.site-footer' ? makeElement('site-footer') : null; },
  createElement() { return makeElement('dynamic'); },
  addEventListener() {}
};

const context = {
  console,
  URLSearchParams,
  Date,
  String,
  Number,
  Object,
  Array,
  JSON,
  localStorage: storage,
  document,
  window: {
    location: { pathname: '/regalos-de-cumpleanos-para-pareja/', search: '?utm_source=share' },
    setTimeout,
    clearTimeout
  }
};
context.globalThis = context;

vm.runInNewContext(source, context, { filename: 'analytics.js' });
const core = context.window.RegalazoAnalyticsCore;
assert.ok(core, 'analytics core was not initialised');
assert.equal(core.getConsent(), null, 'analytics should start undecided');
assert.equal(elements.get('regalazo-privacy-choice').hidden, false, 'consent banner should be visible when undecided');
assert.equal(core.getQueue().length, 0, 'events must not queue without consent');

core.track('quiz_answered', { questionId: 'age', step: 3, value: 'adult' });
assert.equal(core.getQueue().length, 0, 'quiz answers must not queue without consent');

core.setConsent('granted');
assert.equal(storage.getItem('regalazo-analytics-consent-v4'), 'granted');
assert.equal(core.getQueue().length, 1, 'grant should queue one page view until the SDK loads');
assert.equal(core.getQueue()[0].event, 'page_viewed');
assert.equal(core.getQueue()[0].properties.path, '/regalos-de-cumpleanos-para-pareja/');
assert.equal(core.getQueue()[0].properties.entry_path, '/regalos-de-cumpleanos-para-pareja/');

core.track('quiz_answered', { questionId: 'age', step: 3, value: 'adult', relation: 'partner' });
const queued = core.getQueue().find((event) => event.event === 'quiz_answered');
assert.ok(queued, 'consented event should queue before the SDK loads');
assert.deepEqual(queued.properties.questionId, 'age');
assert.deepEqual(queued.properties.step, 3);
assert.equal(Object.hasOwn(queued.properties, 'value'), false, 'concrete answers must be excluded');
assert.equal(Object.hasOwn(queued.properties, 'relation'), false, 'concrete answers must be excluded');

core.track('gift_impression', { giftId: 'coffee-kit::smart-fit', position: 1, answer: 'private' });
core.track('share_card_created', { ideaCount: 10, answers: 'private' });
const impression = core.getQueue().find((event) => event.event === 'gift_impression');
const card = core.getQueue().find((event) => event.event === 'share_card_created');
assert.ok(impression && impression.properties.giftId === 'coffee-kit::smart-fit', 'gift impression should be allowlisted');
assert.equal(Object.hasOwn(impression.properties, 'answer'), false, 'gift impression must not include answers');
assert.ok(card && card.properties.ideaCount === 10, 'share card event should be allowlisted');
assert.equal(Object.hasOwn(card.properties, 'answers'), false, 'share card event must not include answers');

core.track('made_up_event', { secret: 'should-not-be-sent' });
assert.equal(core.getQueue().some((event) => event.event === 'made_up_event'), false, 'unknown events must be rejected');

core.setConsent('denied');
assert.equal(storage.getItem('regalazo-analytics-consent-v4'), 'denied');
assert.equal(core.getQueue().length, 0, 'denial must clear queued events');

let optIns = 0;
let optOuts = 0;
context.window.mixpanel = {
  init() {},
  opt_in_tracking() { optIns += 1; },
  opt_out_tracking() { optOuts += 1; },
  track() {}
};
assert.ok(document.head.lastScript && typeof document.head.lastScript.onload === 'function', 'analytics script load was not registered');
document.head.lastScript.onload();
core.setConsent('granted');
assert.ok(optIns >= 1, 'grant after SDK readiness should opt analytics back in');
core.setConsent('denied');
assert.ok(optOuts >= 1, 'denial should opt analytics out');
core.openPreferences();
core.setConsent('granted');
assert.ok(optIns >= 2, 're-consent after preferences should opt analytics back in');

console.log('PASS: opt-in analytics, route preservation and property allowlist checks');
