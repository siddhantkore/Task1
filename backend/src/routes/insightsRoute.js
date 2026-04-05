const express = require('express');
const { getCategoryInsights } = require('../controllers/insightsController');

const router = express.Router();

router.get('/categories', getCategoryInsights);

module.exports = router;
