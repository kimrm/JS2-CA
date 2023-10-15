import { getCommentData } from "../utils/form/formData.js";
import { comment } from "../utils/API/api.js";

/**
 * Handler for creating a comment
 * @param {number} postId
 * @param {object} e
 * @returns {object} The new comment
 */
export default async function createCommentHandler(postId, e) {
  e.preventDefault();
  const form = e.target;
  const formData = getCommentData(form);

  const newComment = await comment(postId, formData, {
    accessToken: JSON.parse(localStorage.getItem("userData")).accessToken,
  });
  form.reset();
  return newComment;
}
