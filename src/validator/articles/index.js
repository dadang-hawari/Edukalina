const InvariantError = require('../../exceptions/InvariantError');
const { ArticlePayloadSchema, ArticlesPayloadSchema, ArticleHeadersSchema } = require('./schema');

const ArticlesValidator = {
  validateArticlesHeaders: (headers) => {
    const validationResult = ArticleHeadersSchema.validate(headers);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateArticlesPayload: (payload) => {
    const validationResult = ArticlesPayloadSchema.validate(payload);

    if (validationResult.error) throw new InvariantError(validationResult.error.message);
  },
  validateArticlePayload: (payload) => {
    const validationResult = ArticlePayloadSchema.validate(payload);

    if (validationResult.error) throw new InvariantError(validationResult.error.message);
  },
};

module.exports = ArticlesValidator;
