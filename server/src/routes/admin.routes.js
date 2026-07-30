const express = require('express');
const {
  getStats,
  getUsers,
  updateRole,
  toggleBlock,
  removeUser,
  removeHackathon,
  getTeams,
  getSubmissions,
} = require('../controllers/admin.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const { USER_ROLES } = require('../utils/constants');

/**
 * Admin Routes
 *
 * /api/v1/admin
 * All routes require Admin role.
 */
const router = express.Router();

router.use(protect);
router.use(authorize(USER_ROLES.ADMIN));

router.get('/stats', getStats);
router.get('/users', getUsers);
router.put('/users/:id/role', updateRole);
router.put('/users/:id/toggle-block', toggleBlock);
router.delete('/users/:id', removeUser);
router.delete('/hackathons/:id', removeHackathon);
router.get('/teams', getTeams);
router.get('/submissions', getSubmissions);

module.exports = router;
