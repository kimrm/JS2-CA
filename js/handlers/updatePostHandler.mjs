import { getPostData } from "../utils/form/formData.js";
import { updatePost } from "../utils/API/api.js";
import showToastMessage from "../utils/showToastMessage.js";

/**
 * Handler for updating a post
 * @param {number} id - The id of the post to update
 * @param {object} e - The event object
 * @returns {void}
 */
export default function updatePostHandler(id, e) {
  e.preventDefault();

  const form = e.target;
  const formData = getPostData(form);
  console.log(formData);

  const accessToken = JSON.parse(localStorage.getItem("userData")).accessToken;
  updatePost(id, formData, { accessToken }).then((data) => {
    const updateModal = document.getElementById("postUpdateModal");
    const modalInstance = bootstrap.Modal.getInstance(updateModal);
    modalInstance.hide();
    const toast = {
      heading: "Post updated",
      body: "Your post has been updated successfully!",
    };
    document.querySelector(`#postTitle_${id}`).textContent = formData.title;
    document.querySelector(`#postBody_${id}`).textContent = formData.body;
    showToastMessage(toast);
  });
}
