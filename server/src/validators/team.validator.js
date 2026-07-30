const ApiError = require('../utils/ApiError');

const validateTeamCreateInput = (req, res, next) => {
  const { name, hackathonId } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) errors.push('Team name is required');
  if (!hackathonId) errors.push('Hackathon ID is required');

  if (errors.length > 0) {
    return next(new ApiError(400, 'Validation Error', errors));
  }

  next();
};

const validateTeamJoinInput = (req, res, next) => {
  const { joinCode } = req.body;
  if (!joinCode || joinCode.trim().length === 0) {
    return next(new ApiError(400, 'Join code is required'));
  }
  next();
};

module.exports = {
  validateTeamCreateInput,
  validateTeamJoinInput,
};
