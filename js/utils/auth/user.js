export const profile = JSON.parse(localStorage.getItem("profileData"));

/**
 * Tells if the logged in user is following the given user
 * @param {string} username
 * @returns {boolean} True if the logged in user is following the given user, false otherwise
 */
export function isFollowing(username) {
  const profileData = JSON.parse(localStorage.getItem("profileData"));
  return profileData.following.some((item) => item.name === username);
}

/**
 * Gets the logged in user
 * @returns {object} The user data
 */
export function loggedInProfile() {
  return JSON.parse(localStorage.getItem("profileData"));
}
