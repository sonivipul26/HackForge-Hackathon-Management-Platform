const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const submissionService = require('../services/submission.service');

const create = asyncHandler(async (req, res) => {
  const submission = await submissionService.createSubmission(req.user._id, req.body);
  res.status(201).json(new ApiResponse(201, 'Project submitted successfully', { submission }));
});

const update = asyncHandler(async (req, res) => {
  const submission = await submissionService.updateSubmission(req.user._id, req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, 'Project submission updated successfully', { submission }));
});

const getAll = asyncHandler(async (req, res) => {
  const submissions = await submissionService.getAllSubmissions(req.query);
  res.status(200).json(new ApiResponse(200, 'Submissions retrieved', { submissions }));
});

const getOne = asyncHandler(async (req, res) => {
  const submission = await submissionService.getSubmissionById(req.params.id);
  res.status(200).json(new ApiResponse(200, 'Submission details retrieved', { submission }));
});

module.exports = { create, update, getAll, getOne };
