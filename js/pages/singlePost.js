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
    myModal.show();
  });
}
