const Submission = require('../models/Submission.model');
const Registration = require('../models/Registration.model');
const ApiError = require('../utils/ApiError');

const createSubmission = async (userId, submissionData) => {
  const { hackathonId, title, tagline, description, githubUrl, demoUrl, videoUrl, techStack, screenshotUrl, pdfUrl } = submissionData;

  const registration = await Registration.findOne({ hackathon: hackathonId, user: userId });
  if (!registration) {
    throw new ApiError(400, 'You must be registered for this hackathon before submitting a project');
  }

  const existingSubmission = await Submission.findOne({ hackathon: hackathonId, submittedBy: userId });
  if (existingSubmission) {
    throw new ApiError(400, 'You have already submitted a project for this hackathon');
  }

  const submission = await Submission.create({
    title,
    tagline,
    description,
    githubUrl,
    demoUrl: demoUrl || '',
    videoUrl: videoUrl || '',
    techStack: techStack || [],
    screenshotUrl: screenshotUrl || '',
    pdfUrl: pdfUrl || '',
    hackathon: hackathonId,
    team: registration.team || null,
    submittedBy: userId,
  });

  return submission;
};

const updateSubmission = async (userId, submissionId, updateData) => {
  const submission = await Submission.findById(submissionId);
  if (!submission) {
    throw new ApiError(404, 'Submission not found');
  }

  if (submission.submittedBy.toString() !== userId.toString()) {
    throw new ApiError(403, 'You are not authorized to edit this submission');
  }

  const allowedFields = ['title', 'tagline', 'description', 'githubUrl', 'demoUrl', 'videoUrl', 'techStack', 'screenshotUrl', 'pdfUrl'];
  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      submission[field] = updateData[field];
    }
  });

  await submission.save();
  return submission;
};

const getAllSubmissions = async (query = {}) => {
  const { hackathonId, search } = query;
  const filter = {};

  if (hackathonId) filter.hackathon = hackathonId;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { tagline: { $regex: search, $options: 'i' } },
    ];
  }

  const submissions = await Submission.find(filter)
    .populate('submittedBy', 'name email avatar organization')
    .populate('team', 'name joinCode')
    .sort({ createdAt: -1 });

  return submissions;
};

const getSubmissionById = async (id) => {
  const submission = await Submission.findById(id)
    .populate('submittedBy', 'name email avatar organization')
    .populate('team', 'name members')
    .populate('hackathon', 'title tagline organizer organizationName');

  if (!submission) {
    throw new ApiError(404, 'Submission not found');
  }

  return submission;
};

module.exports = {
  createSubmission,
  updateSubmission,
  getAllSubmissions,
  getSubmissionById,
};

