/**
 * Async Handler Wrapper
 *
 * Wraps async route handler functions to automatically catch errors
 * and pass them to Express's next() error handler.
 *
 * Without this:
 *   const getUser = async (req, res, next) => {
 *     try {
 *       const user = await User.findById(req.params.id);
 *       res.json(user);
 *     } catch (error) {
 *       next(error);  // Must remember this every time!
 *     }
 *   };
 *
 * With this:
 *   const getUser = asyncHandler(async (req, res) => {
 *     const user = await User.findById(req.params.id);
 *     res.json(user);
 *   });
 *
 * How it works:
 * - Takes an async function
 * - Returns a new function that calls the original
 * - If the promise rejects, it calls next(error) automatically
 *
 * @param {Function} fn - Async route handler function
 * @returns {Function} Express middleware function
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
