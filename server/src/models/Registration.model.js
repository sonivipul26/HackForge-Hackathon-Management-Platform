const mongoose = require('mongoose');
const { REGISTRATION_STATUS } = require('../utils/constants');

/**
 * Registration Mongoose Schema
 */
const registrationSchema = new mongoose.Schema(
  {
    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hackathon',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(REGISTRATION_STATUS),
      default: REGISTRATION_STATUS.APPROVED,
    },
    answers: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate registrations for the same user in the same hackathon
registrationSchema.index({ hackathon: 1, user: 1 }, { unique: true });

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
