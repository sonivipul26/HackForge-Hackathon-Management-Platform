const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const hackathonService = require('../services/hackathon.service');

/**
 * Hackathon Controller Handlers
 */

// @desc    Create a new hackathon
// @route   POST /api/v1/hackathons
// @access  Protected (Organizer, Admin)
const create = asyncHandler(async (req, res) => {
  const hackathon = await hackathonService.createHackathon(req.user._id, req.body);
  res.status(201).json(new ApiResponse(201, 'Hackathon created successfully', { hackathon }));
});

// @desc    Get all hackathons with search, filtering & pagination
// @route   GET /api/v1/hackathons
// @access  Public
const getAll = asyncHandler(async (req, res) => {
  const result = await hackathonService.getHackathons(req.query);
  res.status(200).json(new ApiResponse(200, 'Hackathons retrieved successfully', result));
});

// @desc    Get single hackathon by ID or slug
// @route   GET /api/v1/hackathons/:id
// @access  Public
const getOne = asyncHandler(async (req, res) => {
  const hackathon = await hackathonService.getHackathonByIdOrSlug(req.params.id);
  res.status(200).json(new ApiResponse(200, 'Hackathon details retrieved', { hackathon }));
});

// @desc    Update a hackathon
// @route   PUT /api/v1/hackathons/:id
// @access  Protected (Organizer owner, Admin)
const update = asyncHandler(async (req, res) => {
  const hackathon = await hackathonService.updateHackathon(
    req.params.id,
    req.user._id,
    req.user.role,
    req.body
  );
  res.status(200).json(new ApiResponse(200, 'Hackathon updated successfully', { hackathon }));
});

// @desc    Delete a hackathon
// @route   DELETE /api/v1/hackathons/:id
// @access  Protected (Organizer owner, Admin)
const remove = asyncHandler(async (req, res) => {
  await hackathonService.deleteHackathon(req.params.id, req.user._id, req.user.role);
  res.status(200).json(new ApiResponse(200, 'Hackathon deleted successfully'));
});

// @desc    Get events hosted by the logged-in organizer
// @route   GET /api/v1/hackathons/organizer/my-events
// @access  Protected (Organizer, Admin)
const getMyEvents = asyncHandler(async (req, res) => {
  const hackathons = await hackathonService.getMyHostedHackathons(req.user._id);
  res.status(200).json(new ApiResponse(200, 'Hosted hackathons retrieved', { hackathons }));
});

// @desc    Assign a judge to a hackathon
// @route   POST /api/v1/hackathons/:id/judges
// @access  Protected (Organizer, Admin)
const assignJudge = asyncHandler(async (req, res) => {
  const { judgeId } = req.body;
  const hackathon = await hackathonService.assignJudge(req.params.id, judgeId, req.user._id, req.user.role);
  res.status(200).json(new ApiResponse(200, 'Judge assigned successfully', { hackathon }));
});

// @desc    Remove a judge from a hackathon
// @route   DELETE /api/v1/hackathons/:id/judges/:judgeId
// @access  Protected (Organizer, Admin)
const removeJudge = asyncHandler(async (req, res) => {
  const hackathon = await hackathonService.removeJudge(req.params.id, req.params.judgeId, req.user._id, req.user.role);
  res.status(200).json(new ApiResponse(200, 'Judge removed successfully', { hackathon }));
});

// @desc    Toggle registration open/closed for a hackathon
// @route   PUT /api/v1/hackathons/:id/toggle-registration
// @access  Protected (Organizer, Admin)
const toggleRegistration = asyncHandler(async (req, res) => {
  const hackathon = await hackathonService.toggleRegistration(req.params.id, req.user._id, req.user.role);
  const status = hackathon.registrationOpen ? 'opened' : 'closed';
  res.status(200).json(new ApiResponse(200, `Registration ${status} successfully`, { hackathon }));
});

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  getMyEvents,
  assignJudge,
  removeJudge,
  toggleRegistration,
};

