import "./postButtons.mjs";
import "./postHeader.mjs";
import "./postBody.mjs";
import Component from "../component.mjs";

class PostComponent extends Component {
  render() {
    const {
      created: date,
      title,
      body,
      media,
      isFollowingAuthor,
      reactionCount,
    } = this.props;
    const { name, avatar } = this.props.author;

    const componentContainer = document.createElement("div");
    componentContainer.classList.add(
      "row",
      "rounded",
      "mt-5",
      "py-3",
      "bg-light"
    );

    const innerContainer = document.createElement("div");
    innerContainer.classList.add("col");

    const headerContainer = document.createElement("post-header");
    const headerProps = {
      author: name,
      avatar: avatar,
      date: date,
      isFollowingAuthor: isFollowingAuthor,
    };
    headerContainer.setAttribute("props", JSON.stringify(headerProps));

    innerContainer.append(headerContainer);
    componentContainer.append(innerContainer);

    const bodyContainer = document.createElement("post-body");
    bodyContainer.setAttribute("props", JSON.stringify(this.props));
    componentContainer.append(bodyContainer);

    const buttonsContainer = document.createElement("post-buttons");
    buttonsContainer.setAttribute("props", JSON.stringify(this.props._count));
    componentContainer.append(buttonsContainer);

    this.append(componentContainer);
  }

  setFollowState(isFollowing) {
    const headerContainer = this.querySelector("post-header");
    headerContainer.setFollowState(isFollowing);
    this.setAttribute("isFollowingAuthor", isFollowing.toString());
  }
}

customElements.define("post-component", PostComponent);
