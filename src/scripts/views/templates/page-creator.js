const successPopUp = `
    <div class="success-container">
    <div class="success-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style="fill: #50f050;transform: ;msFilter:;"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
    </div>
    <div class="success-p">
        <p>Pendaftaran Berhasil</p>
    </div>
    </div>
`;

const infoPopUp = `
    <div class="success-container">
    <div class="info-icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style="fill: rgba(0, 169, 255, 1);transform: ;msFilter:;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M11 11h2v6h-2zm0-4h2v2h-2z"></path></svg>
    </div>
    <div class="info-p">
        <p>Email yang anda masukkan telah terdaftar, silahkan login</p>
    </div>
    </div>
`;

const wrongFormatUsername = `
    <div class="error">Username minimal 6 karakter
    </div>
`;
const wrongFormatPass = `
    <div class="error">Password minimal 6 karakter</div>
`;
const wrongFormatEmail = `
    <div class="error">Mohon gunakan format email yang benar</div>
`;

const emptyField = `
    <div class="error">Mohon untuk mengisi seluruh field</div>
`;

const wrongEmailOrPass = `
    <div class="error">Periksa kembali email dan password Anda</div>
`;

export {
  successPopUp, infoPopUp, wrongFormatPass, wrongFormatEmail, wrongFormatUsername, emptyField, wrongEmailOrPass,
};
