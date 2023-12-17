const Event = {
  async render() {
    return `
      <div class="event">
          <h2>Event</h2>
          <p>Pada fitur ini kita akan membagikan info-info dari berbagai macam kegiatan yang berkaitan dengan tenaga pengajar</p>
          <div class="gropCardEvent">
          </div>
      </div>
    `;
  },

  async afterRender() {
    const cardList = document.querySelector('.gropCardEvent');

    const apiEndPointEvent = 'http://13.212.75.217:5000/articles/event';
    let eventValueAPI;

    function getApiEventValue() {
      return fetch(apiEndPointEvent)
        .then((result) => {
          if (!result.ok) {
            throw new Error(`Failed to fetch: ${result.status}`);
          }
          return result.json();
        })
        .then((responseJson) => responseJson.data.articles)
        .then((value) => {
          eventValueAPI = value;
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function renderContent() {
      eventValueAPI.forEach((element) => {
        // console.log(element);

        const cardEvent = document.createElement('div');
        cardEvent.classList.add('cardEvent');

        const imageEvent = document.createElement('div');
        imageEvent.classList.add('imageEvent');
        imageEvent.setAttribute('style', `background-image: url('${element.thumbnail}');`);
        cardEvent.appendChild(imageEvent);

        const descGropEvent = document.createElement('div');
        descGropEvent.classList.add('descGropEvent');
        cardEvent.appendChild(descGropEvent);

        const h3 = document.createElement('h3');
        h3.setAttribute('id', `${element.id}`);
        h3.setAttribute('tanda', `${element.category}`);
        h3.addEventListener('click', (e) => {
          // Dapatkan ID artikel dari href
          const articleId = e.target.getAttribute('id');
          const articleClass = e.target.getAttribute('tanda');

          // Simpan ID artikel di penyimpanan sesi
          localStorage.setItem('selectedArticleId', articleId);
          localStorage.setItem('selectedArticleClass', articleClass);

          window.location.href = '#/artikel';
        });
        h3.innerText = `${element.title}`;
        descGropEvent.appendChild(h3);

        const p = document.createElement('p');
        p.innerText = `${element.body}`;
        descGropEvent.appendChild(p);

        cardList.appendChild(cardEvent);
      });
    }

    getApiEventValue()
      .then(renderContent);
  },
};

export default Event;
