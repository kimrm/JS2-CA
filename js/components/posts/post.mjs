import postHeader from "./postHeader.mjs";
import postBody from "./postBody.mjs";
import postComment from "./postComment.mjs";
import postCommentForm from "./postCommentForm.mjs";
import { main as singlePost } from "../../pages/singlePost.js";

export default function post(key, post, showAllComments = false) {
  const html = `
  <div id="container_${key}" class="col">        
  </div>
  <div id="commentFormContainer"></div>
    `;
  const template = document.createElement("template");
  template.innerHTML = html;
  const container = template.content.cloneNode(true);

  const div = document.createElement("div");
  div.classList.add("row", "rounded", "mt-5", "py-3", "bg-light");
  div.appendChild(container);

  const elementContainer = div.querySelector(`#container_${key}`);

  const headerElement = postHeader(key, post);
  elementContainer.append(headerElement);

  const postBodyElement = postBody(key, post, showAllComments ? false : true);
  elementContainer.append(postBodyElement);

  if (showAllComments === false && post.comments.length > 0) {
    const firstComment = post.comments[0];
    const commentElement = postComment(0, firstComment, false, false);
    elementContainer.append(commentElement);
    const commentCountElement = document.createElement("div");
    commentCountElement.classList.add("text-body-tertiary", "mt-3", "ms-3");
    commentCountElement.textContent = `+ ${post.comments.length - 1} comments`;
    elementContainer.append(commentCountElement);
  } else {
    post.comments.forEach((comment, index) => {
      let repliedToAuthor = null;
      if (comment.replyToId) {
        const repliedToComment = post.comments.find(
          (c) => c.id === comment.replyToId
        );
        repliedToAuthor = repliedToComment.owner;
      }
      const commentElement = postComment(index, comment, repliedToAuthor);
      elementContainer.append(commentElement);
    });
  }

  if (showAllComments === false) {
    const readMoreButton = document.createElement("button");
    readMoreButton.classList.add("btn", "btn-outline-info", "rounded", "w-100");
    readMoreButton.textContent = "View post and comment";
    elementContainer.append(readMoreButton);
    readMoreButton.addEventListener("click", (e) => {
      singlePost(post.id);
    });
  } else {
    const commentFormElement = postCommentForm(post.id, (newComment) => {
      console.log(newComment);
      const commentElement = postComment(
        newComment.id,
        newComment,
        false,
        false
      );
      elementContainer.append(commentElement);
    });
    const commentFormContainer = div.querySelector("#commentFormContainer");
    commentFormContainer.append(commentFormElement);
  }

  return div;
}
