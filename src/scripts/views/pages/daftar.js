const Daftar = {
  async render() {
    return `
      <div class="bungkus">
      <div class="register">    
        <form class="flexForm" action="" method="post">
                <div class="formRegister">
                    <div class="input">
                        <label for="Username">Username</label><br>
                        <input id="Username" class="input-register" type="text" placeholder="Masukkan Username" name="Username" required>
                    </div>
                    <div class="input">
                        <label for="Email">Email</label><br>
                        <input id="Email" class="input-register" type="text" placeholder="Masukkan Email" name="Email" required>
                    </div>
                    <div class="input">
                        <label for="Password">Password</label><br>
                        <input id="Password" class="input-register" type="password" placeholder="Masukkan Password" name="Password" required>
                    </div>
                    <div class="input">
                        <label for="repeatPassword">Password</label><br>
                        <input id="repeatPassword" class="input-register" type="password" placeholder="Masukkan Kembali Password" name="Password" required>
                    </div>
                </div>
                <div class="sideRegister">
                    <img src="./images/login-register/avatar-register.png" alt="">
                </div>
            </form>
            <div class="containerBtnRegister">
                <button class="btnRegister" type="submit">Daftar</button>
            </div>
            <p>Sudah mempunyai akun? <a href="#/login"><span class="spanLogin">Login disini</span></a></p>
        </div>
        </div>
          `;
  },

  async afterRender() {
    '';
  },
};

export default Daftar;
