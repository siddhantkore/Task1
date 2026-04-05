const express = require('express');
const {
  getCategories,
  getCategoryBySlug,
  getCategoryVendors,
} = require('../controllers/categoryController');

const router = express.Router();

router.get('/', getCategories);
router.get('/:slug', getCategoryBySlug);
router.get('/:slug/vendors', getCategoryVendors);

module.exports = router;
