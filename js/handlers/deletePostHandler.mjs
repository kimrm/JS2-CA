import { deletePost } from "../utils/API/api.js";
import showToastMessage from "../utils/showToastMessage.js";

/**
 * Handling deleting a post, and showing a toast message
 * @param {number} id
 * @param {object} e
 * @returns {void}
 */
export default function deletePostHandler(id, e) {
  e.preventDefault();
  const accessToken = JSON.parse(localStorage.getItem("userData")).accessToken;
  deletePost(id, { accessToken }).then((data) => {
    const deleteModal = document.getElementById("postUpdateModal");
    const modalInstance = bootstrap.Modal.getInstance(deleteModal);
    modalInstance.hide();
    const toast = {
      heading: "Post deleted",
      body: "Your post has been deleted successfully!",
    };
    showToastMessage(toast);
    document.querySelector(`#post_container_${id}`).remove();
  });
}
