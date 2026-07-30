const mongoose = require('mongoose');
const { SUBMISSION_STATUS } = require('../utils/constants');

/**
 * Submission Mongoose Schema
 */
const submissionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    tagline: {
      type: String,
      required: [true, 'Project tagline is required'],
      maxlength: [200, 'Tagline cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    githubUrl: {
      type: String,
      required: [true, 'GitHub repository URL is required'],
    },
    demoUrl: {
      type: String,
      default: '',
    },
    videoUrl: {
      type: String,
      default: '',
    },
    techStack: {
      type: [String],
      default: [],
    },
    screenshotUrl: {
      type: String,
      default: '',
    },
    pdfUrl: {
      type: String,
      default: '',
    },
    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hackathon',
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      default: null,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(SUBMISSION_STATUS),
      default: SUBMISSION_STATUS.SUBMITTED,
    },
    averageScore: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

submissionSchema.index({ hackathon: 1, submittedBy: 1 });
submissionSchema.index({ averageScore: -1 });

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
