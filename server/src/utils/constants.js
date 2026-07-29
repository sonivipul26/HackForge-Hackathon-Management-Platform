/**
 * Application-Wide Constants
 *
 * Centralized constants prevent magic strings scattered across the codebase.
 * When a value needs to change, you change it in one place.
 *
 * Usage:
 *   const { USER_ROLES, HACKATHON_STATUS } = require('./utils/constants');
 *   if (user.role === USER_ROLES.ADMIN) { ... }
 */

const USER_ROLES = Object.freeze({
  ADMIN: 'admin',
  ORGANIZER: 'organizer',
  PARTICIPANT: 'participant',
  JUDGE: 'judge',
});

const HACKATHON_STATUS = Object.freeze({
  DRAFT: 'draft',
  UPCOMING: 'upcoming',
  ACTIVE: 'active',
  JUDGING: 'judging',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
});

const TEAM_STATUS = Object.freeze({
  FORMING: 'forming',
  COMPLETE: 'complete',
  DISBANDED: 'disbanded',
});

const SUBMISSION_STATUS = Object.freeze({
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  REVIEWED: 'reviewed',
});

const REGISTRATION_STATUS = Object.freeze({
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  WITHDRAWN: 'withdrawn',
});

module.exports = {
  USER_ROLES,
  HACKATHON_STATUS,
  TEAM_STATUS,
  SUBMISSION_STATUS,
  REGISTRATION_STATUS,
};
