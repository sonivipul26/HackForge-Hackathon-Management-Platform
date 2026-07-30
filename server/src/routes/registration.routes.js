const express = require('express');
const {
  register,
  getMyRegistrations,
  cancelRegistration,
  getRegistrationsForHackathon,
  updateRegistrationStatus,
} = require('../controllers/registration.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const { USER_ROLES } = require('../utils/constants');

/**
 * Registration Routes
 *
 * /api/v1/registrations
 */
const router = express.Router();

router.use(protect);

router.post('/', register);
router.get('/my', getMyRegistrations);
router.put('/cancel/:hackathonId', cancelRegistration);
router.get(
  '/hackathon/:hackathonId',
  authorize(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
  getRegistrationsForHackathon
);
router.put(
  '/:id/status',
  authorize(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
  updateRegistrationStatus
);

module.exports = router;
