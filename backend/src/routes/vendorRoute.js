const express = require('express');
const { getVendors, getVarifiedVendors } = require('../controllers/vendorController');

const router = express.Router();

router.get('/', getVendors);
router.get('/verified-count/:slug', getVarifiedVendors);

module.exports = router;
