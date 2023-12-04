// Import necessary functions from Firebase
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Import Firebase configuration
import firebaseConfig from '../global/DB_CONFIG';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Validate email and password functions remain the same
const validateEmail = (email) => {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
};

const validatePassword = (password) => password.length >= 6;

const register = () => {
  const username = document.getElementById('usernameRegist').value;
  const email = document.getElementById('emailRegist').value;
  const password = document.getElementById('passwordRegist').value;

  if (validateEmail(email) === false || validatePassword(password) === false) {
    alert('Email atau password salah');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;

      // Simpan informasi pengguna ke Realtime Database
      const userData = {
        username,
        email,
      };

      // Gunakan user.uid sebagai bagian dari path di database
      set(ref(database, `users/${user.uid}`), userData);
    })
    .then(() => {
      alert('User created');
    })
    .catch((error) => {
      const errorMessage = error.message;
      if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
        alert('Email telah terdaftar');
      } else {
        console.error('Error creating account:', error);
      }
    });
};

export default register;
