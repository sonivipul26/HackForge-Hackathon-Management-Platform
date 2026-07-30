const Hackathon = require('../models/Hackathon.model');
const ApiError = require('../utils/ApiError');

/**
 * Hackathon Business Logic & Database Service
 */

const createHackathon = async (organizerId, hackathonData) => {
  const hackathon = await Hackathon.create({
    ...hackathonData,
    organizer: organizerId,
  });

  return hackathon;
};

const getHackathons = async (query = {}) => {
  const { status, mode, category, search, page = 1, limit = 10 } = query;

  const filter = {};

  if (status) filter.status = status;
  if (mode) filter.mode = mode;
  if (category) filter.category = category;

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { tagline: { $regex: search, $options: 'i' } },
      { organizationName: { $regex: search, $options: 'i' } },
    ];
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const hackathons = await Hackathon.find(filter)
    .populate('organizer', 'name email avatar organization')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum);

  const total = await Hackathon.countDocuments(filter);

  return {
    hackathons,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum),
    },
  };
};

const getHackathonByIdOrSlug = async (identifier) => {
  let hackathon;

  // Check if identifier is a valid Mongo ObjectId
  if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
    hackathon = await Hackathon.findById(identifier).populate(
      'organizer',
      'name email avatar organization bio'
    );
  } else {
    hackathon = await Hackathon.findOne({ slug: identifier }).populate(
      'organizer',
      'name email avatar organization bio'
    );
  }

  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found');
  }

  return hackathon;
};

const updateHackathon = async (hackathonId, userId, userRole, updateData) => {
  const hackathon = await Hackathon.findById(hackathonId);

  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found');
  }

  // RBAC check: Only event owner (organizer) or super admin can edit
  if (userRole !== 'admin' && hackathon.organizer.toString() !== userId.toString()) {
    throw new ApiError(403, 'Not authorized to modify this hackathon');
  }

  Object.assign(hackathon, updateData);
  await hackathon.save();

  return hackathon;
};

const deleteHackathon = async (hackathonId, userId, userRole) => {
  const hackathon = await Hackathon.findById(hackathonId);

  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found');
  }

  if (userRole !== 'admin' && hackathon.organizer.toString() !== userId.toString()) {
    throw new ApiError(403, 'Not authorized to delete this hackathon');
  }

  await hackathon.deleteOne();
  return true;
};

const getMyHostedHackathons = async (organizerId) => {
  const hackathons = await Hackathon.find({ organizer: organizerId }).sort({ createdAt: -1 });
  return hackathons;
};

const assignJudge = async (hackathonId, judgeId, organizerId, userRole) => {
  const hackathon = await Hackathon.findById(hackathonId);
  if (!hackathon) throw new ApiError(404, 'Hackathon not found');

  if (userRole !== 'admin' && hackathon.organizer.toString() !== organizerId.toString()) {
    throw new ApiError(403, 'Not authorized to assign judges to this hackathon');
  }

  if (hackathon.judges.includes(judgeId)) {
    throw new ApiError(400, 'Judge is already assigned to this hackathon');
  }

  hackathon.judges.push(judgeId);
  await hackathon.save();
  return hackathon;
};

const removeJudge = async (hackathonId, judgeId, organizerId, userRole) => {
  const hackathon = await Hackathon.findById(hackathonId);
  if (!hackathon) throw new ApiError(404, 'Hackathon not found');

  if (userRole !== 'admin' && hackathon.organizer.toString() !== organizerId.toString()) {
    throw new ApiError(403, 'Not authorized to remove judges from this hackathon');
  }

  hackathon.judges = hackathon.judges.filter((j) => j.toString() !== judgeId.toString());
  await hackathon.save();
  return hackathon;
};

const toggleRegistration = async (hackathonId, organizerId, userRole) => {
  const hackathon = await Hackathon.findById(hackathonId);
  if (!hackathon) throw new ApiError(404, 'Hackathon not found');

  if (userRole !== 'admin' && hackathon.organizer.toString() !== organizerId.toString()) {
    throw new ApiError(403, 'Not authorized to modify this hackathon');
  }

  hackathon.registrationOpen = !hackathon.registrationOpen;
  await hackathon.save();
  return hackathon;
};

module.exports = {
  createHackathon,
  getHackathons,
  getHackathonByIdOrSlug,
  updateHackathon,
  deleteHackathon,
  getMyHostedHackathons,
  assignJudge,
  removeJudge,
  toggleRegistration,
};
