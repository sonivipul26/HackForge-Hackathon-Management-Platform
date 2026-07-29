const mongoose = require('mongoose');
const { MONGODB_URI, NODE_ENV } = require('./env');

/**
 * MongoDB Connection
 *
 * Uses Mongoose to connect to MongoDB with recommended options.
 * Includes connection event listeners for monitoring.
 *
 * Why async/await instead of callbacks?
 * - Cleaner error handling
 * - server.js can await this before starting Express
 * - If DB fails, the server doesn't start (fail-fast)
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    // ─── Connection Event Listeners ────────────────────────────────
    // These help monitor the DB connection in production

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });

    // Graceful shutdown — close DB connection when the process exits
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔌 MongoDB connection closed (app termination)');
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);

    if (NODE_ENV === 'development') {
      console.error('\n💡 Tip: Make sure MongoDB is running locally:');
      console.error('   mongod --dbpath /data/db\n');
      console.error('   Or use MongoDB Atlas and update MONGODB_URI in .env\n');
    }

    process.exit(1);
  }
};

module.exports = connectDB;
