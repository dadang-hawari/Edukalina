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

const mapDBToModelArticles = ({
  id,
  title,
  author,
  body,
  tags,
  category,
  thumbnail,
  credit_thumbnail,
}) => ({
  id,
  title,
  author,
  body,
  tags,
  category,
  thumbnail,
  creditThumbnail: credit_thumbnail,
});

module.exports = {
  mapDBToModelArticles,
  mapDBToModelAlbums,
  mapDBToModelAlbum,
  mapDBToModelSong,
  mapDBToModelPlaylist,
  mapDBToModelAlbumLikes,
};
