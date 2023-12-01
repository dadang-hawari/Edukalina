const Login = {
  async render() {
    return `
    <div class="login">
    <div class="formSide">
        <h3 class="edukalinaTitleH3">Login</h3>
        <form action="" method="post">
            <div class="input">
                <label for="Email">Email</label><br>
                <input id="Email" type="text" placeholder="Masukkan Email" name="Email" required>
            </div>
            <div class="input">
                <label for="Password">Password</label><br>
                <input id="Password" type="password" placeholder="Masukkan Password" name="Password" required>
            </div>   
            <button class="btnLogin" type="submit">Masuk</button>
        </form>
        <p>Belum mempunyai akun? <a href="#/daftar"><span class="spanLogin">Daftar Sekarang</span></a></p>
    </div>
    <div class="imgSide">
    <img src="./images/login-register/side-login.png">
    </div>
    </div>
        `;
  },

  async afterRender() {
    '';
  },
};

export default Login;
