const express = require('express');
const healthRoutes = require('./health.routes');

/**
 * Central Route Aggregator
 *
 * All sub-routers are mounted here. This keeps app.js clean
 * and provides a single place to see all available routes.
 *
 * Current routes:
 *   GET /api/v1/health — Server health check
 *
 * Future routes will be added here:
 *   /api/v1/auth     — Authentication (Phase 2)
 *   /api/v1/users    — User management
 *   /api/v1/hackathons — Hackathon CRUD
 *   etc.
 */
const router = express.Router();

router.use('/health', healthRoutes);

module.exports = router;
