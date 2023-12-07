const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToModelAlbums, mapDBToModelAlbum, mapDBToModelAlbumLikes } = require('../../utils');

class AlbumsService {
  constructor(cacheService, songsService) {
    this._pool = new Pool();
    this._songsService = songsService;
    this._cacheService = cacheService;
  }

  async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) throw new InvariantError('Album gagal ditambahkan');
    return result.rows[0].id;
  }

  async getAlbums() {
    const result = await this._pool.query('SELECT * FROM albums');
    return result.rows.map(mapDBToModelAlbums);
  }

  async getAlbumById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0]) throw new NotFoundError('Album tidak ditemukan');

    const songs = await this._songsService.getSongsByAlbumId(id);
    const album = result.rows.map(mapDBToModelAlbum)[0];
    album.songs.push(...songs);
    return album;
  }

  async editAlbumById(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET id = $1, name = $2, year = $3 WHERE id = $1 RETURNING id',
      values: [id, name, year],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) throw new NotFoundError('Album gagal diubah. Id tidak ditemukan');
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
  }

  async updateCoverUrl(id, url) {
    const query = {
      text: 'UPDATE albums SET cover = $1 WHERE id=$2',
      values: [url, id],
    };
    await this._pool.query(query);
  }

  async likeOrDislike(albumId, userId) {
    const query = { text: '', values: [] };
    const album = await this.getAlbumById(albumId);
    if (!await this.verifyRequest(album.id, userId)) {
      const id = `user_album_like-${nanoid(16)}`;
      query.text = 'INSERT INTO user_album_likes VALUES($1, $2, $3) RETURNING album_id';
      query.values = [id, userId, albumId];

      const result = await this._pool.query(query);
      if (!result.rows.length) throw new NotFoundError('Album tidak ditemukan');
      return { message: 'Album telah disukai', statusCode: 201 };
    }

    query.text = 'DELETE FROM user_album_likes WHERE album_id=$1 AND user_id=$2 RETURNING album_id';
    query.values = [albumId, userId];

    const result = await this._pool.query(query);
    if (!result.rows.length) throw new NotFoundError('Album tidak ditemukan');

    const { album_id: id } = result.rows[0];
    await this._cacheService.delete(`album:${id}`);
    return { message: 'Album telah tidak disukai', statusCode: 201 };
  }

  async getNumberOfLikes(albumId) {
    try {
      const result = await this._cacheService.get(`album:${albumId}`);
      return { mappedResult: JSON.parse(result), dataSource: 'cache' };
    } catch (error) {
      const query = {
        text: 'SELECT COUNT(*) AS likes FROM user_album_likes WHERE album_id=$1',
        values: [albumId],
      };

      const result = await this._pool.query(query);
      const mappedResult = result.rows.map(mapDBToModelAlbumLikes)[0];
      await this._cacheService.set(`album:${albumId}`, JSON.stringify(mappedResult));
      return { mappedResult };
    }
  }

  async verifyRequest(albumId, userId) {
    const query = {
      text: 'SELECT * FROM user_album_likes WHERE album_id=$1 AND user_id=$2',
      values: [albumId, userId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) return false;
    return true;
  }
}

module.exports = AlbumsService;
