import reactionHandler from "../../handlers/reactionHandler.mjs";

export default function reactionButton(postId, reactions) {
  const html = `
      <div class="dropdown">
      <button class="me-3 btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <div class="d-flex align-items-center">
          <span class="fs-5 me-n2 z-3 bg-light rounded-circle px-1 shadow-sm">👍</span>
          <span class="me-n2 z-2 bg-light rounded-circle px-1 shadow-sm">😂</span>
          <span class="bg-light shadow-sm rounded-circle px-1">❤️</span>
          <span class="ms-2">${reactions.length}</span>
        </div>
      </button>
      <ul class="dropdown-menu">
        <li class="dropdown-item">
          <button class="btn react-button">            
            <span class="ms-2">👍</span>
            <span class="ms-2">${
              reactions.filter((reaction) => reaction.symbol === "👍").length
            }</span>
          </button>
        </li>
        <li class="dropdown-item">
          <button class="btn react-button">            
            <span class="ms-2">❤️</span>
            <span class="ms-2">${
              reactions.filter((reaction) => reaction.symbol === "❤️").length
            }</span>
          </button>
        </li>
        <li class="dropdown-item">
          <button class="btn react-button">            
            <span class="ms-2">😂</span>
            <span class="ms-2">${
              reactions.filter((reaction) => reaction.symbol === "😂").length
            }</span>
          </button>
        </li>
      </ul>      
    `;

  const template = document.createElement("template");
  template.innerHTML = html;
  const container = template.content.cloneNode(true);

  const filteredReactions = reactions.filter(
    (reaction) =>
      reaction.symbol !== "👍" &&
      reaction.symbol !== "❤️" &&
      reaction.symbol !== "😂"
  );

  const restOfTheReactions = filteredReactions.map((reaction) => {
    const dropdownItem = document.createElement("li");
    dropdownItem.classList.add("dropdown-item");
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerHTML = `
      <span class="ms-2">${reaction.symbol}</span>
      <span class="ms-2">${reaction.count}</span>
    `;
    dropdownItem.append(button);
    return dropdownItem;
  });

  const dropdownMenu = container.querySelector(".dropdown-menu");
  dropdownMenu.append(...restOfTheReactions);

  const buttons = container.querySelectorAll(".react-button");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      reactionHandler(postId, button.children[0].textContent, (reactions) => {
        console.log(reactions);
      });
    });
  });

  return container;
}
