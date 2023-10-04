class Component extends HTMLElement {
  static get observedAttributes() {
    return ["props"];
  }

  constructor() {
    super();
    this.initialized = false;
  }

  connectedCallback() {
    this.props = JSON.parse(this.getAttribute("props"));
    this.render();
    this.initialized = true;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.initialized) {
      return;
    }

    this.props = JSON.parse(this.getAttribute("props"));

    this.updateUI();
  }

  fromTemplate(html) {
    const template = document.createElement("template");
    template.innerHTML = html;
    const container = template.content.cloneNode(true);
    this.append(container);
  }
}

export default Component;
