import Beranda from '../views/pages/beranda';
import Tips from '../views/pages/tips';
import Tentang from '../views/pages/tentang';
import Event from '../views/pages/event';
import Diskusi from '../views/pages/diskusi';

const routes = {
  '/': Beranda,
  '/beranda': Beranda,
  '/tips': Tips,
  '/event': Event,
  '/diskusi': Diskusi,
  '/tentang': Tentang,
};

export default routes;
