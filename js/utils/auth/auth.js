/**
 * Gets the logged in user
 * @returns {object} The user data
 */
export function auth() {
  return getLoggedInUser();
}

/**
 * Checks if the user is logged in
 * @returns {boolean} True if the user is logged in, false otherwise
 */
export function isLoggedIn() {
  return getLoggedInUser() !== null;
}

function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("userData"));
}
