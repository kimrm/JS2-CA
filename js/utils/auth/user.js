export const profile = JSON.parse(localStorage.getItem("profileData"));

export function isFollowing(username) {
  return profile.following.some((item) => item.name === username);
}
