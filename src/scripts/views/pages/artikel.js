const Artikel = {
  async render() {
    return `
    <article>
    <a href="#" class="kembali-a"> < Kembali</a>
        <h1>Pembuatan Materi Menggunakan Microsoft Power Point</h1>
        <figure>
            <img src="./images/article/powerpoint.png" alt="Deskripsi Gambar 1">
            <figcaption>Power Point</figcaption>
        </figure>
        <section>
            <p>PowerPoint dapat memudahkan para pengguna untuk mengatur materi yang akan disampaikan. Power point dapat membuat audiens menjadi lebih memahami materi presentasi yang sedang ditampilkan. Hal ini dapat terjadi karena dalam pengguna menampilkan poin-poin utama dalam slide yang ditampilkan.</p>
            <p>PowerPoint dapat memudahkan para pengguna untuk mengatur materi yang akan disampaikan. Power point dapat membuat audiens menjadi lebih memahami materi presentasi yang sedang ditampilkan. Hal ini dapat terjadi karena dalam pengguna menampilkan poin-poin utama dalam slide yang ditampilkan.</p>
            <p>PowerPoint dapat memudahkan para pengguna untuk mengatur materi yang akan disampaikan. Power point dapat membuat audiens menjadi lebih memahami materi presentasi yang sedang ditampilkan. Hal ini dapat terjadi karena dalam pengguna menampilkan poin-poin utama dalam slide yang ditampilkan.</p>
        </section>
        </article>
        `;
  },

  async afterRender() {
    '';
  },
};

export default Artikel;
