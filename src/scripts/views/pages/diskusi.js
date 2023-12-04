const Diskusi = {
  async render() {
    return `
    <div class="diskusi-desk">
    <h2 class="blue">Diskusi</h2>
    <p>Silahkan melakukan diskusi jika Anda memiliki pertanyaan, seperti bertanya mengenai masalah saat mengajar
        ataupun bertanya mengenai hal-hal yang memerlukan pandangan dari banyak orang. </p>
</div>
<div class="diskusi-form">

    <form action="" class="form-diskusi">
        <label for="title">Subjek</label>
        <input type="text" id="title" required>
        <label for="pertanyaan">Pertanyaan</label>
        <textarea type="text" id="pertanyaan" required></textarea>
        <button class="btn-diskusi">Kirim</button>
    </form>

    
</div>
<div class="diskusi-container">

    <a href="">
    <div class="diskusi-card">
            <div class="profile">
                <b>Moh. Azzam Al Husiaini </b>
                -<i>5 Desember 2023</i>
            </div>
            <div class="diskusi-point">
                <b>Apa sih yang membuat siswa tertarik saat berada di kelas</b>
                <p>Saya ingin bertanya terkait apasih yang bisa kita lakukan sebagai tenaga pengajar sajikan,
                    agar para siswa tertarik dengan apa yang akan kita bawa.</p>
            </div>
            <div class="sum-pembahasan">
                <h4>5 Pembahasan</h4>
            </div>
        </div>
    </a>

    <a href="">
    <div class="diskusi-card">
            <div class="profile">
                <b>Moh. Azzam Al Husiaini </b>
                -<i>5 Desember 2023</i>
            </div>
            <div class="diskusi-point">
                <b>Apa sih yang membuat siswa tertarik saat berada di kelas</b>
                <p>Saya ingin bertanya terkait apasih yang bisa kita lakukan sebagai tenaga pengajar sajikan,
                    agar para siswa tertarik dengan apa yang akan kita bawa.</p>
            </div>
            <div class="sum-pembahasan">
                <h4>5 Pembahasan</h4>
            </div>
        </div>
    </a>
</div>
    `;
  },

  async afterRender() {
    '';
  },
};

export default Diskusi;
