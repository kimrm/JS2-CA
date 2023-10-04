export function auth() {
  return getLoggedInUser();
}

export function isLoggedIn() {
  return getLoggedInUser() !== null;
}

function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("userData"));
}
