import {
  getDatabase, ref, get, push, set,
} from 'firebase/database';

import { getAuth } from 'firebase/auth';
import { async } from 'regenerator-runtime';
import { createDiscussionPembahasan, createReplyCard } from '../templates/page-creator';
import { formattedString } from '../../utils/diskusi-handler';
import firebase from '../../global/DB_CONFIG';

const auth = getAuth(firebase);

async function getDiscussionData(questionId) {
  try {
    const db = getDatabase(firebase);
    const questionRef = ref(db, `questions/${questionId}`);
    const snapshot = await get(questionRef);

    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Error fetching discussion data:', error);
    return null;
  }
}

async function addReply(questionId, replyText, userName, parentId = null) {
  try {
    const db = getDatabase(firebase);
    const repliesRef = parentId ? ref(db, `questions/${questionId}/replies/${parentId}/replies`) : ref(db, `questions/${questionId}/replies`);
    const newReplyRef = push(repliesRef);

    await set(newReplyRef, {
      text: replyText,
      timestamp: formattedString,
      userName,
    });
  } catch (error) {
    console.error('Error adding reply:', error);
  }
}

function displayReplies(replies) {
  const replySection = document.getElementById('reply-section');
  const jawaban = document.getElementById('replyText');
  replySection.innerHTML = '<h3>Replies:</h3>';

  if (replies) {
    Object.keys(replies).forEach((replyId) => {
      const replyData = replies[replyId];
      replySection.appendChild(createReplyCard(replyData));
      jawaban.value = '';
    });
  } else {
    replySection.innerHTML += '<p>No replies yet.</p>';
  }
}

const Pembahasan = {
  async render() {
    return `
      <div class="diskusi-content">
        <div id="discussion-card"></div>
        <div id="reply-section"></div>
      </div>
    `;
  },

  async afterRender() {
    const discussionContent = document.querySelector('.diskusi-content');
    const discussionCardContainer = document.getElementById('discussion-card');
    const replySection = document.getElementById('reply-section');

    const questionId = window.location.hash.substring(10);
    console.log(questionId);

    if (questionId) {
      const discussionData = await getDiscussionData(questionId);
      if (discussionData) {
        const discussionCard = createDiscussionPembahasan(discussionData, async (replyText) => {
          auth.onAuthStateChanged(async (user) => {
            if (user) {
              await addReply(questionId, replyText, user.displayName);
              // Wait for the reply to be added before updating the display
              const updatedDiscussionData = await getDiscussionData(questionId);
              displayReplies(updatedDiscussionData.replies);
            } else {
              // Handle the case where the user is not authenticated
            }
          });
        });
        discussionCardContainer.appendChild(discussionCard);

        displayReplies(discussionData.replies);
      } else {
        discussionContent.innerHTML = '<p>Diskusi tidak ditemukan</p>';
      }
    } else {
      discussionContent.innerHTML = '<p>Invalid URL</p>';
    }
  },
};

export default Pembahasan;
