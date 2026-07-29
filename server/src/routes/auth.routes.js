const express = require('express');
const { register, login, getMe } = require('../controllers/auth.controller');
const { validateRegisterInput, validateLoginInput } = require('../validators/auth.validator');
const { protect } = require('../middleware/auth.middleware');

/**
 * Authentication Routes
 *
 * /api/v1/auth
 */
const router = express.Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.get('/me', protect, getMe);

module.exports = router;
