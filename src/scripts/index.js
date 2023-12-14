import App from './views/app';
import '../styles/main.scss';
import '../styles/responsive.css';
import '../styles/tips-n-trick.css';
import '../styles/responsiveTips.css';
import '../styles/responsiveTentang.css';
import '../styles/event.css';
import '../styles/login-register.css';
import '../styles/responsive-login.css';
import swRegister from './utils/sw-register';
import './components/nav-bar';
import './components/app-footer';

const app = new App({
  button: document.getElementById('btnMenu'),
  drawer: document.querySelector('ul.list-nav'),
  navbar: document.querySelector('nav-bar'),
  content: document.getElementById('main'),
  menusvg: document.querySelector('.menu'),
  timessvg: document.querySelector('.times'),
});

window.addEventListener('hashchange', () => {
  if (window.location.hash !== document.querySelector('#toContent').getAttribute('href')) {
    app.renderPage();
    window.scrollTo(0, 0);
  }
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
