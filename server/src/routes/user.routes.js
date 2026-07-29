const express = require('express');
const { updateProfile, changePassword, getAllUsers } = require('../controllers/user.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const { USER_ROLES } = require('../utils/constants');

/**
 * User Management Routes
 *
 * /api/v1/users
 */
const router = express.Router();

router.use(protect); // Require authentication for all user endpoints

router.put('/profile', updateProfile);
router.put('/change-password', changePassword);
router.get('/', authorize(USER_ROLES.ADMIN), getAllUsers);

module.exports = router;
