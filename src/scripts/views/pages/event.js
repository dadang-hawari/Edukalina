const Event = {
  async render() {
    return '<h2> Event<h2>';
  },

  async afterRender() {
    const h2 = document.querySelector('h2');
    h2.innerHTML += 'test';
  },
};

export default Event;
