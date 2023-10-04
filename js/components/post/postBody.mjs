import "./postMedia.mjs";
import Component from "../component.mjs";

class PostBody extends Component {
  render() {
    const { title, body, media } = this.props;

    this.fromTemplate(`    
    <div id="container" class="mb-3">
      <h2 id="postTitle" class="fs-5 my-2"></h2>
      <p id="postBody" class="mb-0"></p>
      ${
        media && media !== "null" && media !== ""
          ? `<post-media media="${media}"></post-media>`
          : ""
      }
    </div>          
   `);

    const titleElement = this.querySelector("#postTitle");
    titleElement.textContent = title;

    const bodyElement = this.querySelector("#postBody");
    bodyElement.textContent = body;
  }
}

customElements.define("post-body", PostBody);
