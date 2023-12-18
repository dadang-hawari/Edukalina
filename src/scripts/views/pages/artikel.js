import { getDatabase, ref, onValue } from 'firebase/database';
import firebase from '../../global/DB_CONFIG';

const Artikel = {
  async render() {
    return `
      <article class="article">
        <a href="#/event" class="kembali-a">< Kembali</a>
      </article>
    `;
  },

  async afterRender() {
    const selectedArticleId = localStorage.getItem('selectedArticleId');
    const renderItem = (element) => {
      const artikel = document.querySelector('.article');

      const h1 = document.createElement('h1');
      h1.innerText = `${element.title}`;
      artikel.appendChild(h1);

      const figure = document.createElement('figure');
      artikel.appendChild(figure);

      const img = document.createElement('img');
      img.setAttribute('src', `${element.thumbnail}`);
      img.setAttribute('alt', `${element.title}`);

      figure.appendChild(img);

      const figcaption = document.createElement('figcaption');
      figcaption.innerText = `${element.creditThumbnail}`;
      figure.appendChild(figcaption);

      const section = document.createElement('section');
      artikel.appendChild(section);

      const bodyContent = element.body.replace(/\n/g, '<br>');

      const bodyWithLinks = bodyContent;

      const p = document.createElement('p');
      p.innerHTML = bodyWithLinks;
      const lines = bodyWithLinks.split('<dsn>');

      p.innerHTML = lines.join('<br>');

      section.appendChild(p);
    };

    const articleRef = ref(getDatabase(firebase), `event/${selectedArticleId}`);
    onValue(articleRef, (snapshot) => {
      const selectedArticleData = snapshot.val();
      if (selectedArticleData) {
        renderItem(selectedArticleData);
      }
    });
    const articleTipsRef = ref(getDatabase(firebase), `tips/${selectedArticleId}`);
    onValue(articleTipsRef, (snapshot) => {
      const selectedArticleData = snapshot.val();
      if (selectedArticleData) {
        if (selectedArticleData.category === 'tips') {
          document.querySelector('a.kembali-a').setAttribute('href', '#/tips');
        }
        renderItem(selectedArticleData);
      }
    });
  },
};

export default Artikel;
