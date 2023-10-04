import Component from "../component.mjs";

class PostMedia extends Component {
  render() {
    const media = this.getAttribute("media");
    this.fromTemplate(`
      <div class="my-3">
        <img class="img-fluid w-75 d-none" src="${media}" />
      </div>
    `);

    const img = this.querySelector("img");
    img.addEventListener("load", () => {
      img.classList.remove("d-none");
    });
  }
}

customElements.define("post-media", PostMedia);
