import followActionButton from "../profile/followActionButton.mjs";
import { timeAgo } from "../../utils/date.js";

export default function postHeader(
  key,
  { author, created, isFollowingAuthor }
) {
  const html = `
    <div id="mainContainer_${key}" class="d-flex justify-content-between mb-1">
      <div class="d-flex">
        <div class="profile-icon-container">
          <a href="/profile">
            <img id="avatar_${key}" class="object-fit-cover rounded w-100 h-100 fadeable">
          </a>
        </div>
        <div>
          <a class="btn" href="/profile/?name=AUTHOR_NAME">
            <strong id="author_name_${key}"></strong>
            <span id="date_${key}"></span>
          </a>
        </div>
      </div>
      
    `;

  const template = document.createElement("template");
  template.innerHTML = html;
  const container = template.content.cloneNode(true);

  const authorNameElement = container.querySelector(`#author_name_${key}`);
  authorNameElement.textContent = author.name;

  const dateElement = container.querySelector(`#date_${key}`);
  dateElement.textContent = timeAgo(created);

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
  mainContainer.append(followActionButton(author.name, isFollowingAuthor));

  return container;
}
