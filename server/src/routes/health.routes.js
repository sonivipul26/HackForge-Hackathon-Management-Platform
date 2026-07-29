const express = require('express');
const { getHealthStatus } = require('../controllers/health.controller');

/**
 * Health Check Routes
 *
 * GET /api/v1/health — Returns server status
 *
 * This is an unprotected route (no auth required).
 * Used for connectivity checks by frontend, load balancers, and monitoring.
 */
const router = express.Router();

router.get('/', getHealthStatus);

module.exports = router;
