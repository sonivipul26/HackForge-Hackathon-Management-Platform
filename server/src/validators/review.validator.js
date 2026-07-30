const ApiError = require('../utils/ApiError');

const validateReviewInput = (req, res, next) => {
  const { submissionId, technicalScore, innovationScore, designScore, impactScore } = req.body;
  const errors = [];

  if (!submissionId) errors.push('Submission ID is required');

  const scores = [technicalScore, innovationScore, designScore, impactScore];
  scores.forEach((s, idx) => {
    if (s === undefined || s === null || isNaN(s) || s < 0 || s > 10) {
      errors.push(`Rubric score at index ${idx} must be a number between 0 and 10`);
    }
  });

  if (errors.length > 0) {
    return next(new ApiError(400, 'Validation Error', errors));
  }

  next();
};

module.exports = { validateReviewInput };
