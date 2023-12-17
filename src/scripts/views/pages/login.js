import { login, loginWithGoogle } from '../../utils/login-handler';

const Login = {
  async render() {
    return `
    <div class="login">
    <div class="formSide">
        <h3 class="edukalinaTitleH3">Login</h3>
        <form>
            <div class="input" id="inputEmail">
                <label for="email">Email</label><br>
                <input id="email" type="text" placeholder="Masukkan Email">
            </div>
            <div class="input pw-login">
                <div id="inputPassword">
                  <label for="password">Password</label><br>
                  <input id="password" type="password" placeholder="Masukkan Password">
                </div>
                <button id="pwEyeLogin" type="button">
                  <svg id="openSvg" fill="rgb(84, 82, 82)" xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/></svg>
                  <svg id="hiddenSvg" fill="rgb(84, 82, 82)" class="hidden-menu" xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z"/></svg>
                </button>
            </div>   
            <button class="btnLogin" type="button">Masuk</button>
            <p>atau</p>
            <button class="btnLoginGoogle" type="button">
            <svg class="google" width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.9998 16.3633V24.1087H30.7633C30.2907 26.5996 28.8723 28.7088 26.7451 30.127L33.236 35.1634C37.0178 31.6726 39.1996 26.5453 39.1996 20.4544C39.1996 19.0362 39.0724 17.6725 38.8359 16.3635L19.9998 16.3633Z" fill="#4285F4"/>
            <path d="M8.7911 23.8066L7.32716 24.9273L2.14526 28.9636C5.43616 35.4908 12.1811 39.9999 19.9992 39.9999C25.3991 39.9999 29.9263 38.2181 33.2354 35.1636L26.7446 30.1272C24.9627 31.3272 22.69 32.0546 19.9992 32.0546C14.7992 32.0546 10.3812 28.5455 8.79927 23.8182L8.7911 23.8066Z" fill="#34A853"/>
            <path d="M2.14529 11.0361C0.781735 13.7269 0 16.7633 0 19.9996C0 23.2359 0.781735 26.2723 2.14529 28.9631C2.14529 28.9812 8.79994 23.7995 8.79994 23.7995C8.39995 22.5995 8.16352 21.3269 8.16352 19.9994C8.16352 18.672 8.39995 17.3993 8.79994 16.1993L2.14529 11.0361Z" fill="#FBBC05"/>
            <path d="M19.9996 7.96362C22.9451 7.96362 25.5632 8.98177 27.6541 10.9454L33.3813 5.21824C29.9086 1.98194 25.3997 0 19.9996 0C12.1815 0 5.43616 4.49089 2.14526 11.0364L8.79971 16.2C10.3814 11.4727 14.7997 7.96362 19.9996 7.96362Z" fill="#EA4335"/>
            </svg>         
            <p class="google-name">Google<p>
            </button>
        </form>
        <p>Belum mempunyai akun? <a href="#/daftar"><span class="spanLogin">Daftar disini</span></a></p>
    </div>
    <div class="imgSide">
    <img src="./images/login-register/side-login.png">
    </div>
    </div>
        `;
  },

  async afterRender() {
    const pwEye = document.getElementById('pwEyeLogin');
    const passwordInput = document.getElementById('password');
    const btnLogin = document.querySelector('.btnLogin');
    const btnLoginGoogle = document.querySelector('.btnLoginGoogle');

    btnLogin.addEventListener('click', (event) => {
      event.preventDefault();
      login();
    });

    btnLoginGoogle.addEventListener('click', (event) => {
      event.preventDefault();
      loginWithGoogle();
    });

    pwEye.addEventListener('click', () => {
      const openSvg = document.getElementById('openSvg');
      const hiddenSvg = document.getElementById('hiddenSvg');
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);

      openSvg.classList.toggle('hidden-menu');
      hiddenSvg.classList.toggle('hidden-menu');
    });
  },
};

export default Login;
