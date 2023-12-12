const ArticlesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'article',
  version: '1.0.0',
  register: async (server, { articlesService, storageService, validator }) => {
    const articlesHandler = new ArticlesHandler(articlesService, storageService, validator);
    server.route(routes(articlesHandler));
  },
};
