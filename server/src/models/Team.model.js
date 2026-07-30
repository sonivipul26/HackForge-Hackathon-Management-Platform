const mongoose = require('mongoose');
const { TEAM_STATUS } = require('../utils/constants');

/**
 * Team Mongoose Schema
 */
const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Team name is required'],
      trim: true,
      maxlength: [50, 'Team name cannot exceed 50 characters'],
    },
    joinCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hackathon',
      required: true,
    },
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    status: {
      type: String,
      enum: Object.values(TEAM_STATUS),
      default: TEAM_STATUS.FORMING,
    },
    maxSize: {
      type: Number,
      default: 4,
    },
  },
  {
    timestamps: true,
  }
);

teamSchema.index({ hackathon: 1, name: 1 }, { unique: true });

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
