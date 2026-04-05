const express = require('express');

const router = express.Router();

router.use('/categories', require('./categoryRoute'));
router.use('/insights', require('./insightsRoute'));
router.use('/seed', require('./seedRoute'));
router.use('/vendors', require('./vendorRoute'));
router.use('/services', require('./vendorRoute'));

module.exports = router;
