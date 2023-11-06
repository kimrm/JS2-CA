import createPostHandler from "../../handlers/createPostHandler.mjs";

/**
 * Create the post creation form
 * @returns {HTMLDivElement} The post creation form
 */
export default function createPost() {
  const html = `
  <form action="">
  <div>
    <label for="title" class="form-label">Title</label>
    <input
      type="text"
      class="form-control"
      id="title"
      name="title"
      placeholder="My day..."
</div>
  <div class="mt-3">
    <label for="body" class="form-label">Body</label>
    <textarea
      class="form-control"
      id="body"
      name="body"
      rows="3"
      placeholder="Tell us about your day..."
    ></textarea>
  </div>
  <div class="mt-3">
    <label for="media" class="form-label">Media </label>
    <input
      class="form-control"
      type="url"
      id="media"
      name="media"
      value=""      
  </div>
  <div class="mt-3">
    <button type="submit" class="btn btn-primary">Submit your post</button>
    
    </div>
</form>
  `;

  const template = document.createElement("template");
  template.innerHTML = html;
  const container = template.content.cloneNode(true);

  const div = document.createElement("div");
  div.classList.add("p-4", "bg-light", "rounded");
  div.appendChild(container);

  const form = div.querySelector("form");
  form.addEventListener("submit", createPostHandler);

  return div;
}
