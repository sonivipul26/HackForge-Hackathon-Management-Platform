const ApiError = require('../utils/ApiError');

const validateRegistrationInput = (req, res, next) => {
  const { hackathonId } = req.body;
  if (!hackathonId) {
    return next(new ApiError(400, 'Hackathon ID is required for registration'));
  }
  next();
};

module.exports = { validateRegistrationInput };
