const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class CollaborationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addCollaboration(playlistId, userId) {
    const id = `collab-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO collaborations VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) throw new InvariantError('Kolaborasi gagal ditambahkan');
    return result.rows[0].id;
  }

  async deleteCollaboration(playlistId, userId) {
    const query = {
      text: 'DELETE FROM collaborations WHERE playlist_id=$1 AND user_id=$2 RETURNING id',
      values: [playlistId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) throw new InvariantError('Kolaborasi gagal dihapus');
  }

  async verifyCollaboration(playlistId, userId) {
    const query = {
      text: 'SELECT * FROM collaborations WHERE playlist_id=$1 AND user_id=$2',
      values: [playlistId, userId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) throw new InvariantError('Kolaborasi tidak diverifikasi');
  }

  async verifyUser(userId) {
    const query = {
      text: 'SELECT * FROM users WHERE id=$1',
      values: [userId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) throw new NotFoundError('User tidak ditemukan');
  }
}

module.exports = CollaborationsService;
