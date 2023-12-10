const Beranda = {
  async render() {
    return `
  <section class="hero">
    <div class="hero-p">
        <h1>Mari bergabung bersama kami agar menjadi <span class="blue"> tenaga pengajar </span>yang up to date</h1>
        <p class="ma-1">Bergabung bersama kami dengan daftar secara gratis</p>
        <button class="hero-btn ma-2">Daftar</button>
    </div>
    <div class="img-hero-container">
      <img src="./images/hero.svg" alt="" class="img-hero ma-min-3" >
    </div>
  </section>
 

<div id="mainContent">
  <div class="edukalina">
    <div class="edukalina-img">
      <h2>Apa itu <span class="blue">EDUKALINA<span></h2>
      <img src="./images/home/apa-itu-edukalina.png" alt="">
    </div>
    <div class="edukalina-desk">
      <p>
        EDUKALINA (Edukasi Berkualitas Indonesia) merupakan website yang bertujuan untuk meningkatkan keterampilan dari para tenaga pengajar. Baik itu dengan memberikan informasi tips & trick, informasi pelatihan ataupun seminar serta untuk berdiskusi, yang mana tenaga pengajar memiliki tugas mulia sebagai pendidik para penerus bangsa.
      </p>
    </div>
  </div>
</div>

<div class="pendidikan-indonesia">
  <div class="pendidikan-container">
    <h2>Pendidikan di <span class="blue"> Indonesia Saat Ini </span></h2>
    <div class="pendidikan-content">
      <div class="pendidikan-wrapper">  
        <img src="./images/home/student.png" class="icon-section">
        <p class="pendidikan-desk">Peserta Didik 44,19 Juta +</p>
      </div>
    <div class="limit-icon"></div>  
    <div class="pendidikan-wrapper column">  
      <p class="pendidikan-desk">Pengajar 3,3 Juta +</p>
      <img src="./images/home/teacher.png" class="icon-section">
    </div>
    </div>
    <p class="pendidikan-p">Dengan banyaknya peserta didik maka tentunya diperlukan juga pengajar yang berkualitas.</p>
  </div>
</div>

<div class="membantu">
<h2> Bagaimana Kami <span class="blue"> Membantu </span></h2>
  <div class="membantu-container">
    <div class="membantu-wrapper">
      <img src="./images/home/diskusi.png" alt="Diskusi">
      <div class="membantu-desk">
        <h3><u>Diskusi</u></h3>
        <p>Membantu para tenaga pengajar untuk saling berbagi pengalaman dan bertukar informasi terkait masalah atau solusi saat mengajar.</p>
      </div>
    </div>
  </div>
  <div class="membantu-container">
    <div class="membantu-wrapper">
      <img src="./images/home/event.png" alt="Event">
      <div class="membantu-desk">
        <h3><u>Event</u></h3>
        <p>Menginfokan berbagai macam Event atau kegiatan yang berkaitan dengan tenaga pengajar untuk meningkatkan pemahaman dalam menjadi tenaga pengajar.</p>
      </div>
    </div>
  </div>
  <div class="membantu-container">
    <div class="membantu-wrapper">
      <img src="./images/home/tips.png" alt="Tips" class="tips-img">
      <div class="membantu-desk last">
        <h3><u>Tips</u></h3>
        <p>Menyediakan berbagai macam Tips bagaimana cara mengajar atau menyelesaikan masalah saat proses mengajar.</p>
      </div>
    </div>
  </div>
</div>

    `;
  },

  async afterRender() {
    '';
  },
};

export default Beranda;
