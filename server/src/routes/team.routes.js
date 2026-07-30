const express = require('express');
const {
  createTeam,
  joinTeam,
  getMyTeam,
  leaveTeam,
  removeMember,
  transferLeadership,
  deleteTeam,
} = require('../controllers/team.controller');
const { protect } = require('../middleware/auth.middleware');

/**
 * Team Routes
 *
 * /api/v1/teams
 */
const router = express.Router();

router.use(protect);

router.post('/', createTeam);
router.post('/join', joinTeam);
router.get('/my/:hackathonId', getMyTeam);
router.put('/:teamId/leave', leaveTeam);
router.delete('/:teamId/members/:memberId', removeMember);
router.put('/:teamId/transfer-leadership', transferLeadership);
router.delete('/:teamId', deleteTeam);

module.exports = router;
