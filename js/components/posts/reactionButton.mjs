export default function reactionButton(reactions) {
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
          <button class="btn">            
            <span class="ms-2">👍</span>
            <span class="ms-2">1432</span>
          </button>
        </li>
        <li class="dropdown-item">
          <button class="btn">            
            <span class="ms-2">❤️</span>
            <span class="ms-2">543</span>
          </button>
        </li>
        <li class="dropdown-item">
          <button class="btn">            
            <span class="ms-2">😂</span>
            <span class="ms-2">985</span>
          </button>
        </li>
      </ul>      
    `;

  const template = document.createElement("template");
  template.innerHTML = html;
  const container = template.content.cloneNode(true);
  return container;
}
