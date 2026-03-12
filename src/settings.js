/**
 * settings.js
 *
 * Settings persistence layer for the Controller Settings App.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * PRACTICE FILE
 * ─────────────────────────────────────────────────────────────────────────────
 * Some functions below are COMPLETE and serve as working examples.
 * Others are STUBS marked with TODO – implement them as a hands-on exercise.
 * Use GitHub Copilot (inline suggestions, Copilot Chat, etc.) to help you
 * complete the missing implementations.
 * ─────────────────────────────────────────────────────────────────────────────
 */

'use strict';

// ─── Default Settings ────────────────────────────────────────────────────────

/** @type {ControllerSettings} */
const DEFAULT_SETTINGS = {
  sensitivity: {
    look: 5,
    aim: 3,
  },
  deadZone: {
    leftStick: 10,
    rightStick: 10,
  },
  vibration: {
    enabled: true,
    intensity: 70,
  },
  buttonMap: {
    jump: 'A',
    crouch: 'B',
    sprint: 'LS',
    reload: 'X',
    interact: 'Y',
    melee: 'RS',
  },
};

// ─── Storage Keys ────────────────────────────────────────────────────────────

const STORAGE_KEY = 'controllerSettings';
const PROFILES_KEY = 'controllerProfiles';

// ─── COMPLETE: Core Settings I/O ─────────────────────────────────────────────

/**
 * Returns a deep copy of the default settings object.
 *
 * @returns {ControllerSettings}
 */
function getDefaultSettings() {
  return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
}

/**
 * Loads the current settings from localStorage, falling back to defaults
 * if nothing has been saved yet.
 *
 * @returns {ControllerSettings}
 */
function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultSettings();
    return Object.assign(getDefaultSettings(), JSON.parse(raw));
  } catch {
    return getDefaultSettings();
  }
}

/**
 * Persists the provided settings object to localStorage.
 *
 * @param {ControllerSettings} settings - The settings object to save.
 * @returns {boolean} true on success, false on failure.
 */
function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    return true;
  } catch {
    return false;
  }
}

// ─── TODO: Dead Zone Helpers ──────────────────────────────────────────────────

/**
 * TODO: Implement this function.
 *
 * Updates the dead-zone values inside a settings object and returns the
 * modified settings.  Does NOT persist to localStorage (call saveSettings()
 * separately when you want to persist).
 *
 * @param {ControllerSettings} settings  - The current settings object.
 * @param {'leftStick'|'rightStick'} stick - Which stick to update.
 * @param {number} value                 - Dead-zone percentage (0–30).
 * @returns {ControllerSettings}         The updated settings object.
 *
 * Hint: validate that value is between 0 and 30 before assigning.
 */
function updateDeadZone(settings, stick, value) {
  // TODO: implement this function
}

// ─── TODO: Vibration Helpers ──────────────────────────────────────────────────

/**
 * TODO: Implement this function.
 *
 * Toggles vibration on or off inside the given settings object and returns
 * the modified settings.  Does NOT persist to localStorage.
 *
 * @param {ControllerSettings} settings - The current settings object.
 * @param {boolean} enabled             - Whether vibration should be enabled.
 * @returns {ControllerSettings}        The updated settings object.
 */
function setVibrationEnabled(settings, enabled) {
  // TODO: implement this function
}

/**
 * TODO: Implement this function.
 *
 * Updates the vibration intensity inside the given settings object and
 * returns the modified settings.  Does NOT persist to localStorage.
 *
 * @param {ControllerSettings} settings - The current settings object.
 * @param {number} intensity            - Intensity percentage (0–100).
 * @returns {ControllerSettings}        The updated settings object.
 *
 * Hint: clamp intensity to the range [0, 100].
 */
function setVibrationIntensity(settings, intensity) {
  // TODO: implement this function
}

// ─── COMPLETE: Profile Management ────────────────────────────────────────────

/**
 * Loads all saved profiles from localStorage.
 *
 * @returns {Object.<string, ControllerSettings>} Map of profile name → settings.
 */
function loadProfiles() {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Saves all profiles back to localStorage.
 *
 * @param {Object.<string, ControllerSettings>} profiles
 * @returns {boolean}
 */
function saveProfiles(profiles) {
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    return true;
  } catch {
    return false;
  }
}

// ─── TODO: Profile CRUD Operations ───────────────────────────────────────────

/**
 * TODO: Implement this function.
 *
 * Saves the current settings as a named profile.
 * - Loads existing profiles.
 * - Adds (or overwrites) the entry for profileName.
 * - Persists the updated profiles map.
 *
 * @param {string} profileName          - Name for the profile.
 * @param {ControllerSettings} settings - Settings snapshot to save.
 * @returns {boolean} true on success, false on failure.
 *
 * Hint: use loadProfiles() and saveProfiles() from above.
 */
function saveProfile(profileName, settings) {
  // TODO: implement this function
}

/**
 * TODO: Implement this function.
 *
 * Loads a saved profile by name and returns its settings, or null if the
 * profile does not exist.
 *
 * @param {string} profileName - The name of the profile to load.
 * @returns {ControllerSettings|null}
 */
function loadProfile(profileName) {
  // TODO: implement this function
}

/**
 * TODO: Implement this function.
 *
 * Deletes a saved profile by name.
 * - Loads existing profiles.
 * - Removes the entry for profileName (no-op if it doesn't exist).
 * - Persists the updated profiles map.
 *
 * @param {string} profileName - Name of the profile to delete.
 * @returns {boolean} true on success, false on failure.
 */
function deleteProfile(profileName) {
  // TODO: implement this function
}

// ─── Expose to other scripts ──────────────────────────────────────────────────

window.SettingsManager = {
  getDefaultSettings,
  loadSettings,
  saveSettings,
  updateDeadZone,
  setVibrationEnabled,
  setVibrationIntensity,
  loadProfiles,
  saveProfiles,
  saveProfile,
  loadProfile,
  deleteProfile,
};

/**
 * @typedef {Object} ControllerSettings
 * @property {{ look: number, aim: number }} sensitivity
 * @property {{ leftStick: number, rightStick: number }} deadZone
 * @property {{ enabled: boolean, intensity: number }} vibration
 * @property {Object.<string, string>} buttonMap
 */
