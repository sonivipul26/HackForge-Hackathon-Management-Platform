const ApiError = require('../utils/ApiError');
const { NODE_ENV } = require('../config/env');

/**
 * Global Error Handling Middleware
 *
 * This is the LAST middleware in the chain. It catches all errors that:
 * 1. Were thrown with `throw new ApiError(...)` in controllers/services
 * 2. Were passed via `next(error)` (or by asyncHandler)
 * 3. Are unexpected runtime errors (programming bugs)
 *
 * Express recognizes this as an error handler because it has 4 parameters:
 * (err, req, res, next)
 *
 * Response shape (always consistent):
 * {
 *   success: false,
 *   message: "Error description",
 *   errors: [],          // Validation errors (if any)
 *   stack: "..."          // Only in development
 * }
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for server-side debugging
  if (NODE_ENV === 'development') {
    console.error('❌ Error:', err);
  }

  // ─── Mongoose-Specific Error Handling ─────────────────────────────

  // Bad ObjectId (e.g., invalid MongoDB _id format)
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ApiError(404, message);
  }

  // Duplicate key error (e.g., email already exists)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `A record with this ${field} already exists`;
    error = new ApiError(400, message);
  }

  // Validation error (e.g., required field missing)
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    error = new ApiError(400, 'Validation failed', messages);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new ApiError(401, 'Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    error = new ApiError(401, 'Token has expired');
  }

  // ─── Send Response ────────────────────────────────────────────────
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal Server Error',
    errors: error.errors || [],
    // Only include stack trace in development
    ...(NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = { errorHandler };
