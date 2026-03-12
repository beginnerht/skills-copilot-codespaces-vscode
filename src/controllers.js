/**
 * controllers.js
 *
 * COMPLETE – use this file as a reference for how to interact with
 * the Gamepad API and manage connected controller devices.
 *
 * This module is fully implemented so you can study its patterns and
 * apply them when completing the TODO sections in settings.js and app.js.
 */

'use strict';

/**
 * Returns all currently connected gamepads as a filtered array
 * (null slots from navigator.getGamepads() are removed).
 *
 * @returns {Gamepad[]}
 */
function getConnectedControllers() {
  if (!navigator.getGamepads) return [];
  return Array.from(navigator.getGamepads()).filter(Boolean);
}

/**
 * Renders the list of connected controllers into the #controller-list element.
 *
 * @param {Gamepad[]} gamepads - Array of connected Gamepad objects.
 */
function renderControllerList(gamepads) {
  const list = document.getElementById('controller-list');
  if (!list) return;

  if (gamepads.length === 0) {
    list.innerHTML =
      '<p class="placeholder">No controllers detected. Connect a controller and press any button.</p>';
    return;
  }

  list.innerHTML = gamepads
    .map(
      (gp) =>
        `<div class="controller-item">
          <span class="dot"></span>
          <span>${gp.id}</span>
          <span style="margin-left:auto;font-size:0.75rem;color:#8b949e">
            ${gp.buttons.length} buttons · ${gp.axes.length} axes
          </span>
        </div>`
    )
    .join('');
}

/**
 * Starts polling the Gamepad API and refreshes the UI list on each frame.
 * Polling stops automatically when no controllers are connected.
 *
 * @param {function} onUpdate - Optional callback invoked with the gamepad array
 *   on every animation frame (useful for reading axis values in real time).
 * @returns {{ stop: function }} An object with a stop() method.
 */
function startControllerPolling(onUpdate) {
  let running = true;

  function tick() {
    if (!running) return;
    const pads = getConnectedControllers();
    renderControllerList(pads);
    if (typeof onUpdate === 'function') onUpdate(pads);
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
  return { stop: () => { running = false; } };
}

/**
 * Registers gamepadconnected / gamepaddisconnected event listeners on the
 * window and calls the provided callbacks.
 *
 * @param {function} onConnect    - Called with a Gamepad when one connects.
 * @param {function} onDisconnect - Called with a Gamepad when one disconnects.
 */
function listenForControllerEvents(onConnect, onDisconnect) {
  window.addEventListener('gamepadconnected', (e) => {
    console.log('[Controllers] Connected:', e.gamepad.id);
    if (typeof onConnect === 'function') onConnect(e.gamepad);
  });

  window.addEventListener('gamepaddisconnected', (e) => {
    console.log('[Controllers] Disconnected:', e.gamepad.id);
    if (typeof onDisconnect === 'function') onDisconnect(e.gamepad);
  });
}

// Expose to other scripts via globals (no module bundler needed)
window.ControllerManager = {
  getConnectedControllers,
  renderControllerList,
  startControllerPolling,
  listenForControllerEvents,
};
