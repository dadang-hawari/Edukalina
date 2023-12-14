import {
  getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,
} from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { emptyField, wrongFormatEmail, wrongEmailOrPass } from '../views/templates/page-creator';
import firebase from '../global/DB_CONFIG';

const auth = getAuth(firebase);
const database = getDatabase(firebase);

const divElement = document.createElement('div');

const validateEmail = (email) => {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
};

const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const { user } = result;

      const additionalUserInfo = {
        email: user.email,
        name: user.displayName,
        userId: user.uid,
      };

      const userRef = ref(database, `users/${additionalUserInfo}`);

      localStorage.setItem('user', JSON.stringify(additionalUserInfo));
      location.assign('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error during Google login:', errorCode, errorMessage);
    });
};

const login = () => {
  const email = document.getElementById('email').value;
  const inputEmail = document.getElementById('inputEmail');
  const password = document.getElementById('password').value;
  const inputPassword = document.getElementById('inputPassword');

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

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const { user } = userCredential;
      console.log(user);

      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);

      localStorage.setItem('user', JSON.stringify(snapshot.val()));

      location.assign('/');
    })
    .catch((error) => {
      const errorMessage = error.message;

      if (errorMessage === 'Firebase: Error (auth/invalid-credential).') {
        divElement.innerHTML = wrongEmailOrPass;
        inputPassword.appendChild(divElement);
        setTimeout(() => {
          inputPassword.removeChild(divElement);
        }, 4000);
      }
    });
};

export { loginWithGoogle, login };
