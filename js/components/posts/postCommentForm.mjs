import createCommentHandler from "../../handlers/createCommentHandler.mjs";

/**
 * Create the post comment form
 * @param {string} postId The post id
 * @param {function} callback The callback function to be called when a comment is created
 * @returns {HTMLDivElement} The post comment form
 */
export default function postCommentForm(postId, callback) {
  const html = `
        <form class="comment-form mt-3">
            <div class="form-group mb-3">
                <textarea name="body" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Comment</button>
        </form>
        `;

  const template = document.createElement("template");
  template.innerHTML = html;
  const container = template.content.cloneNode(true);

  const form = container.querySelector("form");
  form.addEventListener("submit", (e) => {
    createCommentHandler(postId, e).then((newComment) => {
      callback(newComment);
    });
  });

  return container;
}
