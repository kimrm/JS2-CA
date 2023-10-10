import { usersPosts, profile } from "../utils/API/api.js";
import postComponent from "../components/posts/post.mjs";

export function main() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  let username = params.get("name");
  if (!username) {
    username = userData.name;
  }

  profile(username, userData).then((profileData) => {
    console.log(profileData);
    const bannerElement = document.querySelector("#profile-banner");
    bannerElement.addEventListener("load", () => {
      bannerElement.classList.add("fade-in");
    });
    bannerElement.addEventListener("error", () => {
      bannerElement.src = "../../assets/images/banner_placeholder.png";
    });
    bannerElement.src = `${profileData.banner}`;

    const profileNameElement = document.querySelector("#profile-name");
    profileNameElement.textContent = profileData.name;
    profileNameElement.classList.add("bounce-in");

    const profilePictureElement = document.querySelector("#profile-picture");
    profilePictureElement.src = `${profileData.avatar}`;
    profilePictureElement.addEventListener("load", () => {
      profilePictureElement.classList.add("fade-in");
    });
    profilePictureElement.addEventListener("error", () => {
      profilePictureElement.src = `https://ui-avatars.com/api/?name=${username.substring(
        0,
        5
      )}&background=random&size=64`;
    });

    const profilePictureNameElement = document.querySelector(
      "#profile-picture-name"
    );
    profilePictureNameElement.textContent = profileData.name;
  });

  const postsContainer = document.querySelector("#posts-container");
  usersPosts(username, userData).then((posts) => {
    posts.forEach((post) => {
      const postElement = postComponent(post.id, post, false);
      postsContainer.append(postElement);
    });
  });
}
