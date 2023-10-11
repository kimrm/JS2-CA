import { react } from "../utils/API/api.js";

/**
 * Handler for reacting to a post
 * @param {number} postId
 * @param {string} reaction
 * @param {function} callback
 * @returns {void}
 */
export default function reactionHandler(postId, reaction, callback) {
  react(postId, reaction, {
    accessToken: JSON.parse(localStorage.getItem("userData")).accessToken,
  }).then((data) => {
    callback(data);
  });
}
