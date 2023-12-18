import { getDatabase, ref, onValue } from 'firebase/database';
import DOMPurify from 'dompurify';
import firebase from '../../global/DB_CONFIG';

const Tips = {
  async render() {
    return `
            <div class="tipsTrick">
                <h2>Tips</h2>
                <p>
                Jelajahi berbagai artikel yang kami sediakan untuk mendapatkan tips terkait berbagai aspek dalam dunia pendidikan.
                </p>
                <div class="gropCardTipsTrick">
                </div>
            </div>
    `;
  },
  async afterRender() {
    const cardList = document.querySelector('.gropCardTipsTrick');
    const renderContent = (eventData) => {
      const cardEvent = document.createElement('div');
      cardEvent.classList.add('cardEvent');

      const imageEvent = document.createElement('div');
      imageEvent.classList.add('imageTips');
      imageEvent.setAttribute('style', `background-image: url('${eventData.thumbnail}');`);
      cardEvent.appendChild(imageEvent);

      const descGropEvent = document.createElement('div');
      descGropEvent.classList.add('descGropEvent');
      cardEvent.appendChild(descGropEvent);

      const h3 = document.createElement('h3');
      h3.setAttribute('id', `${eventData.id}`);
      h3.setAttribute('tanda', `${eventData.category}`);
      h3.setAttribute('class', 'title');
      h3.addEventListener('click', (e) => {
        const articleId = e.target.getAttribute('id');
        const articleClass = e.target.getAttribute('tanda');

        localStorage.setItem('selectedArticleId', articleId);
        localStorage.setItem('selectedArticleClass', articleClass);

        window.location.href = '#/artikel';
      });
      h3.innerText = `${eventData.title}`;
      descGropEvent.appendChild(h3);

      const sanitizedHTML = DOMPurify.sanitize(eventData.body);
      const p = document.createElement('p');
      p.innerHTML = sanitizedHTML;
      descGropEvent.appendChild(p);

      cardList.appendChild(cardEvent);
    };

    onValue(ref(getDatabase(firebase), 'tips'), (snapshot) => {
      const events = snapshot.val();

      if (events) {
        const eventKeys = Object.keys(events).reverse();

        eventKeys.forEach((eventId) => {
          const eventData = events[eventId];
          renderContent(eventData);
        });
      }
    });
  },
};

export default Tips;
