/**
 * app.js
 *
 * Main application entry point for the Controller Settings App.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * PRACTICE FILE (partial)
 * ─────────────────────────────────────────────────────────────────────────────
 * Sections labelled COMPLETE are fully working – study them as examples.
 * Sections labelled TODO need to be implemented by you.
 * Use GitHub Copilot (inline suggestions, Chat, etc.) to help you fill them in.
 * ─────────────────────────────────────────────────────────────────────────────
 */

'use strict';

// ─── Application State ───────────────────────────────────────────────────────

let currentSettings = SettingsManager.loadSettings();
let pollingHandle = null;

// ─── COMPLETE: Sensitivity UI ────────────────────────────────────────────────

/**
 * Wires up the sensitivity sliders so they update the displayed value in
 * real time and store the new value in currentSettings.
 */
function initSensitivityControls() {
  const sliders = [
    { id: 'look-sensitivity', key: 'look' },
    { id: 'aim-sensitivity',  key: 'aim'  },
  ];

  sliders.forEach(({ id, key }) => {
    const slider  = document.getElementById(id);
    const display = document.getElementById(`${id}-value`);
    if (!slider || !display) return;

    // Populate from saved settings
    slider.value   = currentSettings.sensitivity[key];
    display.textContent = slider.value;

    slider.addEventListener('input', () => {
      display.textContent = slider.value;
      currentSettings.sensitivity[key] = Number(slider.value);
    });
  });
}

// ─── COMPLETE: Button Map UI ──────────────────────────────────────────────────

const BUTTON_OPTIONS = ['A', 'B', 'X', 'Y', 'LB', 'RB', 'LT', 'RT', 'LS', 'RS', 'Start', 'Select'];

/**
 * Renders a <select> dropdown for each button action in the button map and
 * updates currentSettings when the user changes a mapping.
 */
function initButtonMappingControls() {
  const container = document.getElementById('button-map-list');
  if (!container) return;

  const actions = Object.keys(currentSettings.buttonMap);

  container.innerHTML = actions
    .map((action) => {
      const options = BUTTON_OPTIONS.map(
        (btn) =>
          `<option value="${btn}"${currentSettings.buttonMap[action] === btn ? ' selected' : ''}>${btn}</option>`
      ).join('');
      return `<div class="button-map-item">
        <span>${action.charAt(0).toUpperCase() + action.slice(1)}</span>
        <select id="map-${action}">${options}</select>
      </div>`;
    })
    .join('');

  actions.forEach((action) => {
    const sel = document.getElementById(`map-${action}`);
    if (!sel) return;
    sel.addEventListener('change', () => {
      currentSettings.buttonMap[action] = sel.value;
    });
  });
}

// ─── TODO: Dead Zone UI ───────────────────────────────────────────────────────

/**
 * TODO: Implement this function.
 *
 * Wire up sliders for Left Stick Dead Zone and Right Stick Dead Zone.
 * Pattern to follow: see initSensitivityControls() above.
 *
 * Requirements:
 * - Each slider should have a range of 0–30.
 * - Default values come from currentSettings.deadZone.leftStick /
 *   currentSettings.deadZone.rightStick.
 * - When the slider changes, call SettingsManager.updateDeadZone() and store
 *   the returned object back into currentSettings.
 * - Update a value-display <span> next to each slider.
 *
 * You will also need to add the corresponding HTML elements to index.html
 * inside <div id="deadzone-controls">.
 */
function initDeadZoneControls() {
  // TODO: implement this function
}

// ─── TODO: Vibration UI ───────────────────────────────────────────────────────

/**
 * TODO: Implement this function.
 *
 * Wire up vibration toggle (checkbox) and intensity slider.
 * Pattern to follow: see initSensitivityControls() above.
 *
 * Requirements:
 * - A checkbox (#vibration-enabled) that reads/writes
 *   currentSettings.vibration.enabled via SettingsManager.setVibrationEnabled().
 * - A range slider (#vibration-intensity, range 0–100) that reads/writes
 *   currentSettings.vibration.intensity via
 *   SettingsManager.setVibrationIntensity().
 * - Disable the intensity slider when vibration is disabled.
 * - Update a value-display <span> next to the intensity slider.
 *
 * You will also need to add the corresponding HTML elements to index.html
 * inside <div id="vibration-controls">.
 */
