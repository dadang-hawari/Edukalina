class NavBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `

   `;
  }
}

customElements.define('nav-bar', NavBar);
