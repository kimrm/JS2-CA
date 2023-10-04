import followHandler from "../../handlers/followHandler.mjs";

export default function followActionButton(user, isFollowingAuthor) {
  const html = `
    <div class="dropdown">
        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Not following
        </button>
        <ul class="dropdown-menu"></ul>
    </div>    
    `;

  const template = document.createElement("template");
  template.innerHTML = html;
  const container = template.content.cloneNode(true);

  const dropDownMenu = container.querySelector(".dropdown-menu");
  const dropDownToggle = container.querySelector(".dropdown-toggle");
  dropDownToggle.textContent = isFollowingAuthor
    ? "Following"
    : "Not following";
  const dropDownElement = document.createElement("li");
  const followDropDownButton = document.createElement("button");
  followDropDownButton.classList.add("btn");
  followDropDownButton.textContent = isFollowingAuthor ? "Unfollow" : "Follow";
  dropDownElement.append(followDropDownButton);
  dropDownMenu.append(dropDownElement);

  followDropDownButton.addEventListener("click", (e) => {
    followHandler({
      target: e.target,
      user: user,
      following: isFollowingAuthor,
      callback: (isFollowing) => {
        isFollowingAuthor = isFollowing;
        dropDownToggle.textContent = isFollowingAuthor
          ? "Following"
          : "Not following";
        followDropDownButton.textContent = isFollowingAuthor
          ? "Unfollow"
          : "Follow";
      },
    });
  });

  return container;
}
