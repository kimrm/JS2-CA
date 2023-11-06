import followActionButton from "../profile/followButton.mjs";
import { timeAgo } from "../../utils/date.js";
import { loggedInProfile } from "../../utils/auth/user.js";
import postModal from "../postModal.mjs";
import updatePost from "./updatePost.mjs";

/**
 * Creates and returns a post header component
 * @param {*} key
 * @param object post
 * @returns HTMLDivElement
 */
export default function postHeader(
  key,
  { author, created, isFollowingAuthor, id }
) {
  const html = `
    <div id="mainContainer_${key}" class="d-flex justify-content-between mb-1">
      <div class="d-flex">
        <div class="profile-icon-container">
          <a href="/profile/${
            author.name !== loggedInProfile().name ? `?name=${author.name}` : ``
          }">
            <img id="avatar_${key}" class="object-fit-cover rounded w-100 h-100 fadeable">
          </a>
        </div>
        <a class="btn" href="/profile/${
          author.name !== loggedInProfile().name ? `?name=${author.name}` : ``
        }">
          <strong id="author_name_${key}"></strong>
          <span id="date_${key}"></span>
        </a>
      </div>
      
    `;

  const template = document.createElement("template");
  template.innerHTML = html;
  const container = template.content.cloneNode(true);

  const authorNameElement = container.querySelector(`#author_name_${key}`);
  authorNameElement.textContent = author.name;

  const dateElement = container.querySelector(`#date_${key}`);
  dateElement.textContent = `, ${timeAgo(created)}`;

  const avatarElement = container.querySelector(`#avatar_${key}`);
  avatarElement.addEventListener("load", () => {
    avatarElement.classList.add("fade-in");
  });
  avatarElement.src =
    author.avatar !== null && author.avatar !== ""
      ? author.avatar
      : `https://ui-avatars.com/api/?name=${author.name.substring(
          0,
          5
        )}&background=random&size=64`;

  const mainContainer = container.querySelector(`#mainContainer_${key}`);
  if (loggedInProfile().name !== author.name) {
    mainContainer.append(followActionButton(author.name, isFollowingAuthor));
  } else {
    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-sm", "btn-outline-secondary");
    editButton.textContent = "Edit";
    mainContainer.append(editButton);
    editButton.addEventListener("click", () => {
      const viewModal = document.getElementById("viewPostModal");
      if (viewModal) {
        const modalInstance = bootstrap.Modal.getInstance(viewModal);
        modalInstance.hide();
      }

      const container = document.querySelector("main");

      const modal = postModal("postUpdateModal");

      container.prepend(modal);

      const updatePostForm = updatePost(id);
      const modalElement = container.querySelector("#postUpdateModal");
      modalElement.querySelector(".modal-content").appendChild(updatePostForm);

      const updatePostModal = container.querySelector(".modal");
      const updatePostModalInstance = new bootstrap.Modal(updatePostModal);
      updatePostModalInstance.show();
    });
  }

  return container;
}
