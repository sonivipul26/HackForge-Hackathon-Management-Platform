const Review = require('../models/Review.model');
const Submission = require('../models/Submission.model');
const ApiError = require('../utils/ApiError');

const submitReview = async (judgeId, reviewData) => {
  const { submissionId, technicalScore, innovationScore, designScore, impactScore, feedback } = reviewData;

  const submission = await Submission.findById(submissionId);
  if (!submission) {
    throw new ApiError(404, 'Submission not found');
  }

  // Calculate total score average out of 10
  const totalScore = (
    parseFloat(technicalScore) +
    parseFloat(innovationScore) +
    parseFloat(designScore) +
    parseFloat(impactScore)
  ) / 4;

  let review = await Review.findOne({ submission: submissionId, judge: judgeId });

  if (review) {
    review.technicalScore = technicalScore;
    review.innovationScore = innovationScore;
    review.designScore = designScore;
    review.impactScore = impactScore;
    review.totalScore = totalScore;
    review.feedback = feedback || '';
    await review.save();
  } else {
    review = await Review.create({
      submission: submissionId,
      judge: judgeId,
      hackathon: submission.hackathon,
      technicalScore,
      innovationScore,
      designScore,
      impactScore,
      totalScore,
      feedback: feedback || '',
    });
  }

  // Recalculate submission average score across all judge reviews
  const allReviews = await Review.find({ submission: submissionId });
  const avg = allReviews.reduce((sum, r) => sum + r.totalScore, 0) / allReviews.length;

  submission.averageScore = parseFloat(avg.toFixed(2));
  submission.reviewCount = allReviews.length;
  submission.status = 'evaluated';
  await submission.save();

  return review;
};

const getJudgingQueue = async (hackathonId, judgeId) => {
  const filter = hackathonId ? { hackathon: hackathonId } : {};
  const submissions = await Submission.find(filter)
    .populate('submittedBy', 'name email avatar organization')
    .populate('team', 'name')
    .sort({ createdAt: -1 });

  return submissions;
};

module.exports = {
  submitReview,
  getJudgingQueue,
};
