const Event = {
  async render() {
    return `
      <div class="event">
          <h2>Event</h2>
          <p>Pada fitur ini kita akan membagikan info-info dari berbagai macam kegiatan yang berkaitan dengan tenaga pengajar</p>
          <div class="gropCardEvent">
              <div class="cardEvent">
                  <div class="imageEvent"></div>
                  <div class="descGropEvent">
                      <h3>Peran Guru dalam Mengembangkan Pembelajaran Jarak Jauh Menyikapi NEW NORMAL</h3>
                      <p>perubahan paradigma pendidikan akibat new normal, mengatasi tantangan dalam pembelajaran jarak jauh, memahami perkembangan teknologi, meningkatkan kualitas pembelajaran, memberikan dukungan kepada guru, mengatasi kesenjangan pendidikan, dan mendorong inovasi pendidikan.</p>
                  </div>
              </div>
              <div class="cardEvent">
                  <div class="imageEvent"></div>
                  <div class="descGropEvent">
                      <h3>Peran Guru dalam Mengembangkan Pembelajaran Jarak Jauh Menyikapi NEW NORMAL</h3>
                      <p>perubahan paradigma pendidikan akibat new normal, mengatasi tantangan dalam pembelajaran jarak jauh, memahami perkembangan teknologi, meningkatkan kualitas pembelajaran, memberikan dukungan kepada guru, mengatasi kesenjangan pendidikan, dan mendorong inovasi pendidikan. perubahan paradigma pendidikan akibat new normal, mengatasi tantangan dalam pembelajaran jarak jauh, memahami perkembangan teknologi, meningkatkan kualitas pembelajaran, memberikan dukungan kepada guru, mengatasi kesenjangan pendidikan, dan mendorong inovasi pendidikan.</p>
                  </div>
              </div>
              <div class="cardEvent">
                  <div class="imageEvent"></div>
                  <div class="descGropEvent">
                      <h3>Peran Guru dalam Mengembangkan Pembelajaran Jarak Jauh Menyikapi NEW NORMAL</h3>
                      <p>awikwok</p>
                  </div>
              </div>
          </div>
      </div>
    `;
  },

  async afterRender() {
    console.log('halaman event');
  },
};

export default Event;
