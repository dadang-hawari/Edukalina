const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToModelArticle } = require('../../utils');

class ArticlesService {
  constructor() {
    this._pool = new Pool();
  }

  async addArticle({
    title, author, body, tags, category, thumbnail, creditThumbnail,
  }) {
    const id = `article-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO articles VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [id, title, author, body, tags, category, thumbnail, creditThumbnail],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Artikel gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getArticles({ title, author }) {
    let query = 'SELECT id, title, author FROM articles';
    if (title && !author) {
      query = `SELECT id, title, author FROM articles WHERE LOWER(title) LIKE LOWER('%${title}%')`;
    } else if (author && !title) {
      query = `SELECT id, title, author FROM articles WHERE LOWER(author) LIKE LOWER('%${author}%')`;
    } else if (title && author) {
      query = `SELECT id, title, author FROM articles WHERE LOWER(title) LIKE LOWER('%${title}%') AND LOWER(author) LIKE LOWER('%${author}%')`;
    }
    const result = await this._pool.query(query);
    return result.rows;
  }

  // async getarticlesByAlbumId(albumId) {
  //   const query = {
  //     text: 'SELECT id, title, author FROM articles WHERE album_id = $1',
  //     values: [albumId],
  //   };
  //   const result = await this._pool.query(query);
  //   return result.rows;
  // }

  async getArticleById(id) {
    const query = {
      text: 'SELECT * FROM articles WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0]) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    return result.rows.map(mapDBToModelArticle)[0];
  }

  async editArticleById(id, {
    title, author, category,
  }) {
    const query = {
      text: 'UPDATE articles SET id = $1, title = $2, year = $3, author = $4, category = $5, duration = $6, album_id = $7 WHERE id = $1 RETURNING id',
      values: [id, title, author, category],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal diubah. Id tidak ditemukan');
    }
  }

  async deleteArticleById(id) {
    const query = {
      text: 'DELETE FROM articles WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = ArticlesService;
