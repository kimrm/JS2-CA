import viewSinglePost from "../components/posts/viewSinglePost.mjs";
import { post } from "../utils/API/api.js";
import postModal from "../components/postModal.js";

export function main(postId) {
  const accessToken = JSON.parse(localStorage.getItem("userData")).accessToken;

  post(postId, { accessToken }).then((data) => {
    const singlePost = viewSinglePost(data);
    const container = document.querySelector("main");

    const modal = postModal("viewPostModal");

    container.prepend(modal);

    container.querySelector(".modal-content").appendChild(singlePost);

    const modalElement = container.querySelector("#viewPostModal");

    const modalInstance = new bootstrap.Modal(modalElement);
    document.addEventListener("hidden.bs.modal", (e) => {
      unsetPostQueryParams();
    });
    modalInstance.show();
  });

  setPostQueryParams(postId);
}

function setPostQueryParams(postId) {
  const queryProfileName = new URLSearchParams(window.location.search).get(
    "name"
  );
  const querystring = queryProfileName
    ? `?name=${queryProfileName}&post=${postId}`
    : `?post=${postId}`;

  let newUrl = window.location.origin + window.location.pathname + querystring;
  window.history.replaceState({}, "", newUrl);
}

function unsetPostQueryParams() {
  const queryProfileName = new URLSearchParams(window.location.search).get(
    "name"
  );
  const querystring = queryProfileName ? `?name=${queryProfileName}` : "";
  let newUrl = window.location.origin + window.location.pathname + querystring;
  window.history.replaceState({}, "", newUrl);
}
