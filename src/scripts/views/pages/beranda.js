const Beranda = {
  async render() {
    return '<h2> Beranda<h2>';
  },

  async afterRender() {
    const h2 = document.querySelector('h2');
    h2.innerHTML += 'test';
  },
};

export default Beranda;
