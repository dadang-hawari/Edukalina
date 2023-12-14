// Import necessary functions from Firebase
import { getDatabase, ref, set } from 'firebase/database';
import {
  getAuth, createUserWithEmailAndPassword, updateProfile,
} from 'firebase/auth';
import {
  successPopUp, wrongFormatPass, wrongFormatEmail, wrongFormatUsername, emptyField, infoPopUp,
} from '../views/templates/page-creator';

import NavBar from '../components/nav-bar';

// Import Firebase configuration
import firebase from '../global/DB_CONFIG';

// Initialize Firebase
const database = getDatabase(firebase);
const auth = getAuth(firebase);
const navBar = new NavBar();
// Validate email and password functions remain the same
const validateEmail = (email) => {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
};

const validatePassword = (password) => password.length >= 6;

const validateUsername = (username) => username.length >= 6;

const register = () => {
  const wrapper = document.querySelector('.bungkus');
  const name = document.getElementById('usernameRegist').value;
  const email = document.getElementById('emailRegist').value;
  const password = document.getElementById('passwordRegist').value;

  const data = {
    usernameInput: name,
    emailInput: email,
    passwordInput: password,
  };

  const inputUsername = document.getElementById('inputUsername');
  const inputEmail = document.getElementById('inputEmail');
  const inputPassword = document.getElementById('inputPassword');
  const divElement = document.createElement('div');

  if (name.length === 0 || password.length === 0 || email.length === 0) {
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

  if (validateUsername(name) === false) {
    divElement.innerHTML = wrongFormatUsername;

    if (Array.from(inputUsername.children)
      .some((child) => child.innerHTML === divElement.innerHTML)) {
      return;
    }
    inputUsername.appendChild(divElement);
    setTimeout(() => {
      inputUsername.removeChild(divElement);
    }, 4000);
    return;
  }

  if (validateEmail(email) === false) {
    divElement.innerHTML = wrongFormatEmail;

    if (Array.from(inputEmail.children)
      .some((child) => child.innerHTML === divElement.innerHTML)) {
      return;
    }
    inputEmail.appendChild(divElement);
    setTimeout(() => {
      inputEmail.removeChild(divElement);
    }, 4000);
    return;
  }

  if (validatePassword(password) === false) {
    divElement.innerHTML = wrongFormatPass;

    if (Array.from(inputPassword.children)
      .some((child) => child.innerHTML === divElement.innerHTML)) {
      return;
    }
    inputPassword.appendChild(divElement);
    inputPassword.appendChild(divElement);
    setTimeout(() => {
      inputPassword.removeChild(divElement);
    }, 4000);
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;

      // Simpan informasi pengguna ke Realtime Database
      const userData = {
        name,
        email,
        uid: user.uid,
      };

      updateProfile(user, { displayName: name });

      set(ref(database, `users/${user.uid}`), userData);
    })
    .then(() => {
      wrapper.innerHTML += successPopUp;
      if (inputUsername.innerHTML.includes(divElement)) { inputUsername.removeChild(divElement); }
      if (inputPassword.innerHTML.includes(divElement)) { inputPassword.removeChild(divElement); }
      if (inputEmail.innerHTML.includes(divElement)) { inputEmail.removeChild(divElement); }
      setTimeout(() => {
        if (auth) { navBar.render(); location.assign('/#/login'); }
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
