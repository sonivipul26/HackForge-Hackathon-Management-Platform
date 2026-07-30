const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const teamService = require('../services/team.service');

/**
 * Team Management Controller
 */

const createTeam = asyncHandler(async (req, res) => {
  const { hackathonId, name } = req.body;
  const team = await teamService.createTeam(req.user._id, hackathonId, name);
  res.status(201).json(new ApiResponse(201, 'Team created successfully', { team }));
});

const joinTeam = asyncHandler(async (req, res) => {
  const { joinCode } = req.body;
  const team = await teamService.joinTeamByCode(req.user._id, joinCode);
  res.status(200).json(new ApiResponse(200, 'Joined team successfully', { team }));
});

const getMyTeam = asyncHandler(async (req, res) => {
  const { hackathonId } = req.params;
  const team = await teamService.getMyTeamForHackathon(req.user._id, hackathonId);
  res.status(200).json(new ApiResponse(200, 'Team details retrieved', { team }));
});

const leaveTeam = asyncHandler(async (req, res) => {
  const team = await teamService.leaveTeam(req.user._id, req.params.teamId);
  res.status(200).json(new ApiResponse(200, 'Left team successfully', { team }));
});

const removeMember = asyncHandler(async (req, res) => {
  const team = await teamService.removeMember(req.user._id, req.params.teamId, req.params.memberId);
  res.status(200).json(new ApiResponse(200, 'Member removed successfully', { team }));
});

const transferLeadership = asyncHandler(async (req, res) => {
  const { newLeaderId } = req.body;
  const team = await teamService.transferLeadership(req.user._id, req.params.teamId, newLeaderId);
  res.status(200).json(new ApiResponse(200, 'Leadership transferred successfully', { team }));
});

const deleteTeam = asyncHandler(async (req, res) => {
  await teamService.deleteTeam(req.user._id, req.params.teamId);
  res.status(200).json(new ApiResponse(200, 'Team deleted successfully'));
});

module.exports = {
  createTeam,
  joinTeam,
  getMyTeam,
  leaveTeam,
  removeMember,
  transferLeadership,
  deleteTeam,
};
