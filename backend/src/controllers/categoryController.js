const Category = require('../models/categoryModel');
const SubCategory = require('../models/subCategoryModel');
const Vendor = require('../models/vendorModel');

const formatCategory = async (category) => {
  const vendorCount = await Vendor.countDocuments({
        categoryId: category._id
    });

  const subCategoryCount = await SubCategory.countDocuments({
        categoryId: category._id
    });

  return {
    id: category._id,
    title: category.title,
    slug: category.slug,
    description: category.description,
    icon: category.icon,
    viewsCount: category.viewsCount,
    isActive: category.isActive,
    vendorCount,
    subCategoryCount,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
};

const formatVendor = (vendor)=>({
  id: vendor._id,
  title: vendor.title,
  vendorName: vendor.vendorName,
  photo: vendor.photo,
  city: vendor.city,
  location: vendor.location,
  phoneNumber: vendor.phoneNumber,
  rating: vendor.rating,
  numberOfRatings: vendor.numberOfRatings,
  viewsCount: vendor.viewsCount,
  priceRange: vendor.priceRange,
  isVerified: vendor.isVerified,
  amenities: vendor.amenities,
  tags: vendor.tags,
  subcategory: vendor.subCategoryId,
  reviews: vendor.reviews,
});

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({
      viewsCount: -1,
      title: 1,
    });
    const items = [];

    for (const category of categories) {
      const formattedCategory = await formatCategory(category);
      items.push(formattedCategory);
    }

    res.json({
        items
    });

  } catch (error) {
    next(error);
  }
};

const getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });

    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }

    const item = await formatCategory(category);

    return res.json(item);
  } catch (error) {
    next(error);
  }
};

const getCategoryVendors = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });

    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }

    const vendors = await Vendor.find({ categoryId: category._id })
      .populate('subCategoryId', 'title slug')
      .sort({ viewsCount: -1, rating: -1, vendorName: 1 });

    return res.json({
      category: {
        id: category._id,
        title: category.title,
        slug: category.slug,
      },
      items: vendors.map(formatVendor),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategoryBySlug,
  getCategoryVendors,
};
