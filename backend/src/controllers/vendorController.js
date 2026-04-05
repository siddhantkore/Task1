const Category = require('../models/categoryModel');
const Vendor = require('../models/vendorModel');

const getVendors = async (req, res, next) => {
  try {
    const { category, city } = req.query;
    const filters = {};

    if (city) {
      filters.city = city;
    }

    if (category) {
      const matchedCategory = await Category.findOne({
        $or: [{ slug: category }, { title: category }],
      });

      if (!matchedCategory) {
        return res.json({
          items: [],
        });
      }

      filters.categoryId = matchedCategory._id;
    }

    const vendors = await Vendor.find(filters)
      .populate('categoryId', 'title slug')
      .populate('subCategoryId', 'title slug')
      .sort({ viewsCount: -1, rating: -1, vendorName: 1 });

    return res.json({
      items: vendors.map((vendor) => ({
        id: vendor._id,
        title: vendor.title,
        vendorName: vendor.vendorName,
        placeId: vendor.placeId,
        photo: vendor.photo,
        city: vendor.city,
        location: vendor.location,
        phoneNumber: vendor.phoneNumber,
        rating: vendor.rating,
        numberOfRatings: vendor.numberOfRatings,
        viewsCount: vendor.viewsCount,
        amenities: vendor.amenities,
        priceRange: vendor.priceRange,
        isVerified: vendor.isVerified,
        category: vendor.categoryId,
        subcategory: vendor.subCategoryId,
        reviews: vendor.reviews,
      })),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVendors,
};
