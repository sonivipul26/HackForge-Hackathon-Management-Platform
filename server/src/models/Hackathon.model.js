const mongoose = require('mongoose');
const { HACKATHON_STATUS } = require('../utils/constants');

/**
 * Hackathon Mongoose Schema
 */
const hackathonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Hackathon title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    tagline: {
      type: String,
      required: [true, 'Tagline is required'],
      maxlength: [200, 'Tagline cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    bannerImage: {
      type: String,
      default: '',
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    organizationName: {
      type: String,
      required: [true, 'Organization name is required'],
    },
    mode: {
      type: String,
      enum: ['online', 'in-person', 'hybrid'],
      default: 'online',
    },
    location: {
      type: String,
      default: 'Global Online',
    },
    category: {
      type: String,
      enum: ['Web3 & DeFi', 'Gen AI', 'Green Tech', 'Cybersecurity', 'Smart Cities', 'General'],
      default: 'General',
    },
    status: {
      type: String,
      enum: Object.values(HACKATHON_STATUS),
      default: HACKATHON_STATUS.UPCOMING,
    },
    prizePool: {
      type: Number,
      required: [true, 'Prize pool amount is required'],
      min: [0, 'Prize pool cannot be negative'],
    },
    currency: {
      type: String,
      default: 'USD',
    },
    maxTeamSize: {
      type: Number,
      default: 4,
      min: 1,
      max: 10,
    },
    minTeamSize: {
      type: Number,
      default: 1,
      min: 1,
    },
    registrationDeadline: {
      type: Date,
      required: [true, 'Registration deadline is required'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    submissionDeadline: {
      type: Date,
      required: [true, 'Submission deadline is required'],
    },
    tracks: [
      {
        title: { type: String, required: true },
        description: { type: String },
        prize: { type: String },
      },
    ],
    rules: {
      type: String,
      default: '',
    },
    requirements: {
      type: [String],
      default: [],
    },
    participantCount: {
      type: Number,
      default: 0,
    },
    teamCount: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    registrationOpen: {
      type: Boolean,
      default: true,
    },
    judges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// ─── Pre-Save Slug Generator & Indexing ─────────────────────────────
hackathonSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

// Indexes for fast search & filtering
hackathonSchema.index({ status: 1, mode: 1, category: 1 });
hackathonSchema.index({ title: 'text', tagline: 'text', description: 'text' });

const Hackathon = mongoose.model('Hackathon', hackathonSchema);

module.exports = Hackathon;
