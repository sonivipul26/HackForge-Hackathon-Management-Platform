const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const routes = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');
const { notFound } = require('./middleware/notFound');
const { NODE_ENV, CLIENT_URL } = require('./config/env');

/**
 * Express Application Factory
 *
 * This file creates and configures the Express app with:
 * 1. Security middleware (helmet, cors, rate-limit)
 * 2. Request parsing (JSON, URL-encoded)
 * 3. Logging (morgan)
 * 4. API routes
 * 5. Error handling
 *
 * Middleware order matters:
 * - Security headers first (helmet)
 * - CORS before routes (allows cross-origin requests)
 * - Body parsers before routes (so req.body is available)
 * - Logger before routes (logs every request)
 * - Routes
 * - 404 handler after routes (catches unmatched paths)
 * - Error handler last (catches all thrown/next(err) errors)
 */
const app = express();

// ─── Security Headers ────────────────────────────────────────────────
// Helmet sets various HTTP security headers (CSP, X-Frame-Options, etc.)
app.use(helmet());

// ─── CORS ────────────────────────────────────────────────────────────
// Allows the React frontend to make requests to this API
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true, // Allow cookies/auth headers
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ─── Rate Limiting ───────────────────────────────────────────────────
// Prevents abuse by limiting requests per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15-minute window
  max: 100,                  // 100 requests per window per IP
  message: {
    success: false,
    message: 'Too many requests, please try again after 15 minutes.',
  },
  standardHeaders: true,     // Return rate limit info in headers
  legacyHeaders: false,      // Disable X-RateLimit-* headers
});
app.use('/api', limiter);

// ─── Body Parsers ────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));            // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));      // Parse URL-encoded bodies

// ─── HTTP Request Logger ─────────────────────────────────────────────
// 'dev' format: colored concise output for development
// 'combined' format: Apache-style logs for production
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── API Routes ──────────────────────────────────────────────────────
app.use('/api/v1', routes);

// ─── Error Handling ──────────────────────────────────────────────────
// 404 handler — must come after all routes
app.use(notFound);

// Global error handler — must be the LAST middleware
app.use(errorHandler);

module.exports = app;
