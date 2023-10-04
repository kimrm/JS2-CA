export default function postMedia(media) {
  const html = `
      <div class="my-3">
        <img class="img-fluid w-75 d-none" src="${media}" />
      </div>
    `;

  const template = document.createElement("template");
  template.innerHTML = html;

  const container = template.content.cloneNode(true);

  const img = container.querySelector("img");
  img.addEventListener("load", () => {
    img.classList.remove("d-none");
  });

  return container;
}
