/**
 * Centralized Environment Variable Configuration
 *
 * Why this file exists:
 * - Single source of truth for all env vars
 * - Provides defaults for optional variables
 * - Makes it easy to see what the app needs to run
 * - If a required variable is missing, the app fails fast with a clear message
 *
 * Usage: const { PORT, MONGODB_URI } = require('./config/env');
 */

const requiredVars = ['MONGODB_URI', 'JWT_SECRET'];

// Validate that all required env vars are set
requiredVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`❌ Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};
