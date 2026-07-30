const User = require('../models/User.model');
const Hackathon = require('../models/Hackathon.model');
const Team = require('../models/Team.model');
const Submission = require('../models/Submission.model');
const Registration = require('../models/Registration.model');
const Review = require('../models/Review.model');
const ApiError = require('../utils/ApiError');

/**
 * Admin Service
 *
 * Platform-wide administrative operations: user management, hackathon oversight,
 * and analytics aggregation.
 */

// ─── Platform Analytics ──────────────────────────────────────────────
const getPlatformStats = async () => {
  const [totalUsers, totalHackathons, totalTeams, totalSubmissions, totalRegistrations, totalReviews] =
    await Promise.all([
      User.countDocuments(),
      Hackathon.countDocuments(),
      Team.countDocuments(),
      Submission.countDocuments(),
      Registration.countDocuments(),
      Review.countDocuments(),
    ]);

  // Role distribution breakdown
  const roleCounts = await User.aggregate([
    { $group: { _id: '$role', count: { $sum: 1 } } },
  ]);

  const roleDistribution = {};
  roleCounts.forEach((r) => {
    roleDistribution[r._id] = r.count;
  });

  // Hackathon status distribution
  const statusCounts = await Hackathon.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const hackathonStatusDistribution = {};
  statusCounts.forEach((s) => {
    hackathonStatusDistribution[s._id] = s.count;
  });

  return {
    totalUsers,
    totalHackathons,
    totalTeams,
    totalSubmissions,
    totalRegistrations,
    totalReviews,
    roleDistribution,
    hackathonStatusDistribution,
  };
};

// ─── User Management ─────────────────────────────────────────────────
const getAllUsersAdmin = async (query = {}) => {
  const { search, role, isActive, page = 1, limit = 20 } = query;
  const filter = {};

  if (role) filter.role = role;
  if (isActive !== undefined) filter.isActive = isActive === 'true';
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    User.find(filter).select('-password').sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
    User.countDocuments(filter),
  ]);

  return {
    users,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
  };
};

const updateUserRole = async (userId, newRole) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, 'User not found');
  user.role = newRole;
  await user.save();
  return user;
};

const toggleUserBlock = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, 'User not found');
  user.isActive = !user.isActive;
  await user.save();
  return user;
};

const deleteUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, 'User not found');
  await User.findByIdAndDelete(userId);
  return user;
};

// ─── Hackathon Oversight ─────────────────────────────────────────────
const adminDeleteHackathon = async (hackathonId) => {
  const hackathon = await Hackathon.findById(hackathonId);
  if (!hackathon) throw new ApiError(404, 'Hackathon not found');
  await Hackathon.findByIdAndDelete(hackathonId);
  return hackathon;
};

const getAllTeamsAdmin = async (query = {}) => {
  const { hackathonId } = query;
  const filter = {};
  if (hackathonId) filter.hackathon = hackathonId;

  const teams = await Team.find(filter)
    .populate('leader', 'name email')
    .populate('members', 'name email')
    .populate('hackathon', 'title')
    .sort({ createdAt: -1 });

  return teams;
};

const getAllSubmissionsAdmin = async (query = {}) => {
  const { hackathonId } = query;
  const filter = {};
  if (hackathonId) filter.hackathon = hackathonId;

  const submissions = await Submission.find(filter)
    .populate('submittedBy', 'name email')
    .populate('team', 'name')
    .populate('hackathon', 'title')
    .sort({ createdAt: -1 });

  return submissions;
};

module.exports = {
  getPlatformStats,
  getAllUsersAdmin,
  updateUserRole,
  toggleUserBlock,
  deleteUser,
  adminDeleteHackathon,
  getAllTeamsAdmin,
  getAllSubmissionsAdmin,
};
