const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file BEFORE anything else
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const connectDB = require('./config/db');
const app = require('./app');
const { PORT, NODE_ENV } = require('./config/env');

/**
 * Server Entry Point
 *
 * Responsibilities:
 * 1. Load environment variables (done at top via dotenv)
 * 2. Connect to MongoDB
 * 3. Start the Express server
 *
 * Why separate from app.js?
 * - app.js defines the Express application (middleware, routes)
 * - server.js handles the runtime concerns (DB connection, port binding)
 * - This separation makes app.js testable without starting a real server
 */
const startServer = async () => {
  try {
    // Step 1: Connect to MongoDB
    await connectDB();

    // Step 2: Start Express server
    app.listen(PORT, () => {
      console.log(`\n🚀 HackForge server running in ${NODE_ENV} mode on port ${PORT}`);
      console.log(`📡 Health check: http://localhost:${PORT}/api/v1/health\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
