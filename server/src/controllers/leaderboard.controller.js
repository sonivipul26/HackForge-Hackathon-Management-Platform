const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const leaderboardService = require('../services/leaderboard.service');

const getLeaderboard = asyncHandler(async (req, res) => {
  const { hackathonId } = req.params;
  const leaderboard = await leaderboardService.getLeaderboard(hackathonId);
  res.status(200).json(new ApiResponse(200, 'Leaderboard rankings retrieved', { leaderboard }));
});

module.exports = { getLeaderboard };
