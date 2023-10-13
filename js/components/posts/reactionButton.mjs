import reactionHandler from "../../handlers/reactionHandler.mjs";

/**
 * Create the reaction button
 * @param {string} postId The post id
 * @param {array} reactions The reactions array
 * @returns {Node} The reaction button
 */
export default function reactionButton(postId, reactions) {
  const html = `
      <div class="dropdown">
      <button class="me-3 btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <div class="d-flex align-items-center">
          <div id="reactionsSpread" class="d-flex align-items-center">
            ${reactionsSpread(reactions).join("")}
          </div>          
          <!--<span class="fs-5 me-n2 z-3 bg-light rounded-circle px-1 shadow-sm">👍</span>
          <span class="me-n2 z-2 bg-light rounded-circle px-1 shadow-sm">😂</span>
          <span class="bg-light shadow-sm rounded-circle px-1">❤️</span>-->
          <span class="ms-2">${countReactions(reactions)} reactions</span>
        </div>
      </button>
      <ul class="dropdown-menu">
        
      </ul>      
    `;

  const template = document.createElement("template");
  template.innerHTML = html;
  const container = template.content.cloneNode(true);

  const restOfTheReactions = processReactions(reactions);

  const defaultDropdownItems = [
    renderReactionDropdownItem({
      symbol: "👍",
      count: reactions.reduce((accumulator, currentValue) => {
        if (currentValue.symbol === "👍") {
          return accumulator + currentValue.count;
        }
        return accumulator;
      }, 0),
    }),
    renderReactionDropdownItem({
      symbol: "❤️",
      count: reactions.reduce((accumulator, currentValue) => {
        if (currentValue.symbol === "❤️") {
          return accumulator + currentValue.count;
        }
        return accumulator;
      }, 0),
    }),
    renderReactionDropdownItem({
      symbol: "😂",
      count: reactions.reduce((accumulator, currentValue) => {
        if (currentValue.symbol === "😂") {
          return accumulator + currentValue.count;
        }
        return accumulator;
      }, 0),
    }),
  ];

  const dropdownMenu = container.querySelector(".dropdown-menu");
  dropdownMenu.append(...defaultDropdownItems, ...restOfTheReactions);

  const buttons = container.querySelectorAll(".react-button");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      reactionHandler(postId, button.children[0].textContent, (reaction) => {
        reactions.forEach((reaction) => {
          if (reaction.symbol === e.target.textContent) {
            reaction.count++;
          }
        });
      });
    });
  });

  return container;
}

function countReactions(reactions) {
  return reactions.reduce(
    (accumulator, currentValue) => accumulator + currentValue.count,
    0
  );
}

function renderReactionDropdownItem(reaction) {
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
}

function processReactions(reactions) {
  const filteredReactions = reactions.filter(
    (reaction) =>
      reaction.symbol !== "👍" &&
      reaction.symbol !== "❤️" &&
      reaction.symbol !== "😂"
  );

  const restOfTheReactions = filteredReactions.map((reaction) => {
    const dropdownItem = renderReactionDropdownItem(reaction);
    return dropdownItem;
  });

  return restOfTheReactions;
}

function reactionsSpread(reactions) {
  if (reactions.length === 0) {
    return [
      `<span class="fs-5 me-n2 z-3 bg-light rounded-circle px-1 shadow-sm">👍</span>`,
    ];
  } else {
    const sortedReactions = reactions.sort((a, b) => {
      return b.count - a.count;
    });
    return reactions.map((reaction, index) => {
      return `<span class="${
        index === 0 ? `fs-3` : `fs-6`
      } me-n2 z-3 bg-light rounded-circle px-1 shadow-sm">${
        reaction.symbol
      }</span>`;
    });
  }
}
