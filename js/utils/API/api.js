const API_BASE_URL = "https://api.noroff.dev/api/v1/social";
const LOGIN_URL = `${API_BASE_URL}/auth/login`;
const REGISTER_URL = `${API_BASE_URL}/auth/register`;
const PROFILES_URL = `${API_BASE_URL}/profiles`;
const POSTS_URL = `${API_BASE_URL}/posts`;

/**
 * Calls an API endpoint
 * @param {string} url The endpoint to call
 * @param {string} method The HTTP method to use
 * @param {object} [data=null] The data to send
 * @returns {object} The JSON response
 * @description This function is used to call an API endpoint.
 */
async function call(url, method, data = null, token = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    return json;
  } catch (error) {
    return {
      errors: [
        {
          message: "We're having technical issues. Please try again later.",
        },
      ],
    };
  }
}

export async function login(userData) {
  return await call(LOGIN_URL, "POST", userData);
}

export async function register(userData) {
  return await call(REGISTER_URL, "POST", userData);
}

export async function profile(username, { accessToken }) {
  return await call(
    `${PROFILES_URL}/${username}?_followers=true&_following=true`,
    "GET",
    null,
    accessToken
  );
}

export async function posts({ accessToken }, limit = 10, offset = 0) {
  return await call(
    `${POSTS_URL}?_author=true&_comments=true&_reactions=true&limit=${limit}&offset=${offset}`,
    "GET",
    null,
    accessToken
  );
}

export async function usersPosts(username, { accessToken }) {
  return await call(
    `${PROFILES_URL}/${username}/posts?_author=true&_comments=true&_reactions=true`,
    "GET",
    null,
    accessToken
  );
}

export async function follow(username, follow, { accessToken }) {
  return await call(
    `${PROFILES_URL}/${username}/` + `${follow ? "follow" : "unfollow"}`,
    "PUT",
    {},
    accessToken
  );
}

export async function unfollow(username, { accessToken }) {
  return await call(
    `${PROFILES_URL}/${username}/unfollow`,
    "PUT",
    {},
    accessToken
  );
}

export async function followers(username, { accessToken }) {
  return await call(
    `${PROFILES_URL}/${username}/followers`,
    "GET",
    null,
    accessToken
  );
}

export async function react(postId, reaction, { accessToken }) {
  return await call(
    `${POSTS_URL}/${postId}/react/${reaction}`,
    "PUT",
    {},
    accessToken
  );
}
