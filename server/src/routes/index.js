const express = require('express');
const healthRoutes = require('./health.routes');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const hackathonRoutes = require('./hackathon.routes');

/**
 * Central Route Aggregator
 */
const router = express.Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/hackathons', hackathonRoutes);

module.exports = router;
