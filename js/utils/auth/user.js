export const profile = JSON.parse(localStorage.getItem("profileData"));

export function isFollowing(username) {
  const profileData = JSON.parse(localStorage.getItem("profileData"));
  return profileData.following.some((item) => item.name === username);
}

export function loggedInProfile() {
  return JSON.parse(localStorage.getItem("profileData"));
}
