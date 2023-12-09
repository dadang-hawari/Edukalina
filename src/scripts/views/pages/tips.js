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
                    <div class="cardTipsTrick">
                        <div class="imageTipsTrick"></div>
                        <div class="descGropTipsTrick">
                            <h3>Pembuatan materi menggunakan Microsoft Power Point</h3>
                            <p>PowerPoint dapat memudahkan para pengguna untuk mengatur materi yang akan disampaikan. Power point dapat membuat audiens menjadi lebih memahami materi presentasi yang sedang ditampilkan. Hal ini dapat terjadi karena dalam pengguna menampilkan poin-poin utama dalam slide yang ditampilkan rPoint dapat memudahkan para pengguna untuk mengatur materi yang akan disampaikan. Power point dapat membuat audiens menjadi lebih memahami materi presentasi yang sedang ditampilkan. Hal ini dapat terjadi karena dalam pengguna menampilkan poin-poin utama dalam slide yang ditampilkan.</p>
                        </div>
                    </div>
                    <div class="cardTipsTrick">
                        <div class="imageTipsTrick"></div>
                        <div class="descGropTipsTrick">
                            <h3>Pembuatan materi menggunakan Microsoft Power Point</h3>
                            <p>Awwikwok</p>
                        </div>
                    </div>
                </div>
            </div>
    `;
  },

  async afterRender() {
    console.log(' halaman tips');
  },
};

export default Tips;
