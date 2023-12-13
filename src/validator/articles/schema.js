const Joi = require('joi');

const ArticleHeadersSchema = Joi.object({
  'content-type': Joi.string().valid('image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/webp').required(),
}).unknown();

const ArticlePayloadSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  body: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  category: Joi.string().required(),
  thumbnail: Joi.object().required(),
  creditThumbnail: Joi.string().required(),
});

const ArticlesPayloadSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
});

module.exports = { ArticlePayloadSchema, ArticlesPayloadSchema, ArticleHeadersSchema };
