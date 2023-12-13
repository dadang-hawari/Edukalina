const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToModelArticles } = require('../../utils');

class ArticlesService {
  constructor() {
    this._pool = new Pool();
  }

  async addArticle({
    title, author, body, tags, category, thumbnail, creditThumbnail,
  }) {
    const id = `article-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const query = {
      text: 'INSERT INTO articles VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
      values: [
        id, title, author, body, tags, category, thumbnail, creditThumbnail, createdAt, updatedAt,
      ],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Artikel gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getArticles({ title, author }) {
    let query = 'SELECT * FROM articles';
    if (title && !author) {
      query = `SELECT * FROM articles WHERE LOWER(title) LIKE LOWER('%${title}%')`;
    } else if (author && !title) {
      query = `SELECT * FROM articles WHERE LOWER(author) LIKE LOWER('%${author}%')`;
    } else if (title && author) {
      query = `SELECT * FROM articles WHERE LOWER(title) LIKE LOWER('%${title}%') AND LOWER(author) LIKE LOWER('%${author}%')`;
    }
    const result = await this._pool.query(query);
    return result.rows.map(mapDBToModelArticles);
  }

  async getArticleById(id) {
    const query = {
      text: 'SELECT * FROM articles WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0]) {
      throw new NotFoundError('Artikel tidak ditemukan');
    }

    return result.rows.map(mapDBToModelArticles)[0];
  }

  async getThumbnailById(id) {
    const query = {
      text: 'SELECT thumbnail FROM articles WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0]) {
      throw new NotFoundError('Artikel tidak ditemukan');
    }

    return result.rows[0].thumbnail;
  }

  async editArticleById(id, {
    title, author, body, tags, category, thumbnail, creditThumbnail,
  }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE articles SET title=$2, author=$3, body=$4, tags=$5, category=$6, thumbnail=$7, credit_thumbnail=$8, updated_at=$9 WHERE id = $1 RETURNING id',
      values: [id, title, author, body, tags, category, thumbnail, creditThumbnail, updatedAt],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Artikel gagal diubah. Id tidak ditemukan');
    }
  }

  async deleteArticleById(id) {
    const query = {
      text: 'DELETE FROM articles WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Artikel gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = ArticlesService;
