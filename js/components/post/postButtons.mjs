import "./reactionButton.mjs";
import Component from "../component.mjs";

class PostButtons extends Component {
  render() {
    const reactionCount = this.getAttribute("reaction_count");

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("d-flex", "mt-3");

    const likeButton = document.createElement("reaction-button");
    likeButton.setAttribute("props", JSON.stringify(this.props));

    const commentButton = document.createElement("button");
    commentButton.classList.add("me-3", "btn", "btn");

    const commentCount = document.createElement("span");
    commentCount.classList.add("ms-1");
    commentCount.textContent = "0 comments";

    commentButton.append(commentCount);

    buttonsContainer.append(likeButton, commentButton);

    this.append(buttonsContainer);
  }
}

customElements.define("post-buttons", PostButtons);
