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
            <li><a href="#/beranda">Beranda</a></li>
            <li><a href="#/tips">Tips</a></li>
            <li><a href="#/diskusi">Diskusi</a></li>
            <li><a href="#/tentang">Tentang</a></li>
        </ul>
    </div>
    <div class="kontak-ft">
        <h2>Kontak</h2>
        <ul>
            <li><a href="https://www.linkedin.com/in/muh-dadang-hawari/" rel="noreffer" target="_blank">Dadang</a></li>
            <li><a href="https://www.linkedin.com/in/aryandhi-alhaqam-patompo-144634281/" rel="noreffer" target="_blank">Aryandhi</a></li>
            <li><a href="https://www.linkedin.com/in/azzam-al-husaini-1ba19b209/" rel="noreffer" target="_blank">Azzam</a></li>
            <li><a href="https://www.linkedin.com/in/malba-mario/" rel="noreffer" target="_blank">Mario</a></li>
            <li><a href="https://www.linkedin.com/in/rama-indrawan-53875b279/" rel="noreffer"  target="_blank">
            Rama</a></li>
        </ul>
    </div>
    <div class="alamat-ft">
        <h2>Alamat</h2>
        <p>Edukalina, Jl. Patut Utara, Kota Mataram</p>
    </div>
</div>
<hr>
<p>Copyright © ${new Date().getFullYear()}  - EDUKALINA. All Rights Reserved.</p>
      `;
  }
}

customElements.define('app-footer', AppFooter);
