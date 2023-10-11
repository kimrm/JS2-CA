import { getPostData } from "../utils/form/formData.js";
import { createPost } from "../utils/API/api.js";
import { main as singlePost } from "../pages/singlePost.js";

/**
 * Handler for creating a post
 * @param {object} e
 * @returns {void}
 */
export default function createPostHandler(e) {
  e.preventDefault();

  const form = e.target;
  const formData = getPostData(form);
  console.log(formData);
  createPost(formData, {
    accessToken: JSON.parse(localStorage.getItem("userData")).accessToken,
  }).then((data) => {
    singlePost(data.id);
    form.reset();
  });
}
