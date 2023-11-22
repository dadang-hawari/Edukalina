
class AppFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="flex-wrapper">
        <div class="brand-footer">
            <h2>EDUKALINA</h2>
            <p>Edukasi Berkualitas Indonesia</p>
        </div>
        <div class="flex-column">
            <h2>Navigasi</h2>
            <a href="">Beranda</a>
            <a href="">Tips</a>
            <a href="">Event</a>
            <a href="">Diskusi</a>
            <a href="">Tentang</a>
        </div>
        <div class="flex-column">
            <h2>Hubungi Kami</h2>
            <a href="">Dadang</a>
            <a href="">Aryandhi</a>
            <a href="">Azam</a>
            <a href="">Mario</a>
            <a href="">Rama</a>
        </div>
        <div class="flex-column">
            <h2>Alamat</h2>
            <a href="">Edukalina, Jl. Patut Utara, Kota Mataram</a>
        </div>
        </div>
        <hr>
        <p>Copyright © 2023 - EDUKALINA. All Rights Reserved.</p>
      `;
  }
}

customElements.define('app-footer', AppFooter);