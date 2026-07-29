const ApiError = require('../utils/ApiError');

/**
 * Hackathon Payload Validators
 */
const validateHackathonInput = (req, res, next) => {
  const {
    title,
    tagline,
    description,
    organizationName,
    prizePool,
    registrationDeadline,
    startDate,
    endDate,
    submissionDeadline,
  } = req.body;

  const errors = [];

  if (!title || title.trim().length === 0) errors.push('Title is required');
  if (!tagline || tagline.trim().length === 0) errors.push('Tagline is required');
  if (!description || description.trim().length === 0) errors.push('Description is required');
  if (!organizationName || organizationName.trim().length === 0) errors.push('Organization name is required');
  if (prizePool === undefined || prizePool === null || isNaN(prizePool)) errors.push('Valid prize pool amount is required');

  if (!registrationDeadline) errors.push('Registration deadline is required');
  if (!startDate) errors.push('Start date is required');
  if (!endDate) errors.push('End date is required');
  if (!submissionDeadline) errors.push('Submission deadline is required');

  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    errors.push('Start date cannot be after end date');
  }

  if (errors.length > 0) {
    return next(new ApiError(400, 'Validation Error', errors));
  }

  next();
};

module.exports = { validateHackathonInput };
