import Component from "../component.mjs";

class followButton extends Component {
  render() {
    const { isFollowingAuthor } = this.props;

    const followDropDown = document.createElement("div");
    followDropDown.classList.add("dropdown");

    const followButton = document.createElement("button");
    this.followButton = followButton;
    followButton.classList.add("btn", "dropdown-toggle");
    followButton.setAttribute("type", "button");
    followButton.dataset.bsToggle = "dropdown";
    followButton.ariaExpanded = "false";
    followButton.textContent =
      isFollowingAuthor === true ? "Following" : "Not following";

    const followDropDownMenu = document.createElement("ul");
    followDropDownMenu.classList.add("dropdown-menu");

    const followDropDownItem = document.createElement("li");
    followDropDownItem.classList.add("dropdown-item");

    const followDropDownButton = document.createElement("button");
    this.followDropDownButton = followDropDownButton;
    followDropDownButton.classList.add("btn");
    followDropDownButton.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("followClicked", {
          bubbles: true,
          detail: { follow: !isFollowingAuthor },
        })
      );
    });

    followDropDownButton.textContent =
      isFollowingAuthor === true ? "Unfollow" : "Follow";

    followDropDownItem.append(followDropDownButton);
    followDropDownMenu.append(followDropDownItem);
    followDropDown.append(followButton, followDropDownMenu);

    this.append(followDropDown);
  }

  updateUI() {
    const { isFollowingAuthor } = this.props;

    console.log(this.props);

    this.followButton.textContent =
      isFollowingAuthor === true ? "Following" : "Not following";

    this.followDropDownButton.textContent =
      isFollowingAuthor === true ? "Unfollow" : "Follow";
    this.followDropDownButton.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("followClicked", {
          bubbles: true,
          detail: { follow: !isFollowingAuthor },
        })
      );
    });
  }
}

customElements.define("follow-button", followButton);
