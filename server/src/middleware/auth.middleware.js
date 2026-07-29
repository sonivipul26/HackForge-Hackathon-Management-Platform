const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { JWT_SECRET } = require('../config/env');

/**
 * Protect Middleware
 *
 * Verifies JWT token from 'Authorization: Bearer <token>' header.
 * Attaches the authenticated user object to `req.user`.
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ApiError(401, 'Not authorized to access this route, token missing'));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Fetch user from DB and attach to req
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ApiError(401, 'User associated with this token no longer exists'));
    }

    if (!user.isActive) {
      return next(new ApiError(403, 'Your account has been deactivated. Please contact support.'));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, 'Not authorized, token verification failed'));
  }
});

/**
 * Authorize (RBAC) Middleware
 *
 * Restricts access to specific user roles.
 *
 * Usage:
 *   router.get('/admin-only', protect, authorize('admin'), handler);
 *   router.get('/judges-and-organizers', protect, authorize('judge', 'organizer'), handler);
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required before authorization check'));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          `User role '${req.user.role}' is not authorized to access this resource`
        )
      );
    }

    next();
  };
};

module.exports = {
  protect,
  authorize,
};
