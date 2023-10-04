import postHeader from "./postHeader.mjs";
import postBody from "./postBody.mjs";
import postComment from "./postComment.mjs";

export default function post(key, post) {
  const html = `
  <div id="container_${key}" class="col">        
  </div>
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

  const postBodyElement = postBody(key, post);
  elementContainer.append(postBodyElement);

  if (post.comments.length > 0) {
    const firstComment = post.comments[0];
    const commentElement = postComment(0, firstComment, false, false);
    elementContainer.append(commentElement);
    const commentCountElement = document.createElement("div");
    commentCountElement.classList.add("text-body-tertiary", "mt-3", "ms-3");
    commentCountElement.textContent = `+ ${post.comments.length - 1} comments`;
    elementContainer.append(commentCountElement);
  }

  // post.comments.forEach((comment, index) => {
  //   let repliedToAuthor = null;
  //   if (comment.replyToId) {
  //     const repliedToComment = post.comments.find(
  //       (c) => c.id === comment.replyToId
  //     );
  //     repliedToAuthor = repliedToComment.owner;
  //   }
  //   const commentElement = postComment(index, comment, repliedToAuthor);
  //   elementContainer.append(commentElement);
  // });

  return div;
}
