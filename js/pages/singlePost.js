import viewSinglePost from "../components/posts/viewSinglePost.mjs";
import { post } from "../utils/API/api.js";
import postModal from "../components/postModal.js";

export function main(postId) {
  const accessToken = JSON.parse(localStorage.getItem("userData")).accessToken;

  post(postId, { accessToken }).then((data) => {
    const singlePost = viewSinglePost(data);
    const container = document.querySelector("main");

    const modal = postModal();

    container.prepend(modal);

    container.querySelector(".modal-content").appendChild(singlePost);

    const modalElement = container.querySelector(".modal");

    const myModal = new bootstrap.Modal(modalElement);
    document.addEventListener("hidden.bs.modal", (e) => {
      unsetQueryParams();
    });
    myModal.show();
  });

  setQueryParams(postId);
}

function setQueryParams(postId) {
  let newUrl =
    window.location.origin + window.location.pathname + "?post=" + postId;
  window.history.replaceState({}, "", newUrl);
}

function unsetQueryParams() {
  let newUrl = window.location.origin + window.location.pathname;
  window.history.replaceState({}, "", newUrl);
}
