import updatePostHandler from "../../handlers/updatePostHandler.mjs";
import deletePostHandler from "../../handlers/deletePostHandler.mjs";
import { post } from "../../utils/API/api.js";

export default function updatePost(id) {
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
    <button type="submit" class="btn btn-primary">Submit update</button>
    <button class="btn btn-outline-danger" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDelete" aria-expanded="false" aria-controls="collapseDelete">
        Delete post
    </button>
  </div>  
</form>
<div class="collapse danger mt-2" id="collapseDelete">
    <div class="card card-body">
        Are you sure you want to delete this post? It will be gone forever.
        <button id="deleteConfirmButton" class="btn btn-danger mt-2">I'm sure. Delete it now!</button>
    </div>
  </div>
  `;

  const template = document.createElement("template");
  template.innerHTML = html;
  const container = template.content.cloneNode(true);

  const div = document.createElement("div");
  div.classList.add("p-4", "bg-light", "rounded");
  div.appendChild(container);

  const form = div.querySelector("form");

  post(id, {
    accessToken: JSON.parse(localStorage.getItem("userData")).accessToken,
  }).then((data) => {
    form.querySelector("#title").value = data.title;
    form.querySelector("#body").value = data.body;
    form.querySelector("#media").value = data.media;
  });

  form.addEventListener("submit", (e) => {
    updatePostHandler(id, e);
  });

  const deleteConfirmButton = div.querySelector("#deleteConfirmButton");
  deleteConfirmButton.addEventListener("click", (e) => {
    deletePostHandler(id, e);
  });

  return div;
}
