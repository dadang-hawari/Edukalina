class AppFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="flex-footer">
    <div class="brand-footer">
        <h2>EDUKALINA</h2>
        <p>Edukasi Berkualitas Indonesia</p>
    </div>
    <div class="navigasi-ft">
        <h2>Navigasi</h2>
        <ul>
            <li><a href="">Beranda</a></li>
            <li><a href="">Tips & Trick</a></li>
            <li><a href="">Diskusi</a></li>
            <li><a href="">Tentang</a></li>
        </ul>
    </div>
    <div class="kontak-ft">
        <h2>Kontak</h2>
        <ul>
            <li><a href="">Dadang</a></li>
            <li><a href="">Aryandhi</a></li>
            <li><a href="">Azzam</a></li>
            <li><a href="">Mario</a></li>
            <li><a href="">Rama</a></li>
        </ul>
    </div>
    <div class="alamat-ft">
        <h2>Alamat</h2>
        <p>Edukalina, Jl. Patut Utara, Kota Mataram</p>
    </div>
</div>
<hr>
<p>Copyright © 2023 - EDUKALINA. All Rights Reserved.</p>
      `;
  }
}

customElements.define('app-footer', AppFooter);
