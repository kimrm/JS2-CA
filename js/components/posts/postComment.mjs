import postHeader from "./postHeader.mjs";
import { isFollowing } from "../../utils/auth/user.js";

/**
 * Creates and returns a post comment component
 * @param {*} key
 * @param object comment
 * @param string replyToAuthor
 * @param boolean showReplyButton
 * @returns HTMLelement
 */
export default function postComment(
  key,
  comment,
  replyToAuthor,
  showReplyButton
) {
  const html = `
        <div id="comment_${key}"">                            
        </div>     
        <div class="mt-2"><a class="btn" href="#"><i class="bi bi-reply"></i> Reply</a></div>   
        `;
  const template = document.createElement("template");
  template.innerHTML = html;
  const container = template.content.cloneNode(true);

  const div = document.createElement("div");
  div.classList.add("ms-3", "mt-3", "p-2", "bg-body", "rounded");

  const commentContainer = container.querySelector(`#comment_${key}`);

  if (comment.replyToId) {
    const replyToTag = document.createElement("div");
    replyToTag.classList.add("text-body-tertiary");
    replyToTag.textContent = `replied to ${replyToAuthor}`;
    commentContainer.appendChild(replyToTag);
  }

  const commentPost = {
    ...comment,
    isFollowingAuthor: isFollowing(comment.owner),
  };
  const postHeaderElement = postHeader(key, commentPost);

  commentContainer.appendChild(postHeaderElement);

  const commentBody = document.createElement("div");
  commentBody.classList.add("mt-2");
  commentBody.textContent = comment.body;
  commentContainer.appendChild(commentBody);

  div.appendChild(container);

  return div;
}
