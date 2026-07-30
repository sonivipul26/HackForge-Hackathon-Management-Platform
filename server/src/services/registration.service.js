const Registration = require('../models/Registration.model');
const Hackathon = require('../models/Hackathon.model');
const ApiError = require('../utils/ApiError');

/**
 * Registration Service
 *
 * Handles participant enrollment, cancellation, and organizer approval workflows.
 */

const registerParticipant = async (userId, hackathonId, answers = []) => {
  const hackathon = await Hackathon.findById(hackathonId);
  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found');
  }

  const existingReg = await Registration.findOne({ hackathon: hackathonId, user: userId });
  if (existingReg) {
    throw new ApiError(400, 'You are already registered for this hackathon');
  }

  const registration = await Registration.create({
    hackathon: hackathonId,
    user: userId,
    answers,
  });

  // Increment participant count in hackathon model
  hackathon.participantCount += 1;
  await hackathon.save();

  return registration;
};

const getMyRegistrations = async (userId) => {
  const registrations = await Registration.find({ user: userId })
    .populate('hackathon')
    .populate('team')
    .sort({ createdAt: -1 });

  return registrations;
};

const cancelRegistration = async (userId, hackathonId) => {
  const registration = await Registration.findOne({ hackathon: hackathonId, user: userId });
  if (!registration) {
    throw new ApiError(404, 'Registration not found');
  }

  if (registration.status === 'withdrawn') {
    throw new ApiError(400, 'Registration already cancelled');
  }

  registration.status = 'withdrawn';
  await registration.save();

  // Decrement participant count
  await Hackathon.findByIdAndUpdate(hackathonId, { $inc: { participantCount: -1 } });

  return registration;
};

const getRegistrationsForHackathon = async (hackathonId, organizerId, userRole) => {
  // Verify organizer owns the hackathon or user is admin
  const hackathon = await Hackathon.findById(hackathonId);
  if (!hackathon) throw new ApiError(404, 'Hackathon not found');

  if (userRole !== 'admin' && hackathon.organizer.toString() !== organizerId.toString()) {
    throw new ApiError(403, 'You are not authorized to view registrations for this hackathon');
  }

  const registrations = await Registration.find({ hackathon: hackathonId })
    .populate('user', 'name email avatar organization skills')
    .populate('team', 'name joinCode')
    .sort({ createdAt: -1 });

  return registrations;
};

const updateRegistrationStatus = async (registrationId, status, organizerId, userRole) => {
  const registration = await Registration.findById(registrationId).populate('hackathon');
  if (!registration) throw new ApiError(404, 'Registration not found');

  // Verify organizer owns the hackathon
  if (userRole !== 'admin' && registration.hackathon.organizer.toString() !== organizerId.toString()) {
    throw new ApiError(403, 'You are not authorized to update this registration');
  }

  registration.status = status;
  await registration.save();
  return registration;
};

module.exports = {
  registerParticipant,
  getMyRegistrations,
  cancelRegistration,
  getRegistrationsForHackathon,
  updateRegistrationStatus,
};
