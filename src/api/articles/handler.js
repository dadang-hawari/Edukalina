const ClientError = require('../../exceptions/ClientError');

class ArticlesHandler {
  constructor(articlesService, storageService, validator) {
    this._articlesService = articlesService;
    this._storageService = storageService;
    this._validator = validator;
    this.postArticleHandler = this.postArticleHandler.bind(this);
    this.getAllArticlesHandler = this.getAllArticlesHandler.bind(this);
    this.getArticleByIdHandler = this.getArticleByIdHandler.bind(this);
    this.putArticleByIdHandler = this.putArticleByIdHandler.bind(this);
    this.deleteArticleByIdHandler = this.deleteArticleByIdHandler.bind(this);
  }

  async postArticleHandler(request, h) {
    try {
      this._validator.validateArticlePayload(request.payload);

      const {
        title, author, body, tags, category, thumbnail, creditThumbnail,
      } = request.payload;

      this._validator.validateArticlesHeaders(thumbnail.hapi.headers);

      const filename = await this._storageService.writeFile(thumbnail, thumbnail.hapi);
      const articleId = await this._articlesService.addArticle({
        title, author, body, tags, category, thumbnail: filename, creditThumbnail,
      });

      const response = h.response({
        status: 'success',
        message: 'Article berhasil ditambahkan',
        data: {
          articleId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getAllArticlesHandler(request) {
    try {
      this._validator.validateArticlesPayload(request.payload);
      const { title, author } = request.query;
      console.log('get article working');
      const articles = await this._articlesService.getArticles({ title, author });
      return {
        status: 'success',
        data: {
          articles,
        },
      };
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async getArticleByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const article = await this._articlesService.getArticleById(id);

      return {
        status: 'success',
        data: {
          article,
        },
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  async putArticleByIdHandler(request, h) {
    try {
      const { id } = request.params;

      this._validator.validateArticlePayload(request.payload);

      const {
        title, author, body, tags, category, thumbnail, creditThumbnail,
      } = request.payload;

      this._validator.validateArticlesHeaders(thumbnail.hapi.headers);

      const oldThumbnail = await this._articlesService.getThumbnailById(id);
      const filename = await this._storageService.writeFile(thumbnail, thumbnail.hapi);
      // const publicPath = `http://${process.env.HOST}:${process.env.PORT}/articles/thumbnail/`;
      await this._storageService.deleteFile(oldThumbnail);

      await this._articlesService.editArticleById(id, {
        // title, author, body, tags, category, thumbnail: `${publicPath}${filename}`, creditThumbnail,
        title, author, body, tags, category, thumbnail: filename, creditThumbnail,
      });
      return {
        status: 'success',
        message: 'Article berhasil diperbarui',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      return response;
    }
  }

  async deleteArticleByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const oldThumbnail = await this._articlesService.getThumbnailById(id);
      await this._storageService.deleteFile(oldThumbnail);
      await this._articlesService.deleteArticleById(id);

      return {
        status: 'success',
        message: 'Article berhasil dihapus',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = ArticlesHandler;
