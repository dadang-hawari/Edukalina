// Import necessary functions from Firebase
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import {
  successPopUp, wrongFormatPass, wrongFormatEmail, wrongFormatUsername, emptyField, infoPopUp,
} from '../views/templates/page-creator';

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

const validateUsername = (username) => username.length >= 6;

const register = () => {
  const wrapper = document.querySelector('.bungkus');
  const username = document.getElementById('usernameRegist').value;
  const email = document.getElementById('emailRegist').value;
  const password = document.getElementById('passwordRegist').value;

  const data = {
    usernameInput: username,
    emailInput: email,
    passwordInput: password,
  };

  const inputUsername = document.getElementById('inputUsername');
  const inputEmail = document.getElementById('inputEmail');
  const inputPassword = document.getElementById('inputPassword');
  const divElement = document.createElement('div');

  if (username.length === 0 || password.length === 0 || email.length === 0) {
    divElement.innerHTML = emptyField;

    // Memeriksa apakah inputPassword memiliki anak elemen dengan konten divElement
    if (Array.from(inputPassword.children)
      .some((child) => child.innerHTML === divElement.innerHTML)) {
      return;
    }

    inputPassword.appendChild(divElement);
    setTimeout(() => {
      inputPassword.removeChild(divElement);
    }, 2000);
    return;
  }

  if (validateUsername(username) === false) {
    divElement.innerHTML = wrongFormatUsername;

    if (Array.from(inputUsername.children)
      .some((child) => child.innerHTML === divElement.innerHTML)) {
      return;
    }
    inputUsername.appendChild(divElement);
    return;
  }

  if (validateEmail(email) === false) {
    divElement.innerHTML = wrongFormatEmail;

    if (Array.from(inputEmail.children)
      .some((child) => child.innerHTML === divElement.innerHTML)) {
      return;
    }
    inputEmail.appendChild(divElement);
    return;
  }

  if (validatePassword(password) === false) {
    divElement.innerHTML = wrongFormatPass;

    if (Array.from(inputPassword.children)
      .some((child) => child.innerHTML === divElement.innerHTML)) {
      return;
    }
    inputPassword.appendChild(divElement);
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      auth.currentUser.displayName = username;

      // Simpan informasi pengguna ke Realtime Database
      const userData = {
        username,
        email,
        displayName: username,
        uid: user.uid,
      };

      localStorage.setItem('user', JSON.stringify(userData));

      // Gunakan user.uid sebagai bagian dari path di database
      set(ref(database, `users/${user.uid}`), userData);
      sendEmailVerification(auth.currentUser);
      const usernya = auth.currentUser;
      console.log(usernya);
      console.log(`nama display: ${usernya.uid}`);
      console.log(`nama display: ${usernya.email}`);
      console.log(`nama display: ${usernya.displayName}`);
      console.log(`verifikasi: ${usernya.emailVerified}`);
      console.log(`verifikasi: ${usernya.uid}`);
    })
    .then(() => {
      if (inputUsername.innerHTML.includes(divElement)) { inputUsername.removeChild(divElement); }
      if (inputPassword.innerHTML.includes(divElement)) { inputPassword.removeChild(divElement); }
      if (inputEmail.innerHTML.includes(divElement)) { inputEmail.removeChild(divElement); }
      wrapper.innerHTML += successPopUp;
      setTimeout(() => {
        if (auth) { location.assign('/#/beranda'); }
      }, 2000);
    }).catch((error) => {
      inputUsername.value = data.usernameInput;
      inputPassword.value = data.passwordInput;
      inputEmail.value = data.emailInput;
      const errorMessage = error.message;
      if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
        divElement.innerHTML = infoPopUp;

        if (Array.from(wrapper.children)
          .some((child) => child.innerHTML === divElement.innerHTML)) {
          return;
        }
        wrapper.appendChild(divElement);

        setTimeout(() => {
          wrapper.removeChild(divElement);
        }, 3000);
        return;
      }
      console.error('Error creating account:', error);
    });
};

export default register;