function initVibrationControls() {
  // TODO: implement this function
}

// ─── TODO: Profile Management UI ─────────────────────────────────────────────

/**
 * TODO: Implement this function.
 *
 * Render the current saved profiles in the UI.
 *
 * Requirements:
 * - Populate a <select id="profile-select"> dropdown with saved profile names.
 * - If no profiles exist, show a placeholder option "No profiles saved".
 *
 * Hint: use SettingsManager.loadProfiles() to retrieve profile names.
 */
function renderProfiles() {
  // TODO: implement this function
}

/**
 * TODO: Implement this function.
 *
 * Wire up profile save / load / delete buttons.
 *
 * Requirements:
 * - "Save Profile" button (#save-profile) reads a name from
 *   #profile-name-input, calls SettingsManager.saveProfile(), then refreshes
 *   the profiles list.
 * - "Load Profile" button (#load-profile) reads the selected profile from
 *   #profile-select, calls SettingsManager.loadProfile(), updates
 *   currentSettings, and re-initialises all UI controls.
 * - "Delete Profile" button (#delete-profile) reads the selected profile,
 *   calls SettingsManager.deleteProfile(), then refreshes the profiles list.
 *
 * You will also need to add the corresponding HTML elements to index.html
 * inside <div id="profile-controls">.
 */
function initProfileControls() {
  // TODO: implement this function
}

// ─── COMPLETE: Save / Reset ───────────────────────────────────────────────────

/**
 * Shows a short status message below the action buttons.
 *
 * @param {string}  text    - The message to display.
 * @param {'ok'|'error'} type - Visual style.
 */
function showStatus(text, type = 'ok') {
  const el = document.getElementById('status-message');
  if (!el) return;
  el.textContent = text;
  el.className   = `status-message${type === 'error' ? ' error' : ''}`;
  setTimeout(() => { el.textContent = ''; }, 3000);
}

/**
 * Wires up the Save and Reset buttons.
 */
function initActionButtons() {
  const saveBtn  = document.getElementById('save-settings');
  const resetBtn = document.getElementById('reset-settings');

  saveBtn?.addEventListener('click', () => {
    const ok = SettingsManager.saveSettings(currentSettings);
    showStatus(ok ? '✔ Settings saved.' : 'Error saving settings.', ok ? 'ok' : 'error');
  });

  resetBtn?.addEventListener('click', () => {
    currentSettings = SettingsManager.getDefaultSettings();
    initAllControls();
    showStatus('✔ Settings reset to defaults.');
  });
}

// ─── COMPLETE: Controller Polling ────────────────────────────────────────────

/**
 * Starts controller polling and registers connect/disconnect listeners.
 */
function initControllerManager() {
  const { listenForControllerEvents, startControllerPolling } = window.ControllerManager;

  listenForControllerEvents(
    () => { if (!pollingHandle) pollingHandle = startControllerPolling(); },
    () => {
      const pads = window.ControllerManager.getConnectedControllers();
      if (pads.length === 0 && pollingHandle) {
        pollingHandle.stop();
        pollingHandle = null;
        window.ControllerManager.renderControllerList([]);
      }
    }
  );

  document.getElementById('refresh-controllers')?.addEventListener('click', () => {
    window.ControllerManager.renderControllerList(
      window.ControllerManager.getConnectedControllers()
    );
  });
}

// ─── COMPLETE: Initialise Everything ─────────────────────────────────────────

/**
 * Re-initialises all UI controls from currentSettings.
 * Called on page load and after a settings reset.
 */
function initAllControls() {
  initSensitivityControls();
  initButtonMappingControls();
  initDeadZoneControls();
  initVibrationControls();
  renderProfiles();
}

document.addEventListener('DOMContentLoaded', () => {
  initAllControls();
  initActionButtons();
  initProfileControls();
  initControllerManager();
});
