import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  emptyField, wrongFormatEmail, wrongFormatUsername,
} from '../views/templates/page-creator';
import firebase from '../global/DB_CONFIG';

const auth = getAuth(firebase);

const validateEmail = (email) => {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
};

const login = () => {
  const email = document.getElementById('email').value;
  const inputEmail = document.getElementById('inputEmail');
  const password = document.getElementById('password').value;
  const inputPassword = document.getElementById('inputPassword');
  const divElement = document.createElement('div');
  console.log(`email anda ${email}`);

  if (email.length === 0 || password.length === 0) {
    divElement.innerHTML = emptyField;

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

  // Melakukan proses autentikasi menggunakan Firebase
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Login berhasil, userCredential.user berisi informasi user yang telah login
      const { user } = userCredential;
      localStorage.setItem('user', JSON.stringify(user));
      location.assign('/');
    })
    .catch((error) => {
      // Menangani kesalahan pada proses autentikasi
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/user-not-found') {
        // Kasus ketika akun belum terdaftar
        divElement.innerHTML = wrongFormatEmail;
        inputPassword.appendChild(divElement);
        setTimeout(() => {
          inputPassword.removeChild(divElement);
        }, 4000);
      } else if (errorCode === 'auth/wrong-password') {
        // Kasus ketika password salah
        divElement.innerHTML = wrongFormatEmail;
        inputPassword.appendChild(divElement);
        setTimeout(() => {
          inputPassword.removeChild(divElement);
        }, 4000);
      } else {
        console.error('Error during login:', errorCode, errorMessage);
      }
    });
};

export default login;
