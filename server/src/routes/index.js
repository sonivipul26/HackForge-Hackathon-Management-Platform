const express = require('express');
const healthRoutes = require('./health.routes');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const hackathonRoutes = require('./hackathon.routes');
const registrationRoutes = require('./registration.routes');
const teamRoutes = require('./team.routes');
const submissionRoutes = require('./submission.routes');
const reviewRoutes = require('./review.routes');
const leaderboardRoutes = require('./leaderboard.routes');
const adminRoutes = require('./admin.routes');

/**
 * Central Route Aggregator
 */
const router = express.Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/hackathons', hackathonRoutes);
router.use('/registrations', registrationRoutes);
router.use('/teams', teamRoutes);
router.use('/submissions', submissionRoutes);
router.use('/reviews', reviewRoutes);
router.use('/leaderboard', leaderboardRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
