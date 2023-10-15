import { usersPosts, profile, updateProfileMedia } from "../utils/API/api.js";
import postComponent from "../components/posts/post.mjs";
import "../components/navbar/AppNavbar.mjs";
import showToastMessage from "../utils/showToastMessage.js";

/**
 * Starting point for the profile page
 * @returns {void}
 */
export function main() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  let usernameFromQuery = params.get("name");
  let username = usernameFromQuery;
  if (!usernameFromQuery) {
    document.querySelector("#editProfileButton").classList.remove("d-none");
    username = userData.name;
  }

  profile(username, userData).then((profileData) => {
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

    const profileEditAvatarInput = document.querySelector(
      "#profile-edit-avatar"
    );
    profileEditAvatarInput.value = profileData.avatar;

    profileEditAvatarInput.addEventListener("change", (e) => {
      const profileEditAvatarPreview = document.querySelector(
        "#profile-edit-avatar-preview"
      );
      profileEditAvatarPreview.src = e.target.value;
    });

    const profileEditBannerInput = document.querySelector(
      "#profile-edit-banner"
    );
    profileEditBannerInput.value = profileData.banner;

    profileEditBannerInput.addEventListener("change", (e) => {
      const profileEditBannerPreview = document.querySelector(
        "#profile-edit-banner-preview"
      );
      profileEditBannerPreview.src = e.target.value;
    });

    const profileEditForm = document.querySelector("#profile-edit-form");
    profileEditForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(profileEditForm);
      const banner = formData.get("banner");
      const avatar = formData.get("avatar");
      const userData = JSON.parse(localStorage.getItem("userData"));

      await updateProfileMedia(
        username,
        { avatar: avatar, banner: banner },
        userData
      ).then((data) => {
        const toast = {
          heading: "Profile updated",
          body: "Your profile has been updated successfully!",
        };
        showToastMessage(toast);
      });
    });
  });

  const postsContainer = document.querySelector("#posts-container");
  usersPosts(username, userData).then((posts) => {
    posts.forEach((post) => {
      const postElement = postComponent(post.id, post, false);
      postsContainer.append(postElement);
    });
  });
}
