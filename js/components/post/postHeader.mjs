import "../profile/followButton.mjs";
import { timeAgo } from "../../utils/date.js";

import Component from "../component.mjs";

class PostHeader extends Component {
  render() {
    const { author, avatar, date, isFollowingAuthor } = this.props;

    const headerContainer = document.createElement("div");
    headerContainer.classList.add("d-flex", "justify-content-between", "mb-1");

    const header = document.createElement("div");
    header.classList.add("d-flex");

    const profileIconContainer = document.createElement("div");
    profileIconContainer.classList.add("profile-icon-container");

    const profileIconLink = document.createElement("a");
    profileIconLink.href = "/profile";

    const profileIcon = document.createElement("img");
    profileIcon.classList.add("object-fit-cover", "rounded", "w-100", "h-100");
    profileIcon.src =
      avatar && avatar !== "null" && avatar !== ""
        ? avatar
        : `https://ui-avatars.com/api/?name=${author}&background=random&size=64`;

    const profileName = document.createElement("div");

    const profileNameLink = document.createElement("a");
    profileNameLink.classList.add("btn");
    profileNameLink.href = "/profile/?name=AUTHOR_NAME";
    profileNameLink.textContent = author;

    const profileNameStrong = document.createElement("strong");

    const profileDate = document.createElement("span");
    profileDate.textContent = timeAgo(date);

    const followButton = document.createElement("follow-button");
    followButton.setAttribute("props", JSON.stringify(this.props));

    profileIconLink.append(profileIcon);
    profileIconContainer.append(profileIconLink);
    profileNameLink.append(profileNameStrong);
    profileName.append(profileNameLink, profileDate);
    header.append(profileIconContainer, profileName);

    headerContainer.append(header, followButton);

    this.append(headerContainer);
  }

  setFollowState(isFollowing) {
    const followButton = this.querySelector("follow-button");
    followButton.setFollowState(isFollowing);
    this.setAttribute("isFollowingAuthor", isFollowing.toString());
  }
}

customElements.define("post-header", PostHeader);
