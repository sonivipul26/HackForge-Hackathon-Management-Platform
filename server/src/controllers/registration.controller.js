const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const registrationService = require('../services/registration.service');

/**
 * Registration Controller
 */

const register = asyncHandler(async (req, res) => {
  const { hackathonId, answers } = req.body;
  const registration = await registrationService.registerParticipant(req.user._id, hackathonId, answers);
  res.status(201).json(new ApiResponse(201, 'Registered for hackathon successfully', { registration }));
});

const getMyRegistrations = asyncHandler(async (req, res) => {
  const registrations = await registrationService.getMyRegistrations(req.user._id);
  res.status(200).json(new ApiResponse(200, 'Registrations retrieved', { registrations }));
});

const cancelRegistration = asyncHandler(async (req, res) => {
  const { hackathonId } = req.params;
  const registration = await registrationService.cancelRegistration(req.user._id, hackathonId);
  res.status(200).json(new ApiResponse(200, 'Registration cancelled successfully', { registration }));
});

const getRegistrationsForHackathon = asyncHandler(async (req, res) => {
  const registrations = await registrationService.getRegistrationsForHackathon(
    req.params.hackathonId,
    req.user._id,
    req.user.role
  );
  res.status(200).json(new ApiResponse(200, 'Registrations retrieved', { registrations, count: registrations.length }));
});

const updateRegistrationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const registration = await registrationService.updateRegistrationStatus(
    req.params.id,
    status,
    req.user._id,
    req.user.role
  );
  res.status(200).json(new ApiResponse(200, `Registration ${status} successfully`, { registration }));
});

module.exports = {
  register,
  getMyRegistrations,
  cancelRegistration,
  getRegistrationsForHackathon,
  updateRegistrationStatus,
};
