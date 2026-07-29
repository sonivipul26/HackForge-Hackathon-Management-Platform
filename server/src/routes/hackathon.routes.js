const express = require('express');
const {
  create,
  getAll,
  getOne,
  update,
  remove,
  getMyEvents,
} = require('../controllers/hackathon.controller');
const { validateHackathonInput } = require('../validators/hackathon.validator');
const { protect, authorize } = require('../middleware/auth.middleware');
const { USER_ROLES } = require('../utils/constants');

/**
 * Hackathon Routes
 *
 * /api/v1/hackathons
 */
const router = express.Router();

router.get('/', getAll);
router.get('/organizer/my-events', protect, authorize(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN), getMyEvents);
router.get('/:id', getOne);

router.post(
  '/',
  protect,
  authorize(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
  validateHackathonInput,
  create
);

router.put(
  '/:id',
  protect,
  authorize(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
  update
);

router.delete(
  '/:id',
  protect,
  authorize(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
  remove
);

module.exports = router;
