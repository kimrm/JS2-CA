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

/**
 * Logs in a user
 * @param {object} userData The user data to send
 * @returns {object} The JSON response
 */
export async function login(userData) {
  return await call(LOGIN_URL, "POST", userData);
}

/**
 * Registers a user
 * @param {object} userData The user data to send
 * @returns {object} The JSON response
 */
export async function register(userData) {
  return await call(REGISTER_URL, "POST", userData);
}

/**
 * Gets the user profile
 * @param {string} username The username to look up
 * @param {object} userData The user data containing the access token
 * @returns {object} The JSON response
 */
export async function profile(username, { accessToken }) {
  return await call(
    `${PROFILES_URL}/${username}?_followers=true&_following=true`,
    "GET",
    null,
    accessToken
  );
}

/**
 * Updates the user profile
 * @param {string} username The username to update
 * @param {object} profileData The profile data to send, containing avatar and banner urls
 * @param {object} userData The user data containing the access token
 * @returns {object} The JSON response
 */
export async function updateProfileMedia(username, mediaData, { accessToken }) {
  return await call(
    `${PROFILES_URL}/${username}/media`,
    "PUT",
    mediaData,
    accessToken
  );
}

/**
 * Updates the user profile
 * @param {object} profileData The post data to send
 * @param {object} userData The user data containing the access token
 * @returns {object} The JSON response
 */
export async function createPost(postData, { accessToken }) {
  return await call(POSTS_URL, "POST", postData, accessToken);
}

/**
 * Updates a post
 * @param {number} postId The post id to update
 * @param {object} postData The post data to send
 * @param {object} userData The user data containing the access token
 * @returns  {object} The JSON response
 */
export async function updatePost(postId, postData, { accessToken }) {
  console.log(postId, postData, accessToken);
  return await call(`${POSTS_URL}/${postId}`, "PUT", postData, accessToken);
}

/**
 * Deletes a post
 * @param {number} postId The post id to delete
 * @param {object} userData The user data containing the access token
 * @returns {object} The JSON response
 */
export async function deletePost(postId, { accessToken }) {
  return await call(`${POSTS_URL}/${postId}`, "DELETE", null, accessToken);
}

/**
 * Gets a single post
 * @param {number} postId The post id to get
 * @param {object} userData The user data containing the access token
 * @returns {object} The JSON response
 */
export async function post(postId, { accessToken }) {
  return await call(
    `${POSTS_URL}/${postId}?_author=true&_comments=true&_reactions=true`,
    "GET",
    null,
    accessToken
  );
}

/**
 * Fetches an JSON object with posts
 * @param {object} userData The user data containing the access token
 * @param {number} limit The number of posts to get
 * @param {number} offset The offset to start from
 * @returns {object} The JSON response
 */
export async function posts({ accessToken }, limit = 10, offset = 0) {
  return await call(
    `${POSTS_URL}?_author=true&_comments=true&_reactions=true&limit=${limit}&offset=${offset}`,
    "GET",
    null,
    accessToken
  );
}

/**
 * Creates a comment
 * @param {number} postId The post id to comment on
 * @param {object} commentData The comment data to send
 * @param {object} userData The user data containing the access token
 * @returns {object} The JSON response
 */
export async function comment(postId, commentData, { accessToken }) {
  return await call(
    `${POSTS_URL}/${postId}/comment`,
    "POST",
    commentData,
    accessToken
  );
}

/**
 * Fetches the posts for a user
 * @param {string} username The username to get posts for
 * @param {object} userData The user data containing the access token
 * @returns {object} The JSON response
 */
export async function usersPosts(username, { accessToken }) {
  return await call(
    `${PROFILES_URL}/${username}/posts?_author=true&_comments=true&_reactions=true`,
    "GET",
    null,
    accessToken
  );
}

/**
 * Follows or unfollows a user
 * @param {string} username The username to follow or unfollow
 * @param {boolean} follow Whether to follow or unfollow
 * @param {object} userData The user data containing the access token
 * @returns {object} The JSON response
 */
export async function follow(username, follow, { accessToken }) {
  return await call(
    `${PROFILES_URL}/${username}/` + `${follow ? "follow" : "unfollow"}`,
    "PUT",
    {},
    accessToken
  );
}

/**
 * Unfollows a user
 * @param {string} username The username to unfollow
 * @param {object} userData The user data containing the access token
 * @returns {object} The JSON response
 */
export async function unfollow(username, { accessToken }) {
  return await call(
    `${PROFILES_URL}/${username}/unfollow`,
    "PUT",
    {},
    accessToken
  );
}

/**
 * Fetches the followers for a user
 * @param {string} username The username to get followers for
 * @param {object} userData The user data containing the access token
 * @returns {object} The JSON response
 */
export async function followers(username, { accessToken }) {
  return await call(
    `${PROFILES_URL}/${username}/followers`,
    "GET",
    null,
    accessToken
  );
}

/**
 * Reacts to a post
 * @param {number} postId The post id to react to
 * @param {string} reaction The reaction to add
 * @param {object} userData The user data containing the access token
 * @returns {object} The JSON response
 */
export async function react(postId, reaction, { accessToken }) {
  return await call(
    `${POSTS_URL}/${postId}/react/${reaction}`,
    "PUT",
    {},
    accessToken
  );
}
