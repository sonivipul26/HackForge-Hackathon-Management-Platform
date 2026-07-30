const ApiError = require('../utils/ApiError');

const validateSubmissionInput = (req, res, next) => {
  const { title, tagline, description, githubUrl, hackathonId } = req.body;
  const errors = [];

  if (!title) errors.push('Project title is required');
  if (!tagline) errors.push('Project tagline is required');
  if (!description) errors.push('Project description is required');
  if (!githubUrl) errors.push('GitHub repository URL is required');
  if (!hackathonId) errors.push('Hackathon ID is required');

  if (errors.length > 0) {
    return next(new ApiError(400, 'Validation Error', errors));
  }

  next();
};

module.exports = { validateSubmissionInput };
