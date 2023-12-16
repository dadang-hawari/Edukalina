import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebase from '../../global/DB_CONFIG';
import {
  notLoginDiscuss, createDiscussionCard, emptyField, successDiscuss,
} from '../templates/page-creator';
import addQuestion from '../../utils/diskusi-handler';

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
          <input type="text" id="title" placeholder="Judul pertanyaan">
          <label for="pertanyaan">Pertanyaan</label>
          <textarea type="text" id="pertanyaan" rows="4" placeholder="Masukkan pertanyaan Anda" ></textarea>
          <div class="info-diskusi"></div>
          <button class="btn-diskusi" disabled>Kirim</button>
        </form>
      </div>
      <div class="diskusi-list">
      </div>
      `;
  },

  async afterRender() {
    const infoDiskusi = document.querySelector('.info-diskusi');
    const btnDiskusi = document.querySelector('.btn-diskusi');
    const titleInput = document.getElementById('title');
    const pertanyaanInput = document.getElementById('pertanyaan');
    const diskusiList = document.querySelector('.diskusi-list');
    const div = document.createElement('div');

    auth.onAuthStateChanged((user) => {
      if (user) {
        btnDiskusi.removeAttribute('disabled');
      } else {
        infoDiskusi.innerHTML = notLoginDiscuss;
      }
    });

    btnDiskusi.addEventListener('click', (e) => {
      e.preventDefault();
      const title = titleInput.value;
      const pertanyaan = pertanyaanInput.value;
      if (title && pertanyaan) {
        if (addQuestion(title, pertanyaan)) {
          div.innerHTML = successDiscuss;
          infoDiskusi.appendChild(div);
          setTimeout(() => {
            infoDiskusi.removeChild(div);
          }, 4000);
        }
        titleInput.value = '';
        pertanyaanInput.value = '';
      } else {
        div.innerHTML = emptyField;
        infoDiskusi.appendChild(div);
        setTimeout(() => {
          infoDiskusi.removeChild(div);
        }, 4000);
      }
    });

    onValue(ref(getDatabase(firebase), 'questions'), (snapshot) => {
      const questions = snapshot.val();

      diskusiList.innerHTML = '';

      if (questions) {
        const questionKeys = Object.keys(questions).reverse();

        questionKeys.forEach((questionId) => {
          const questionData = questions[questionId];
          const discussionCard = createDiscussionCard(questionData);
          diskusiList.appendChild(div);
          diskusiList.appendChild(discussionCard);
        });
      }
    });
  },
};

export default Diskusi;
