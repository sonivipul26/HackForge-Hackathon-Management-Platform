const express = require('express');
const { create, update, getAll, getOne } = require('../controllers/submission.controller');
const { validateSubmissionInput } = require('../validators/submission.validator');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', protect, validateSubmissionInput, create);
router.put('/:id', protect, update);

module.exports = router;
