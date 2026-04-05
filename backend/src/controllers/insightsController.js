const Category = require('../models/categoryModel');
const SubCategory = require('../models/subCategoryModel');
const Vendor = require('../models/vendorModel');

const getCategoryInsights = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({
      viewsCount: -1,
      title: 1,
    });
    const items = [];
    let maxViews = 0;

    for (const category of categories) {
      const vendorCount = await Vendor.countDocuments({ categoryId: category._id });
      const subCategoryCount = await SubCategory.countDocuments({ categoryId: category._id });

      if (category.viewsCount > maxViews) {
        maxViews = category.viewsCount;
      }

      items.push({
        id: category._id,
        title: category.title,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
        viewsCount: category.viewsCount,
        vendorCount,
        subCategoryCount,
      });
    }

    for (const item of items) {
      item.barPercentage = maxViews === 0 ? 0 : Math.round((item.viewsCount / maxViews) * 100);
    }

    res.json({
      items,
      summary: {
        totalCategories: items.length,
        totalViews: items.reduce((sum, item) => sum + item.viewsCount, 0),
        totalVendors: items.reduce((sum, item) => sum + item.vendorCount, 0),
        totalSubcategories: items.reduce((sum, item) => sum + item.subCategoryCount, 0),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategoryInsights,
};
