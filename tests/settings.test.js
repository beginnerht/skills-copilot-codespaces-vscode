/**
 * tests/settings.test.js
 *
 * Unit tests for the SettingsManager functions in src/settings.js.
 *
 * Run with:  npx jest
 */

'use strict';

// ─── Minimal browser-like environment ────────────────────────────────────────

// jsdom (via jest-environment-jsdom) provides localStorage, but settings.js
// exposes its API via window.SettingsManager, so we need to set that up.

// Load settings module (it attaches itself to global/window)
const path = require('path');
const fs   = require('fs');

// Evaluate the module code in the global (jsdom window) context
const settingsCode = fs.readFileSync(
  path.join(__dirname, '..', 'src', 'settings.js'),
  'utf8'
);

// ─── Setup ────────────────────────────────────────────────────────────────────

beforeEach(() => {
  // Reset localStorage before each test
  localStorage.clear();
  // Re-evaluate the module to get a clean SettingsManager on window
  // eslint-disable-next-line no-eval
  eval(settingsCode);
});

// ─── getDefaultSettings ───────────────────────────────────────────────────────

describe('getDefaultSettings()', () => {
  test('returns an object with expected keys', () => {
    const s = window.SettingsManager.getDefaultSettings();
    expect(s).toHaveProperty('sensitivity');
    expect(s).toHaveProperty('deadZone');
    expect(s).toHaveProperty('vibration');
    expect(s).toHaveProperty('buttonMap');
  });

  test('returns a deep copy – mutating the result does not affect subsequent calls', () => {
    const s1 = window.SettingsManager.getDefaultSettings();
    s1.sensitivity.look = 99;
    const s2 = window.SettingsManager.getDefaultSettings();
    expect(s2.sensitivity.look).not.toBe(99);
  });
});

// ─── saveSettings / loadSettings ─────────────────────────────────────────────

describe('saveSettings() / loadSettings()', () => {
  test('round-trips settings through localStorage', () => {
    const s = window.SettingsManager.getDefaultSettings();
    s.sensitivity.look = 8;
    window.SettingsManager.saveSettings(s);

    const loaded = window.SettingsManager.loadSettings();
    expect(loaded.sensitivity.look).toBe(8);
  });

  test('loadSettings() returns defaults when nothing is stored', () => {
    const loaded = window.SettingsManager.loadSettings();
    const def    = window.SettingsManager.getDefaultSettings();
    expect(loaded.sensitivity).toEqual(def.sensitivity);
  });

  test('saveSettings() returns true on success', () => {
    const result = window.SettingsManager.saveSettings(
      window.SettingsManager.getDefaultSettings()
    );
    expect(result).toBe(true);
  });
});

// ─── loadProfiles / saveProfiles ─────────────────────────────────────────────

describe('loadProfiles() / saveProfiles()', () => {
  test('returns empty object when no profiles are stored', () => {
    expect(window.SettingsManager.loadProfiles()).toEqual({});
  });

  test('round-trips a profiles map through localStorage', () => {
    const s = window.SettingsManager.getDefaultSettings();
    window.SettingsManager.saveProfiles({ competitive: s });
    const profiles = window.SettingsManager.loadProfiles();
    expect(profiles).toHaveProperty('competitive');
  });
});
