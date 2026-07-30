const mongoose = require('mongoose');

/**
 * Review / Evaluation Mongoose Schema
 */
const reviewSchema = new mongoose.Schema(
  {
    submission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission',
      required: true,
    },
    judge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hackathon',
      required: true,
    },
    technicalScore: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    innovationScore: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    designScore: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    impactScore: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    totalScore: {
      type: Number,
      required: true,
    },
    feedback: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ submission: 1, judge: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
