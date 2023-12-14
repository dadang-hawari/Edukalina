import { getAuth } from 'firebase/auth';
import firebase from '../../global/DB_CONFIG';
import { notLoginDiscuss } from '../templates/page-creator';

const auth = getAuth(firebase);

const Diskusi = {
  async render() {
    return `
      <div class="diskusi-desk">
        <h2 class="blue" id="diskusi">Diskusi</h2>
        <p>Silahkan melakukan diskusi jika Anda memiliki pertanyaan, seperti bertanya mengenai masalah saat mengajar
        ataupun bertanya mengenai hal-hal yang memerlukan pandangan dari banyak orang.</p>
      </div>
      <div class="diskusi-form">
        <form action="" class="form-diskusi">
          <label for="title">Subjek</label>
          <input type="text" id="title" required placeholder="Judul pertanyaan" >
          <label for="pertanyaan">Pertanyaan</label>
          <textarea type="text" id="pertanyaan" rows="4" placeholder="Masukkan pertanyaan Anda"></textarea>
          <div class="info-diskusi"></div>
          <button class="btn-diskusi" disabled>Kirim</button>
        </form>
      </div>
      <div class="diskusi-container">
        <a href="">
          <div class="diskusi-card">
            <div class="profile">
              <b id="userName"></b>
              -<i>${new Date().toLocaleDateString()}</i>
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
    // Lakukan tindakan setelah render, jika diperlukan
    const userName = document.querySelector('#userName');
    const infoDiskusi = document.querySelector('.info-diskusi');
    const btnDiskusi = document.querySelector('.btn-diskusi');

    auth.onAuthStateChanged((user) => {
      if (user) {
        userName.innerHTML = user.displayName;
        btnDiskusi.removeAttribute('disabled');
      } else {
        infoDiskusi.innerHTML = notLoginDiscuss;
      }
    });
  },
};

export default Diskusi;
