class CustomElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }
}

export default CustomElement;
