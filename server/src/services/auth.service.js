const User = require('../models/User.model');
const ApiError = require('../utils/ApiError');

/**
 * Authentication Business Logic Service
 *
 * Keeps controllers thin by encapsulating database operations and token generation.
 */

const registerUser = async (userData) => {
  const { name, email, password, role, organization, bio, skills } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(400, 'User with this email already exists');
  }

  // Create new user instance
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    role: role || 'participant',
    organization: organization || '',
    bio: bio || '',
    skills: skills || [],
  });

  const token = user.generateAuthToken();

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      organization: user.organization,
      bio: user.bio,
      skills: user.skills,
      createdAt: user.createdAt,
    },
  };
};

const loginUser = async (email, password) => {
  // Find user and explicitly select password field
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  if (!user.isActive) {
    throw new ApiError(403, 'Account is deactivated. Please contact administrator.');
  }

  // Compare password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = user.generateAuthToken();

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      organization: user.organization,
      bio: user.bio,
      skills: user.skills,
      createdAt: user.createdAt,
    },
  };
};

module.exports = {
  registerUser,
  loginUser,
};
