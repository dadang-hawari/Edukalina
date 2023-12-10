import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'edukalina-account.firebaseapp.com',
  databaseURL: 'https://edukalina-account-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'edukalina-account',
  storageBucket: 'edukalina-account.appspot.com',
  messagingSenderId: '80187260169',
  appId: '1:80187260169:web:9c41f92dd4d405285567d8',
  measurementId: 'G-4Q1XSJKKC1',
};

const firebase = initializeApp(firebaseConfig);

export default firebase;
