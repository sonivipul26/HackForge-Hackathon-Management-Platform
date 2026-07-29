const User = require('../models/User.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

/**
 * User Profile & Management Controller
 */

// @desc    Update current user profile details
// @route   PUT /api/v1/users/profile
// @access  Protected
const updateProfile = asyncHandler(async (req, res) => {
  const { name, bio, organization, skills, githubUrl, linkedinUrl } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (name) user.name = name;
  if (bio !== undefined) user.bio = bio;
  if (organization !== undefined) user.organization = organization;
  if (skills !== undefined) user.skills = skills;
  if (githubUrl !== undefined) user.githubUrl = githubUrl;
  if (linkedinUrl !== undefined) user.linkedinUrl = linkedinUrl;

  await user.save();

  res.status(200).json(new ApiResponse(200, 'Profile updated successfully', { user }));
});

// @desc    Update current user password
// @route   PUT /api/v1/users/change-password
// @access  Protected
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, 'Please provide both current and new password');
  }

  if (newPassword.length < 6) {
    throw new ApiError(400, 'New password must be at least 6 characters long');
  }

  const user = await User.findById(req.user._id).select('+password');

  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    throw new ApiError(401, 'Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json(new ApiResponse(200, 'Password updated successfully'));
});

// @desc    Get all users (Admin only)
// @route   GET /api/v1/users
// @access  Protected (Admin only)
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, 'Users retrieved successfully', { users, count: users.length }));
});

module.exports = {
  updateProfile,
  changePassword,
  getAllUsers,
};
