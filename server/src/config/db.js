const mongoose = require('mongoose');
const { MONGODB_URI, NODE_ENV } = require('./env');

/**
 * MongoDB Connection
 *
 * Connects to MongoDB with Mongoose.
 * In development, if connection fails, logs a warning rather than killing the server process,
 * allowing health check and HTTP endpoints to remain functional.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔌 MongoDB connection closed (app termination)');
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('\n💡 Note: Make sure MongoDB service is running locally, or update MONGODB_URI in server/.env to use MongoDB Atlas.\n');
  }
};

module.exports = connectDB;
