const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const { mapDBToModelPlaylist } = require('../../utils');

class PlaylistsService {
  constructor(collaborationsService) {
    this._pool = new Pool();
    this._collaborationsService = collaborationsService;
  }

  async addPlaylist(name, userId) {
    const id = `playlist-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
      values: [id, name, userId],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id) throw new InvariantError('Playlist gagal ditambahkan');
    return result.rows[0].id;
  }

  async getPlaylists(userId) {
    const query = {
      text: `SELECT playlists.id, playlists.name, playowner.username FROM playlists
      LEFT JOIN collaborations ON playlists.id = collaborations.playlist_id
      LEFT JOIN users collab ON collab.id = collaborations.user_id
      LEFT JOIN users playowner ON playowner.id = playlists.owner
      WHERE playlists.owner = $1 OR collab.id = $1`,
      values: [userId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getPlaylistById(id) {
    const query = {
      text: `SELECT playlists.id, playlists.name, users.username
      FROM playlists LEFT JOIN users
      ON users.id = playlists.owner
      WHERE playlists.id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0]) throw new NotFoundError('Playlist tidak ditemukan');

    const songs = await this.getSongsByPlaylistId(id);
    const playlist = result.rows.map(mapDBToModelPlaylist)[0];
    playlist.songs.push(...songs);
    return playlist;
  }

  async getSongsByPlaylistId(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer
      FROM playlist_songs LEFT JOIN songs
      ON songs.id = playlist_songs.song_id
      WHERE playlist_songs.playlist_id = $1
      GROUP BY songs.id`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async deletePlaylist(id) {
    const query = {
      text: 'DELETE FROM playlists WHERE id=$1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) throw new InvariantError('Playlist gagal dihapus. Id tidak ditemukan');
  }

  async addPlayListSong(playlistId, songId, userId) {
    const id = `playlist_song-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlist_songs VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) throw new InvariantError('Lagu gagal ditambahkan ke dalam playlist');
    await this.addNewActivity(playlistId, songId, userId, 'add');
  }

  async verifySong(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0]) throw new NotFoundError('Lagu tidak ditemukan');
  }

  async deletePlaylistSong(playlistId, songId, userId) {
    const query = {
      text: 'DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) throw new InvariantError('Lagu gagal dihapus dari playlist. Id tidak ditemukan.');
    await this.addNewActivity(playlistId, songId, userId, 'delete');
    return result.rows[0].id;
  }

  async addNewActivity(playlistId, songId, userId, action) {
    const id = `playlist_song_activity-${nanoid(16)}`;
    const query = {
      text: `INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, 
      to_char (now(), 'YYYY-MM-DD"T"HH24:MI:SS"Z"'))`,
      values: [id, playlistId, songId, userId, action],
    };
    await this._pool.query(query);
  }

  async getPlaylistActivitiesById(id) {
    const query = {
      text: `SELECT users.username, songs.title, playlist_song_activities.action, playlist_song_activities.time
      FROM playlist_song_activities LEFT JOIN users
      ON playlist_song_activities.user_id = users.id
      LEFT JOIN songs ON playlist_song_activities.song_id = songs.id
      WHERE playlist_song_activities.playlist_id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) throw new InvariantError('Id playlist tidak ditemukan.');
    return result.rows;
  }

  async verifyPlaylistOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM playlists WHERE id=$1',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) throw new NotFoundError('Playlist tidak ditemukan');
    const playlist = result.rows[0];
    if (playlist.owner !== owner) throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
  }

  async verifyPlaylistAccess(playlistId, userId) {
    try {
      await this.verifyPlaylistOwner(playlistId, userId);
    } catch (error) {
      if (error instanceof NotFoundError) throw error;

      try {
        await this._collaborationsService.verifyCollaboration(playlistId, userId);
      } catch {
        throw error;
      }
    }
  }
}

module.exports = PlaylistsService;
