const Tentang = {
  async render() {
    return `
      <div class="tentang">
            <h2>Tentang Kami</h2>
            <p>Kami adalah orang orang yang peduli akan pendidikan dan pentingnya tenaga pengejar dalam mendidik para penerus bangsa agar dapat memliki sifat yang berbudi pekerti luhur dan meningkatkan nama negara ke  jenjang internasional</p>
            <h2> Tim </h2>
            <div class="gropCardTentang">
                <div class="cardTentang">
                    <div class="imageTentang">
                        <img src="" alt="Dadang">
                    </div>
                    <p> Muh. Dadang Hawari</p>
                    <div class="sosmedTentang">
                        <a href="https://www.linkedin.com/in/muh-dadang-hawari/" target="_blank">
                            <i><img src="./image/logo/linkedin.png" alt="linkedin"></i>
                        </a>
                        <a href="https://www.instagram.com/mohdadanghawari/ " target="_blank">
                            <i><img src="./image/logo/instagram.png" alt="instagram"></i>
                        </a>
                        <a href="https://github.com/dadang-hawari" target="_blank">
                            <i><img src="./image/logo/github.png" alt="github"></i>
                        </a>
                    </div>
                </div>
                <div class="cardTentang">
                    <div class="imageTentang">
                        <img src="./image/member/aryandhi1.png" alt="Aryandhi">
                    </div>
                    <p> Aryandhi Alhaqam</p>
                    <div class="sosmedTentang">
                        <a href="https://www.linkedin.com/in/aryandhi-alhaqam-patompo-144634281/" target="_blank">
                            <i><img src="./image/logo/linkedin.png" alt="linkedin"></i>
                        </a>
                        <a href="https://www.instagram.com/ary_al_haq/" target="_blank">
                            <i><img src="./image/logo/instagram.png" alt="instagram"></i>
                        </a>
                        <a href="https://github.com/aryandhipatompo" target="_blank">
                            <i><img src="./image/logo/github.png" alt="github"></i>
                        </a>
                    </div>
                </div>
                <div class="cardTentang">
                    <div class="imageTentang">
                        <img src="./image/member/azzm1.png" alt="Azzm">
                    </div>
                    <p> Moh. Azzam Al Husaini</p>
                    <div class="sosmedTentang">
                        <a href="https://www.linkedin.com/in/azzam-al-husaini-1ba19b209/" target="_blank">
                            <i><img src="./image/logo/linkedin.png" alt="linkedin"></i>
                        </a>
                        <a href="https://www.instagram.com/aazzzzm/" target="_blank">
                            <i><img src="./image/logo/instagram.png" alt="instagram"></i>
                        </a>
                        <a href="https://github.com/Neeckooo" target="_blank">
                            <i><img src="./image/logo/github.png" alt="github"></i>
                        </a>
                    </div>
                </div>
                <div class="cardTentang">
                    <div class="imageTentang">
                        <img src="./image/member//mario1.png" alt="Mario">
                    </div>
                    <p> Mario Alfredo Bawu</p>
                    <div class="sosmedTentang">
                        <a href="https://www.linkedin.com/in/malba-mario/" target="_blank">
                            <i><img src="./image/logo/linkedin.png" alt="linkedin"></i>
                        </a>
                        <a href="https://www.instagram.com/malba_mario/" target="_blank">
                            <i><img src="./image/logo/instagram.png" alt="instagram"></i>
                        </a>
                        <a href="https://github.com/Malbamario" target="_blank">
                            <i><img src="./image/logo/github.png" alt="github"></i>
                        </a>
                    </div>
                </div>
                <div class="cardTentang">
                    <div class="imageTentang">
                        <img src="./image/member/rama1.png" alt="Rama">
                    </div>
                    <p> Rama Indrawan</p>
                    <div class="sosmedTentang">
                        <a href="https://www.linkedin.com/in/rama-indrawan-53875b279/" target="_blank">
                            <i><img src="./image/logo/linkedin.png" alt="linkedin"></i>
                        </a>
                        <a href="https://www.instagram.com/rama_indrawan812/" target="_blank">
                            <i><img src="./image/logo/instagram.png" alt="instagram"></i>
                        </a>
                        <a href="https://github.com/indrawan812" target="_blank">
                            <i><img src="./image/logo/github.png" alt="github"></i>
                        </a>
                    </div>
                </div>
            </div>
      </div>
    `;
  },

  async afterRender() {
    console.log('halaman tentang');
  },
};

export default Tentang;
