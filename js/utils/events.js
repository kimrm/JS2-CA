/**
 * Creates and dispatches a custom event
 * @param {string} eventName
 * @param {object} customData
 * @returns {void}
 * @example
 * dispatchCustomEvent("inputValidated", {element: "email", isValid: true});
 */
export function dispatchCustomEvent(eventName, customData) {
  const event = new CustomEvent(eventName, {
    detail: customData,
  });
  document.dispatchEvent(event);
}
