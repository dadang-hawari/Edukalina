import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { emptyField, wrongFormatEmail } from '../views/templates/page-creator';
import firebase from '../global/DB_CONFIG';

const auth = getAuth(firebase);

const validateEmail = (email) => {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
};

const login = () => {
  const email = document.getElementById('email').value;
  const inputEmail = document.getElementById('inputEmail');
  const Password = document.getElementById('password').value;
  const inputPassword = document.getElementById('inputPassword');
  const divElement = document.createElement('div');

  if (email.length === 0 || Password.length === 0) {
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
  }
};

export default login;
