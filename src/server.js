require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
const path = require('path');
const users = require('./api/users');
const articles = require('./api/articles');
const authentications = require('./api/authentications');
const ArticlesService = require('./services/postgres/ArticlesService');
const UsersService = require('./services/postgres/UsersService');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const StorageService = require('./services/storage/StorageService');
const CacheService = require('./services/redis/CacheService');
const producerService = require('./services/rabbitmq/ProducerService');
const TokenManager = require('./tokenize/TokenManager');
const UsersValidator = require('./validator/users/index');
const ArticlesValidator = require('./validator/articles/index');
const AuthenticationsValidator = require('./validator/authentications/index');

const init = async () => {
  // const songsService = new SongsService();
  // const cacheService = new CacheService();
  // const albumsService = new AlbumsService(cacheService, songsService);
  const storageService = new StorageService(path.resolve(__dirname, 'api/uploads/file/images'));
  const usersService = new UsersService();
  const articlesService = new ArticlesService();
  const authenticationsService = new AuthenticationsService();
  // const collaborationsService = new CollaborationsService();
  // const playlistsService = new PlaylistsService(collaborationsService);

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: Inert,
    },
  ]);

  server.auth.strategy('edukalinaapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: articles,
      options: {
        articlesService,
        storageService,
        validator: ArticlesValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    // {
    //   plugin: songs,
    //   options: {
    //     service: songsService,
    //     validator: SongsValidator,
    //   },
    // },
    // {
    //   plugin: albums,
    //   options: {
    //     albumsService,
    //     storageService,
    //     validator: AlbumsValidator,
    //   },
    // },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    // {
    //   plugin: collaborations,
    //   options: {
    //     collaborationsService,
    //     playlistsService,
    //     validator: CollaborationsValidator,
    //   },
    // },
    // {
    //   plugin: playlists,
    //   options: {
    //     producerService,
    //     playlistsService,
    //     validator: PlaylistsValidator,
    //   },
    // },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
