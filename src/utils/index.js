const mapDBToModelAlbums = ({
  id,
  name,
  year,
}) => ({
  id,
  name,
  year: parseInt(year, 10),
});

const mapDBToModelAlbum = ({
  id,
  name,
  year,
  cover,
}) => ({
  id,
  name,
  coverUrl: cover || null,
  year: parseInt(year, 10),
  songs: [],
});

const mapDBToModelSong = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  album_id,
}) => ({
  id,
  title,
  year: parseInt(year, 10),
  performer,
  genre,
  duration: parseInt(duration, 10),
  albumId: album_id,
});

const mapDBToModelPlaylist = ({
  id,
  name,
  username,
}) => ({
  id,
  name,
  username,
  songs: [],
});

const mapDBToModelAlbumLikes = ({
  likes,
}) => ({
  likes: parseInt(likes, 36),
});
module.exports = {
  mapDBToModelAlbums,
  mapDBToModelAlbum,
  mapDBToModelSong,
  mapDBToModelPlaylist,
  mapDBToModelAlbumLikes,
};
