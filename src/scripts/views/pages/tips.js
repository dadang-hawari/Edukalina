const Tips = {
  async render() {
    return `
            <div class="tipsTrick">
                <h2>Tips & Trick</h2>
                <p>Fitur ini merupakan fitur yang akan membantu para tenaga pengajar dengan cara membagikan Tips & Trick terkait segala sesuatu yang berkaitan dengan tenaga pengajar</p>
                <div class="gropCardTipsTrick">
                    <div class="cardTipsTrick">
                        <div class="imageTipsTrick"></div>
                        <div class="descGropTipsTrick">
                            <h3>Pembuatan materi menggunakan Microsoft Power Point</h3>
                            <p>PowerPoint dapat memudahkan para pengguna untuk mengatur materi yang akan disampaikan. Power point dapat membuat audiens menjadi lebih memahami materi presentasi yang sedang ditampilkan. Hal ini dapat terjadi karena dalam pengguna menampilkan poin-poin utama dalam slide yang ditampilkan.</p>
                        </div>
                    </div>
                    
                </div>
            </div>
    `;
  },

  async afterRender() {
    const cardList = document.querySelector('.gropCardTipsTrick');

    const apiEndPointEvent = 'http://13.212.75.217:5000/articles/tips';
    let eventValueAPI;

    function getApiEventValue() {
      return fetch(apiEndPointEvent)
        .then((result) => result.json())
        .then((responseJson) => responseJson.data.articles)
        .then((value) => {
          eventValueAPI = value; // Menyimpan nilai ke variabel global
          // console.log(eventValueAPI);
        });
    }

    function renderContent() {
      eventValueAPI.forEach((element) => {
        // console.log(element);

        const cardEvent = document.createElement('div');
        cardEvent.classList.add('cardTipsTrick');

        const imageEvent = document.createElement('div');
        imageEvent.classList.add('imageTipsTrick');
        imageEvent.setAttribute('style', `background-image: url('${element.thumbnail}');`);
        cardEvent.appendChild(imageEvent);

        const descGropEvent = document.createElement('div');
        descGropEvent.classList.add('descGropTipsTrick');
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

export default Tips;
