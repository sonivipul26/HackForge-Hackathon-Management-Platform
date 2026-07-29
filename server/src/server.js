const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from server/.env file BEFORE anything else
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = require('./config/db');
const app = require('./app');
const { PORT, NODE_ENV } = require('./config/env');

/**
 * Server Entry Point
 */
const startServer = async () => {
  try {
    // Connect to MongoDB (non-blocking for dev server start)
    await connectDB();

    // Start Express server
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
