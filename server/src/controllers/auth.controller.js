const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const authService = require('../services/auth.service');

/**
 * Authentication HTTP Controllers
 */

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  res.status(201).json(new ApiResponse(201, 'User registered successfully', result));
});

// @desc    Authenticate user & get token
// @route   POST /api/v1/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);
  res.status(200).json(new ApiResponse(200, 'Login successful', result));
});

// @desc    Get current authenticated user details
// @route   GET /api/v1/auth/me
// @access  Protected
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, 'User profile fetched successfully', { user: req.user }));
});

module.exports = {
  register,
  login,
  getMe,
};
