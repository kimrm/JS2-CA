import postMedia from "./postMedia.mjs";
import reactionButton from "./reactionButton.mjs";
import { main as singlePost } from "../../pages/singlePost.js";

export default function postBody(
  key,
  { id, title, body, media, reactions },
  viewPostLinksActive = true
) {
  const html = `
    <div id="container" class="mb-3">
    <button id="titleButton" class="btn ps-0"><h2 id="postTitle_${key}" class="fs-5 my-2"></h2></button>
        <p id="postBody_${key}" class="mb-0"></p>
        <div id="postMedia_${key}"></div>
        <div id="reaction_buttons_${key}" class="d-flex mt-3">            
        </div>       
    </div>         
    `;

  const template = document.createElement("template");
  template.innerHTML = html;
  const container = template.content.cloneNode(true);

  const titleElement = container.querySelector(`#postTitle_${key}`);
  titleElement.innerText = title;

  const bodyElement = container.querySelector(`#postBody_${key}`);
  bodyElement.innerText = body;

  const mediaElement = container.querySelector(`#postMedia_${key}`);
  if (media) {
    const mediaComponent = postMedia(media);
    mediaElement.append(mediaComponent);
  }

  const reactionButtonsElement = container.querySelector(
    `#reaction_buttons_${key}`
  );

  const reactionButtonComponent = reactionButton(id, reactions);
  reactionButtonsElement.append(reactionButtonComponent);

  const titleButton = container.querySelector(`#titleButton`);
  titleButton.addEventListener("click", () => {
    if (!viewPostLinksActive) return;
    singlePost(id);
  });

  return container;
}
