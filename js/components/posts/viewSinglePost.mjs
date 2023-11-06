import postComponent from "./post.mjs";

/**
 * Create the post comment form
 * @param {object} post The post object
 * @returns {HTMLDivElement} The post comment form
 */
export default function viewSinglePost(post) {
  const html = `
<div class="container">
    
</div>
  `;

  const template = document.createElement("template");
  template.innerHTML = html;
  const container = template.content.cloneNode(true);

  const div = document.createElement("div");
  div.classList.add("p-4", "bg-light", "rounded");
  div.appendChild(container);

  const postElement = postComponent(0, post, true);

  div.querySelector(".container").appendChild(postElement);

  return div;
}
