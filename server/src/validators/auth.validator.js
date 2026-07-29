const ApiError = require('../utils/ApiError');
const { USER_ROLES } = require('../utils/constants');

/**
 * Authentication Input Validators
 *
 * Validates request payload fields for registration, login, and profile updates.
 */

const validateRegisterInput = (req, res, next) => {
  const { name, email, password, role } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push('Full name is required');
  }

  if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.push('A valid email address is required');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (role && !Object.values(USER_ROLES).includes(role)) {
    errors.push(`Invalid role specified. Allowed: ${Object.values(USER_ROLES).join(', ')}`);
  }

  if (errors.length > 0) {
    return next(new ApiError(400, 'Validation Error', errors));
  }

  next();
};

const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push('Email address is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return next(new ApiError(400, 'Validation Error', errors));
  }

  next();
};

module.exports = {
  validateRegisterInput,
  validateLoginInput,
};
