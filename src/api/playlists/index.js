const PlaylistsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server, { producerService, playlistsService, validator }) => {
    const playlistsHandler = new PlaylistsHandler(producerService, playlistsService, validator);
    server.route(routes(playlistsHandler));
  },
};
