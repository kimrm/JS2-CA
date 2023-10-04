/**
 * Show a toast message
 * @param {string} heading
 * @param {string} body
 * @param {string} link - optional
 * @returns {void}
 */
export default function showToastMessage({ heading, body, link = null }) {
  const toastHeader = document.querySelector("#toastHeader");
  const toastBody = document.querySelector("#toastBody");
  const toastTime = document.querySelector("#toastTime");
  toastTime.textContent = new Date().toLocaleTimeString();
  toastHeader.textContent = heading;
  toastBody.textContent = body;
  const toast = document.querySelector("#toast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
  toastBootstrap.show();
}
