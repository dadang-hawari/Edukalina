import {
  getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,
} from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { emptyField, wrongFormatEmail, wrongFormatUsername } from '../views/templates/page-creator';
import firebase from '../global/DB_CONFIG';

const auth = getAuth(firebase);
const database = getDatabase(firebase);

const validateEmail = (email) => {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
};

const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token.
      // You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const { user } = result;
      console.log(user);

      // Handle your logic after successful Google login
      // For example, you can save user data to Firebase Realtime Database
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);

      // Additional user information
      const additionalUserInfo = {
        email: user.email,
        name: user.displayName,
        userId: user.uid,
        verified: user.emailVerified,
      };

      console.log(additionalUserInfo);

      // Combine additional info with data from the database

      localStorage.setItem('user', JSON.stringify(additionalUserInfo));

      // Redirect to the root page
      location.assign('/');
    })
    .catch((error) => {
      // Handle errors during Google login
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
  const divElement = document.createElement('div');

  if (email.length === 0 || password.length === 0) {
    divElement.innerHTML = emptyField;

    // eslint-disable-next-line max-len
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

export { loginWithGoogle, login };
