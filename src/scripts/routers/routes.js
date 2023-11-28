import Beranda from '../views/pages/beranda';
import Tips from '../views/pages/tips';
import Tentang from '../views/pages/tentang';
import Event from '../views/pages/event';
import Diskusi from '../views/pages/diskusi';
import Artikel from '../views/pages/artikel';

const routes = {
  '/': Beranda,
  '/beranda': Beranda,
  '/tips': Tips,
  '/event': Event,
  '/diskusi': Diskusi,
  '/tentang': Tentang,
  '/artikel': Artikel,
};

export default routes;
