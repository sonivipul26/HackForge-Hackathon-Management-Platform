const express = require('express');
const { submitEvaluation, getQueue } = require('../controllers/review.controller');
const { validateReviewInput } = require('../validators/review.validator');
const { protect, authorize } = require('../middleware/auth.middleware');
const { USER_ROLES } = require('../utils/constants');

const router = express.Router();

router.use(protect);
router.use(authorize(USER_ROLES.JUDGE, USER_ROLES.ADMIN));

router.post('/', validateReviewInput, submitEvaluation);
router.get('/queue/:hackathonId?', getQueue);

module.exports = router;
