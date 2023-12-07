const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToModelSong } = require('../../utils');

class ArticlesService {
  constructor() {
    this._pool = new Pool();
  }

  async addArticle({
    title, author, body, tags, thumbnail, category,
  }) {
    const id = `article-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO articles VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, author, body, tags, thumbnail, category],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Artikel gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getSongs({ title, performer }) {
    let query = 'SELECT id, title, performer FROM songs';
    if (title && !performer) {
      query = `SELECT id, title, performer FROM songs WHERE LOWER(title) LIKE LOWER('%${title}%')`;
    } else if (performer && !title) {
      query = `SELECT id, title, performer FROM songs WHERE LOWER(performer) LIKE LOWER('%${performer}%')`;
    } else if (title && performer) {
      query = `SELECT id, title, performer FROM songs WHERE LOWER(title) LIKE LOWER('%${title}%') AND LOWER(performer) LIKE LOWER('%${performer}%')`;
    }
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getSongsByAlbumId(albumId) {
    const query = {
      text: 'SELECT id, title, performer FROM songs WHERE album_id = $1',
      values: [albumId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0]) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    return result.rows.map(mapDBToModelSong)[0];
  }

  async editSongById(id, {
    title, performer, category,
  }) {
    const query = {
      text: 'UPDATE songs SET id = $1, title = $2, year = $3, performer = $4, category = $5, duration = $6, album_id = $7 WHERE id = $1 RETURNING id',
      values: [id, title, performer, category, ],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal diubah. Id tidak ditemukan');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = SongsService;
