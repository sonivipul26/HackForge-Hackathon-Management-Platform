const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const reviewService = require('../services/review.service');

const submitEvaluation = asyncHandler(async (req, res) => {
  const review = await reviewService.submitReview(req.user._id, req.body);
  res.status(200).json(new ApiResponse(200, 'Review evaluation submitted successfully', { review }));
});

const getQueue = asyncHandler(async (req, res) => {
  const { hackathonId } = req.params;
  const submissions = await reviewService.getJudgingQueue(hackathonId, req.user._id);
  res.status(200).json(new ApiResponse(200, 'Judging evaluation queue retrieved', { submissions }));
});

module.exports = { submitEvaluation, getQueue };
