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
  },
  {
    method: 'DELETE',
    path: '/articles/{id}',
    handler: handler.deleteArticleByIdHandler,
  },
  {
    method: 'POST',
    path: '/articles/{id}/covers',
    handler: handler.postArticleCoverHandler,
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
    path: '/articles/cover/{filename}',
    handler: {
      directory: {
        path: path.resolve(__dirname, '../uploads/file/images'),
      },
    },
  },
  {
    method: 'POST',
    path: '/articles/{id}/likes',
    handler: handler.postUserArticleLikesHandler,
    options: {
      auth: 'edukalinaapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/articles/{id}/likes',
    handler: handler.getUserArticleLikesHandler,
  },
];

module.exports = routes;
