/**
 * Standard API Response Wrapper
 *
 * Ensures every successful API response follows the same shape:
 * {
 *   success: true,
 *   message: "Operation completed",
 *   data: { ... }
 * }
 *
 * Why a response wrapper?
 * - Frontend always knows where to find the data (response.data.data)
 * - Consistent shape makes error handling predictable
 * - Easy to add metadata later (pagination, timestamps, etc.)
 *
 * Usage:
 *   res.status(200).json(new ApiResponse(200, 'Users fetched', users));
 */
class ApiResponse {
  constructor(statusCode, message, data = null) {
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}

module.exports = ApiResponse;
