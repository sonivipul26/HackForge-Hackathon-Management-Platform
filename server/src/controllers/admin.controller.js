const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const adminService = require('../services/admin.service');

/**
 * Admin Controller Handlers
 *
 * Platform-wide administrative operations available only to admin users.
 */

// @desc    Get platform analytics dashboard stats
// @route   GET /api/v1/admin/stats
// @access  Protected (Admin)
const getStats = asyncHandler(async (req, res) => {
  const stats = await adminService.getPlatformStats();
  res.status(200).json(new ApiResponse(200, 'Platform analytics retrieved', { stats }));
});

// @desc    Get all users with search/filter/pagination
// @route   GET /api/v1/admin/users
// @access  Protected (Admin)
const getUsers = asyncHandler(async (req, res) => {
  const result = await adminService.getAllUsersAdmin(req.query);
  res.status(200).json(new ApiResponse(200, 'Users retrieved', result));
});

// @desc    Update a user's role
// @route   PUT /api/v1/admin/users/:id/role
// @access  Protected (Admin)
const updateRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const user = await adminService.updateUserRole(req.params.id, role);
  res.status(200).json(new ApiResponse(200, 'User role updated', { user }));
});

// @desc    Block or Unblock a user
// @route   PUT /api/v1/admin/users/:id/toggle-block
// @access  Protected (Admin)
const toggleBlock = asyncHandler(async (req, res) => {
  const user = await adminService.toggleUserBlock(req.params.id);
  const status = user.isActive ? 'unblocked' : 'blocked';
  res.status(200).json(new ApiResponse(200, `User ${status} successfully`, { user }));
});

// @desc    Delete a user
// @route   DELETE /api/v1/admin/users/:id
// @access  Protected (Admin)
const removeUser = asyncHandler(async (req, res) => {
  await adminService.deleteUser(req.params.id);
  res.status(200).json(new ApiResponse(200, 'User deleted successfully'));
});

// @desc    Admin delete a hackathon
// @route   DELETE /api/v1/admin/hackathons/:id
// @access  Protected (Admin)
const removeHackathon = asyncHandler(async (req, res) => {
  await adminService.adminDeleteHackathon(req.params.id);
  res.status(200).json(new ApiResponse(200, 'Hackathon deleted successfully'));
});

// @desc    Get all teams (admin view)
// @route   GET /api/v1/admin/teams
// @access  Protected (Admin)
const getTeams = asyncHandler(async (req, res) => {
  const teams = await adminService.getAllTeamsAdmin(req.query);
  res.status(200).json(new ApiResponse(200, 'Teams retrieved', { teams, count: teams.length }));
});

// @desc    Get all submissions (admin view)
// @route   GET /api/v1/admin/submissions
// @access  Protected (Admin)
const getSubmissions = asyncHandler(async (req, res) => {
  const submissions = await adminService.getAllSubmissionsAdmin(req.query);
  res.status(200).json(new ApiResponse(200, 'Submissions retrieved', { submissions, count: submissions.length }));
});

module.exports = {
  getStats,
  getUsers,
  updateRole,
  toggleBlock,
  removeUser,
  removeHackathon,
  getTeams,
  getSubmissions,
};
