import { getDatabase, ref, get } from 'firebase/database';
import { createDiscussionCard, createDiscussionPembahasan } from '../templates/page-creator';
import firebase from '../../global/DB_CONFIG';

async function getDiscussionData(questionId) {
  try {
    const db = getDatabase(firebase);
    const questionRef = ref(db, `questions/${questionId}`);
    const snapshot = await get(questionRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null; // Discussion data not found
  } catch (error) {
    console.error('Error fetching discussion data:', error);
    return null;
  }
}

const Pembahasan = {
  async render() {
    return `
      <h2>Ini halaman pembahasan diskusi</h2>
      <div class="diskusi-content"></div>
    `;
  },

  async afterRender() {
    const discussionContent = document.querySelector('.diskusi-content');

    const questionId = window.location.hash.substring(13);

    if (questionId) {
      const discussionData = await getDiscussionData(questionId);
      if (discussionData) {
        const discussionCard = createDiscussionPembahasan(discussionData);
        discussionContent.appendChild(discussionCard);
      } else {
        discussionContent.innerHTML = '<p>Diskusi tidak ditemukan</p>';
      }
    } else {
      discussionContent.innerHTML = '<p>Invalid URL</p>';
    }
  },
};

export default Pembahasan;
