import Component from "../component.mjs";

class ReactionButton extends Component {
  render() {
    const { reactions: reactionsCount } = this.props;
    const reactionDropdown = document.createElement("div");
    reactionDropdown.classList.add("dropdown");

    const reactionButton = document.createElement("button");
    reactionButton.classList.add("me-3", "btn");
    reactionButton.setAttribute("type", "button");
    reactionButton.dataset.bsToggle = "dropdown";
    reactionButton.ariaExpanded = "false";

    const reactionsContainer = document.createElement("div");
    reactionsContainer.classList.add("d-flex", "align-items-center");

    const reactionFirstSpan = document.createElement("span");
    reactionFirstSpan.textContent = "👍";
    reactionFirstSpan.classList.add(
      "fs-5",
      "me-n2",
      "z-3",
      "bg-light",
      "rounded-circle",
      "px-1",
      "shadow-sm"
    );
    const reactionSecondSpan = document.createElement("span");
    reactionSecondSpan.textContent = "😂";
    reactionSecondSpan.classList.add(
      "me-n2",
      "z-2",
      "bg-light",
      "rounded-circle",
      "px-1",
      "shadow-sm"
    );
    const reactionThirdSpan = document.createElement("span");
    reactionThirdSpan.textContent = "❤️";
    reactionThirdSpan.classList.add(
      "bg-light",
      "shadow-sm",
      "rounded-circle",
      "px-1"
    );

    const reactionCount = document.createElement("span");
    reactionCount.classList.add("ms-2");
    reactionCount.textContent = `${reactionsCount}`;

    reactionsContainer.append(
      reactionFirstSpan,
      reactionSecondSpan,
      reactionThirdSpan,
      reactionCount
    );

    reactionButton.append(reactionsContainer);

    const reactionDropdownMenu = document.createElement("ul");
    reactionDropdownMenu.classList.add("dropdown-menu");

    const reactionDropdownItem1 = document.createElement("li");
    reactionDropdownItem1.classList.add("dropdown-item");

    const reactionDropdownButton1 = document.createElement("button");
    reactionDropdownButton1.classList.add("btn");
    const spanLike = document.createElement("span");
    spanLike.classList.add("ms-2");
    spanLike.textContent = "Like";
    const spanReactionLike = document.createElement("span");
    spanReactionLike.classList.add("ms-2");
    spanReactionLike.textContent = "👍";
    reactionDropdownButton1.append(spanReactionLike, spanLike);
    reactionDropdownButton1.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("reactionClicked", {
          bubbles: true,
          detail: { reaction: "like", emoji: "👍" },
        })
      );
    });

    reactionDropdownItem1.append(reactionDropdownButton1);

    const reactionDropdownItem2 = document.createElement("li");
    reactionDropdownItem2.classList.add("dropdown-item");

    const reactionDropdownButton2 = document.createElement("button");
    reactionDropdownButton2.classList.add("btn");
    const spanLove = document.createElement("span");
    spanLove.classList.add("ms-2");
    spanLove.textContent = "Love";
    const spanReactionLove = document.createElement("span");
    spanReactionLove.classList.add("ms-2");
    spanReactionLove.textContent = "❤️";
    reactionDropdownButton2.append(spanReactionLove, spanLove);
    reactionDropdownButton2.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("reactionClicked", {
          bubbles: true,
          detail: { reaction: "love", emoji: "❤️" },
        })
      );
    });

    reactionDropdownItem2.append(reactionDropdownButton2);

    const reactionDropdownItem3 = document.createElement("li");
    reactionDropdownItem3.classList.add("dropdown-item");

    const reactionDropdownButton3 = document.createElement("button");
    reactionDropdownButton3.classList.add("btn");
    const spanLaugh = document.createElement("span");
    spanLaugh.classList.add("ms-2");
    spanLaugh.textContent = "Laugh";
    const spanReactionLaugh = document.createElement("span");
    spanReactionLaugh.classList.add("ms-2");
    spanReactionLaugh.textContent = "😂";

    reactionDropdownButton3.append(spanReactionLaugh, spanLaugh);
    reactionDropdownButton3.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("reactionClicked", {
          bubbles: true,
          detail: { reaction: "laugh", emoji: "😂" },
        })
      );
    });

    reactionDropdownItem3.append(reactionDropdownButton3);

    reactionDropdownMenu.append(
      reactionDropdownItem1,
      reactionDropdownItem2,
      reactionDropdownItem3
    );

    reactionDropdown.append(reactionButton, reactionDropdownMenu);

    this.append(reactionDropdown);
  }
}

customElements.define("reaction-button", ReactionButton);
