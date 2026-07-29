const mongoose = require('mongoose');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { NODE_ENV } = require('../config/env');

/**
 * Health Check Controller
 *
 * Returns the server's operational status including:
 * - Server status and uptime
 * - MongoDB connection state
 * - Environment mode
 * - Timestamp
 *
 * This endpoint is used by:
 * - Frontend to verify backend connectivity
 * - Load balancers for health probes
 * - Monitoring systems
 * - Developers during setup verification
 *
 * MongoDB connection states:
 * 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
 */
const getHealthStatus = asyncHandler(async (req, res) => {
  const mongoState = mongoose.connection.readyState;
  const stateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const healthData = {
    status: 'OK',
    uptime: `${Math.floor(process.uptime())}s`,
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
    mongodb: stateMap[mongoState] || 'unknown',
  };

  res.status(200).json(new ApiResponse(200, 'Server is running', healthData));
});

module.exports = { getHealthStatus };
