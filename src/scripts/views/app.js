import drawerUtils from '../utils/drawer-utils';
import UrlParser from '../routers/url-parser';
import routes from '../routers/routes';

class App {
  constructor({
    button, drawer, content, navbar, menusvg, timessvg,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._navbar = navbar;
    this._menusvg = menusvg;
    this._timessvg = timessvg;

    this._initialAppShell();
  }

  _initialAppShell() {
    drawerUtils.init({
      button: this._button,
      drawer: this._drawer,
      navbar: this._navbar,
      content: this._content,
      menusvg: this._menusvg,
      timessvg: this._timessvg,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
