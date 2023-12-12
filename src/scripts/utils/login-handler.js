import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { emptyField, wrongFormatEmail, wrongFormatUsername } from '../views/templates/page-creator';
import firebase from '../global/DB_CONFIG';
import { getDatabase, ref, get } from 'firebase/database';

const auth = getAuth(firebase);
const database = getDatabase(firebase);

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

    if (Array.from(inputPassword.children).some((child) => child.innerHTML === divElement.innerHTML)) {
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

    if (Array.from(inputEmail.children).some((child) => child.innerHTML === divElement.innerHTML)) {
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
    .then(async (userCredential) => {
      const { user } = userCredential;

      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);

      localStorage.setItem('user', JSON.stringify(snapshot.val()));

      location.assign('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
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
