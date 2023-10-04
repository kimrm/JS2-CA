import { getCommentData } from "../utils/form/formData.js";
import { comment } from "../utils/API/api.js";

export default async function createCommentHandler(postId, e) {
  e.preventDefault();
  const form = e.target;
  const formData = getCommentData(form);
  console.log(formData);
  const newComment = await comment(postId, formData, {
    accessToken: JSON.parse(localStorage.getItem("userData")).accessToken,
  });
  form.reset();
  return newComment;
}
