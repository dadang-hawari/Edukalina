import App from './views/app';
import '../styles/main.css';
import '../styles/responsive.css';

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
// berfungsi saat link berubah
window.addEventListener('hashchange', () => {
  app.renderPage();
});
window.addEventListener('load', () => {
  app.renderPage();
});
