const ApiError = require('../utils/ApiError');

/**
 * 404 Not Found Middleware
 *
 * This runs AFTER all route definitions. If no route matched
 * the request, this middleware creates a 404 error and passes
 * it to the global error handler.
 *
 * Without this, unmatched routes would return Express's default
 * HTML error page, which is unhelpful for an API.
 */
const notFound = (req, res, next) => {
  const error = new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`);
  next(error);
};

module.exports = { notFound };
