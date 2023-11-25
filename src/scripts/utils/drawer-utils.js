const drawerUtils = {
  init({
    button, drawer, navbar, menusvg, timessvg,
  }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer, navbar, menusvg, timessvg);
    });
  },

  _toggleDrawer(event, drawer, navbar, menusvg, timessvg) {
    event.stopPropagation();
    drawer.classList.toggle('hidden');
    navbar.classList.toggle('open');
    menusvg.classList.toggle('hidden-menu');
    timessvg.classList.toggle('hidden-menu');
  },

  _closeDrawer(event, drawer, navbar) {
    event.stopPropagation();
    drawer.classList.remove('hidden');
    navbar.classList.remove('open');
  },
};

export default drawerUtils;
