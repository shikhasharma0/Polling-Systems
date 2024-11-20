const express = require('express');
const { getPollResults } = require('../controllers/pollController');

const router = express.Router();

// GET Poll Results
router.get('/:id/results', getPollResults);

module.exports = router;
