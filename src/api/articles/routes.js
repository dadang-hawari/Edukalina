const path = require('path');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/articles',
    handler: handler.postArticleHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 512000,
      },
    },
  },
  {
    method: 'GET',
    path: '/articles',
    handler: handler.getAllArticlesHandler,
  },
  {
    method: 'GET',
    path: '/articles/{id}',
    handler: handler.getArticleByIdHandler,
  },
  {
    method: 'PUT',
    path: '/articles/{id}',
    handler: handler.putArticleByIdHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 512000,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/articles/{id}',
    handler: handler.deleteArticleByIdHandler,
  },
  {
    method: 'GET',
    path: '/articles/thumbnail/{filename}',
    handler: {
      directory: {
        path: path.resolve(__dirname, '../uploads/file/images'),
      },
    },
  },
];

module.exports = routes;
