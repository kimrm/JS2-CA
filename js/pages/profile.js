import { usersPosts } from "../utils/API/api.js";
import "../components/post/post.mjs";

export function main() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  let username = params.get("name");
  if (!username) {
    username = userData.name;
  }

  usersPosts(username, userData).then((data) => {
    const postsElement = document.querySelector("#posts");
    data.forEach((post) => {
      const postElement = document.createElement("post-component");
      postElement.setAttribute("props", JSON.stringify(post));
      postsElement.appendChild(postElement);
    });
  });
}
