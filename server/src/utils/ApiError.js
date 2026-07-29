/**
 * Custom API Error Class
 *
 * Extends the native Error class to include:
 * - statusCode: HTTP status code (400, 401, 404, 500, etc.)
 * - isOperational: distinguishes expected errors from programming bugs
 *
 * Why a custom error class?
 * - Native Error only has message and stack
 * - We need statusCode for proper HTTP responses
 * - isOperational helps the error handler decide:
 *   - Operational errors → send error details to client
 *   - Programming bugs → send generic "Internal Server Error"
 *
 * Usage:
 *   throw new ApiError(404, 'User not found');
 *   throw new ApiError(400, 'Invalid email format');
 */
class ApiError extends Error {
  constructor(statusCode, message, errors = [], stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;           // Array of validation errors
    this.isOperational = true;      // Distinguishes from programming bugs

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
