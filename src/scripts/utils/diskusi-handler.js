// Import necessary functions from Firebase
import {
  getDatabase, ref, push, set,
} from 'firebase/database';
import { getAuth } from 'firebase/auth';
import firebase from '../global/DB_CONFIG';

// Initialize Firebase
const database = getDatabase(firebase);
const auth = getAuth(firebase);
const options = {
  timeZone: 'Asia/Jakarta',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
};

const formatter = new Intl.DateTimeFormat('id-ID', options);
const dateTimeString = formatter.format(new Date());

const formattedString = dateTimeString.replace(/\//g, '-').replace(', ', ' | ');

const questionsRef = ref(database, 'questions');

const addQuestion = async (title, pertanyaan) => {
  const user = auth.currentUser;

  if (user) {
    const newQuestionRef = push(questionsRef);
    const questionId = newQuestionRef.key;

    const questionData = {
      questionId,
      userId: user.uid,
      userName: user.displayName,
      title,
      pertanyaan,
      timestamp: formattedString,
    };

    await set(newQuestionRef, questionData);
  }
};

export { addQuestion, formattedString };
