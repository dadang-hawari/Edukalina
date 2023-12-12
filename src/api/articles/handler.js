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
        title, author, body, tags, category, thumbnail: `http://${process.env.HOST}:${process.env.PORT}/articles/cover/${filename}`, creditThumbnail,
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
    this._validator.validateArticlesPayload(request.payload);
    const { title, author } = request.query;
    const articles = await this._articlesService.getArticles({ title, author });

    return {
      status: 'success',
      data: {
        articles,
      },
    };
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
      this._validator.validateArticlePayload(request.payload);
      const { id } = request.params;
      await this._articlesService.editArticleById(id, request.payload);
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

  async postArticleCoverHandler(request, h) {
    try {
      const { cover } = request.payload;
      const { id } = request.params;
      this._validator.validateImageHeaders(cover.hapi.headers);

      const filename = await this._storageService.writeFile(cover, cover.hapi);
      await this._articlesService.updateCoverUrl(id, `http://${process.env.HOST}:${process.env.PORT}/articles/cover/${filename}`);
      const response = h.response({
        status: 'success',
        message: 'Sampul berhasil diunggah',
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

  async postUserArticleLikesHandler(request, h) {
    try {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;
      const { message, statusCode } = await this._articlesService.likeOrDislike(id, credentialId);
      const response = h.response({
        status: 'success',
        message,
      });
      response.code(statusCode);
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

  async getUserArticleLikesHandler(request, h) {
    try {
      const { id } = request.params;
      const { mappedResult, dataSource = 'database' } = await this._articlesService.getNumberOfLikes(id);
      const response = h.response({
        status: 'success',
        data: mappedResult,
      });
      response.header('X-Data-Source', dataSource);
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
}

module.exports = ArticlesHandler;
