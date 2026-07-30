const Team = require('../models/Team.model');
const Registration = require('../models/Registration.model');
const Hackathon = require('../models/Hackathon.model');
const ApiError = require('../utils/ApiError');

/**
 * Team Management Service
 *
 * Handles team creation, joining, leaving, member removal,
 * leadership transfer, and team deletion.
 */

// ─── Generate Unique Join Code ───────────────────────────────────────
const generateJoinCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'FORGE-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// ─── Create Team ─────────────────────────────────────────────────────
const createTeam = async (leaderId, hackathonId, name) => {
  const hackathon = await Hackathon.findById(hackathonId);
  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found');
  }

  // Ensure user is registered for the hackathon
  let registration = await Registration.findOne({ hackathon: hackathonId, user: leaderId });
  if (!registration) {
    // Auto-register user if not registered yet
    registration = await Registration.create({ hackathon: hackathonId, user: leaderId });
    hackathon.participantCount += 1;
  }

  if (registration.team) {
    throw new ApiError(400, 'You are already part of a team in this hackathon');
  }

  const joinCode = generateJoinCode();

  const team = await Team.create({
    name,
    joinCode,
    hackathon: hackathonId,
    leader: leaderId,
    members: [leaderId],
    maxSize: hackathon.maxTeamSize || 4,
  });

  // Link team back to user's registration
  registration.team = team._id;
  await registration.save();

  hackathon.teamCount += 1;
  await hackathon.save();

  return team;
};

// ─── Join Team by Code ───────────────────────────────────────────────
const joinTeamByCode = async (userId, joinCode) => {
  const team = await Team.findOne({ joinCode: joinCode.toUpperCase() });
  if (!team) {
    throw new ApiError(404, 'Invalid team join code');
  }

  if (team.members.includes(userId)) {
    throw new ApiError(400, 'You are already a member of this team');
  }

  if (team.members.length >= team.maxSize) {
    throw new ApiError(400, 'Team has reached its maximum size capacity');
  }

  let registration = await Registration.findOne({ hackathon: team.hackathon, user: userId });
  if (!registration) {
    registration = await Registration.create({ hackathon: team.hackathon, user: userId });
    await Hackathon.findByIdAndUpdate(team.hackathon, { $inc: { participantCount: 1 } });
  }

  if (registration.team) {
    throw new ApiError(400, 'You are already part of another team in this hackathon');
  }

  team.members.push(userId);
  if (team.members.length >= team.maxSize) {
    team.status = 'complete';
  }
  await team.save();

  registration.team = team._id;
  await registration.save();

  return team;
};

// ─── Leave Team ──────────────────────────────────────────────────────
const leaveTeam = async (userId, teamId) => {
  const team = await Team.findById(teamId);
  if (!team) throw new ApiError(404, 'Team not found');

  if (!team.members.includes(userId)) {
    throw new ApiError(400, 'You are not a member of this team');
  }

  // Leader cannot leave without transferring leadership first
  if (team.leader.toString() === userId.toString()) {
    throw new ApiError(400, 'Team leader must transfer leadership before leaving. Use transfer leadership first.');
  }

  team.members = team.members.filter((m) => m.toString() !== userId.toString());
  if (team.status === 'complete') team.status = 'forming';
  await team.save();

  // Remove team reference from registration
  await Registration.findOneAndUpdate(
    { hackathon: team.hackathon, user: userId },
    { $unset: { team: 1 } }
  );

  return team;
};

// ─── Remove Team Member (Leader only) ────────────────────────────────
const removeMember = async (leaderId, teamId, memberId) => {
  const team = await Team.findById(teamId);
  if (!team) throw new ApiError(404, 'Team not found');

  if (team.leader.toString() !== leaderId.toString()) {
    throw new ApiError(403, 'Only the team leader can remove members');
  }

  if (memberId.toString() === leaderId.toString()) {
    throw new ApiError(400, 'Cannot remove yourself. Use leave team instead.');
  }

  if (!team.members.includes(memberId)) {
    throw new ApiError(400, 'User is not a member of this team');
  }

  team.members = team.members.filter((m) => m.toString() !== memberId.toString());
  if (team.status === 'complete') team.status = 'forming';
  await team.save();

  await Registration.findOneAndUpdate(
    { hackathon: team.hackathon, user: memberId },
    { $unset: { team: 1 } }
  );

  return team;
};

// ─── Transfer Leadership ─────────────────────────────────────────────
const transferLeadership = async (currentLeaderId, teamId, newLeaderId) => {
  const team = await Team.findById(teamId);
  if (!team) throw new ApiError(404, 'Team not found');

  if (team.leader.toString() !== currentLeaderId.toString()) {
    throw new ApiError(403, 'Only the current team leader can transfer leadership');
  }

  if (!team.members.includes(newLeaderId)) {
    throw new ApiError(400, 'New leader must be a member of the team');
  }

  team.leader = newLeaderId;
  await team.save();

  return team;
};

// ─── Delete Team (Leader only) ───────────────────────────────────────
const deleteTeam = async (userId, teamId) => {
  const team = await Team.findById(teamId);
  if (!team) throw new ApiError(404, 'Team not found');

  if (team.leader.toString() !== userId.toString()) {
    throw new ApiError(403, 'Only the team leader can delete the team');
  }

  // Clear team references from all member registrations
  await Registration.updateMany(
    { hackathon: team.hackathon, team: teamId },
    { $unset: { team: 1 } }
  );

  // Decrement team count
  await Hackathon.findByIdAndUpdate(team.hackathon, { $inc: { teamCount: -1 } });

  await Team.findByIdAndDelete(teamId);

  return team;
};

// ─── Get My Team for Hackathon ───────────────────────────────────────
const getMyTeamForHackathon = async (userId, hackathonId) => {
  const registration = await Registration.findOne({ hackathon: hackathonId, user: userId }).populate({
    path: 'team',
    populate: [
      { path: 'leader', select: 'name email avatar organization' },
      { path: 'members', select: 'name email avatar organization skills githubUrl' },
    ],
  });

  return registration?.team || null;
};

module.exports = {
  createTeam,
  joinTeamByCode,
  leaveTeam,
  removeMember,
  transferLeadership,
  deleteTeam,
  getMyTeamForHackathon,
};
