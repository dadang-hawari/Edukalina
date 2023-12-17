const Artikel = {
  async render() {
    return `
    <article class="coba">
      <a href="#" class="kembali-a">< Kembali</a>
      
    </article>
        `;
  },

  async afterRender() {
    const apiEndPointEvent = 'http://13.212.75.217:5000/articles/event';
    const apiEndPointTipsTrick = 'http://13.212.75.217:5000/articles/tips';
    let eventValueAPI;
    let tipsTrickValueAPI;

    function getApiEventValue() {
      return fetch(apiEndPointEvent)
        .then((result) => result.json())
        .then((responseJson) => responseJson.data.articles)
        .then((value) => {
          eventValueAPI = value; // Menyimpan nilai ke variabel global
          // console.log(eventValueAPI);
        });
    }

    function getApiTipsTrickValue() {
      return fetch(apiEndPointTipsTrick)
        .then((result) => result.json())
        .then((responseJson) => responseJson.data.articles)
        .then((value) => {
          tipsTrickValueAPI = value; // Menyimpan nilai ke variabel global
          console.log(tipsTrickValueAPI);
        });
    }

    const selectedArticleId = localStorage.getItem('selectedArticleId');
    const selectedArticleClass = localStorage.getItem('selectedArticleClass');

    function renderItem(element) {
      // console.log(element.id);
      const artikel = document.querySelector('.coba');

      const h1 = document.createElement('h1');
      h1.innerText = `${element.title}`;
      artikel.appendChild(h1);

      const figure = document.createElement('figure');
      artikel.appendChild(figure);

      const img = document.createElement('img');
      img.setAttribute('src', `${element.thumbnail}`);
      figure.appendChild(img);

      const figcaption = document.createElement('figcaption');
      figcaption.innerText = `${element.creditThumbnail}`;
      figure.appendChild(figcaption);

      const section = document.createElement('section');
      artikel.appendChild(section);

      const p = document.createElement('p');
      p.innerText = `${element.body}`;
      section.appendChild(p);
    }

    function renderEvent() {
      eventValueAPI.forEach((element) => {
        // console.log(selectedArticleId);
        if (element.id === selectedArticleId) {
          renderItem(element);
        }
      });
    }

    function renderTips() {
      tipsTrickValueAPI.forEach((element) => {
        // console.log(selectedArticleId);
        if (element.id === selectedArticleId) {
          renderItem(element);
        }
      });
    }

    if (selectedArticleClass === 'tips') {
      getApiTipsTrickValue()
        .then(renderTips);
    } else {
      getApiEventValue()
        .then(renderEvent);
    }
  },
};

export default Artikel;
