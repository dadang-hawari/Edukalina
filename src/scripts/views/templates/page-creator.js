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

const notLoginDiscuss = `
    <div class="error">Anda harus login terlebih dahulu agar dapat berdiskusi</div>
`;

const successDiscuss = `
    <div class="success">Pertanyaan berhasil dikirim</div>
`;

const createDiscussionCard = (data) => {
  const discussionCard = document.createElement('a');
  discussionCard.href = `#/pembahasan/${data.questionId}`;
  discussionCard.classList.add('diskusi-item');

  const innerHTML = `
    <div class="diskusi-card">
      <div class="profile">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 0.2); min-width: 40px">
        <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path>
      </svg>
        <b id="userName">${data.userName}</b>
        <span>${data.timestamp} WIB</span>
      </div>
      <div class="diskusi-body">
        <b>${data.title}</b>
        <p>${data.pertanyaan}</p>
      </div>
      <div class="sum-pembahasan">
        <h4>5 Pembahasan</h4>
      </div>
    </div>
  `;

  discussionCard.innerHTML = innerHTML;
  return discussionCard;
};

const createDiscussionPembahasan = (data, onReplySubmit) => {
  const discussionCard = document.createElement('div');
  discussionCard.classList.add('diskusi-item');

  const innerHTML = `
    <div class="diskusi-card">
      <a href="#/diskusi" class="kembali-a"> < Kembali</a>
      <div class="profile">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 0.2); min-width: 40px">
          <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path>
        </svg>
        <b id="userName">${data.userName}</b>
        <span>${data.timestamp} WIB</span>
      </div>
      <div class="diskusi-body">
        <b>${data.title}</b>
        <p>${data.pertanyaan}</p>
      </div>
      <form class="form-diskusi" id="replyForm">
        <label for="replyText">Balasan</label>
        <textarea type="text" id="replyText" rows="4" placeholder="Masukkan Balasan Anda"></textarea>
        <div class="info-diskusi"></div>
        <button class="btn-diskusi">Balas</button>
      </form>
    </div>
  `;

  discussionCard.innerHTML = innerHTML;

  const replyForm = discussionCard.querySelector('#replyForm');
  const replyText = discussionCard.querySelector('#replyText');

  replyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (onReplySubmit) {
      onReplySubmit(replyText.value);
    }
  });

  return discussionCard;
};

const createReplyCard = (data) => {
  const replyCard = document.createElement('div');
  replyCard.classList.add('diskusi-item');

  const innerHTML = `
    <div class="diskusi-card">
      <div class="profile">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 0.2); min-width: 40px">
        <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path>
      </svg>
        <b id="userName">${data.userName}</b>
        <span>${data.timestamp} WIB</span>
      </div>
      <div class="diskusi-body">
        <p>${data.text}</p>
      </div>
      <div class="balas-reply">
      <textarea type="text" id="balasReply" style="margin-top: 20px" rows="3" placeholder="Balasan.."></textarea>
        <button class="btn-balas">Balas</button>
      </div>
    </div>
  `;
  console.log(data);

  replyCard.innerHTML = innerHTML;
  return replyCard;
};

export {
  successPopUp, infoPopUp, wrongFormatPass, wrongFormatEmail, wrongFormatUsername, emptyField, wrongEmailOrPass, notLoginDiscuss, createDiscussionCard, createDiscussionPembahasan, successDiscuss, createReplyCard,
};
