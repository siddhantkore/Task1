const fs = require('fs/promises');
const path = require('path');
const Category = require('../models/categoryModel');
const SubCategory = require('../models/subCategoryModel');
const Vendor = require('../models/vendorModel');
const slugify = require('./slugify');

const REFERENCE_DATA_PATH = path.resolve(__dirname, '../../../docs/reference_schema.json');

const loadReferenceData = async () => {
  const rawData = await fs.readFile(REFERENCE_DATA_PATH, 'utf-8');
  return JSON.parse(rawData);
};

const saveCategory = async (category) => {
  return Category.findOneAndUpdate(
    { title: category.title },
    {
      title: category.title,
      slug: slugify(category.title),
      description: category.description || '',
      icon: category.icon || '',
      viewsCount: category.viewsCount || 0,
      isActive: category.isActive !== false,
      createdAt: category.createdAt ? new Date(category.createdAt) : undefined,
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    },
  );
};

const saveSubCategory = async (subCategory, categoryId) => {
  return SubCategory.findOneAndUpdate(
    {
      title: subCategory.title,
      categoryId,
    },
    {
      title: subCategory.title,
      slug: slugify(subCategory.title),
      description: subCategory.description || '',
      viewsCount: subCategory.viewsCount || 0,
      isPopular: Boolean(subCategory.isPopular),
      categoryId,
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    },
  );
};

const saveVendor = async (vendor, categoryId, subCategoryId) => {
  const query = vendor.place_id
    ? { placeId: vendor.place_id }
    : { vendorName: vendor.vendorName, location: vendor.location };

  return Vendor.findOneAndUpdate(
    query,
    {
      title: vendor.title || vendor.vendorName,
      vendorName: vendor.vendorName,
      placeId: vendor.place_id,
      photo: vendor.photo || '',
      city: vendor.city || '',
      location: vendor.location || '',
      latitude: vendor.latitude ?? null,
      longitude: vendor.longitude ?? null,
      phoneNumber: vendor.phoneNumber || '',
      rating: vendor.rating || 0,
      numberOfRatings: vendor.numberOfRatings || 0,
      viewsCount: vendor.viewsCount || vendor.views || 0,
      amenities: vendor.amenities || [],
      tags: vendor.tags || [],
      priceRange: vendor.priceRange || '',
      isVerified: Boolean(vendor.isVerified),
      categoryId,
      subCategoryId,
      reviews: (vendor.reviews || []).map((review) => ({
        authorName: review.author_name || '',
        authorUrl: review.author_url || '',
        rating: review.rating || 0,
        text: review.text || '',
        time: review.time || null,
        relativeTimeDescription: review.relative_time_description || '',
      })),
      createdAt: vendor.createdAt ? new Date(vendor.createdAt) : undefined,
      updatedAt: vendor.updatedAt ? new Date(vendor.updatedAt) : undefined,
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    },
  );
};

const seedReferenceData = async () => {
  const referenceData = await loadReferenceData();
  const categoryMap = {};
  const subCategoryMap = {};

  // Step 1: save all categories and remember their ids.
  for (const category of referenceData.categories || []) {
    const savedCategory = await saveCategory(category);
    categoryMap[category.title] = savedCategory._id;
  }

  // Step 2: save all subcategories and connect them to categories.
  for (const subCategory of referenceData.subcategories || []) {
    const categoryId = categoryMap[subCategory.category];

    if (!categoryId) {
      continue;
    }

    const savedSubCategory = await saveSubCategory(subCategory, categoryId);
    subCategoryMap[`${subCategory.category}:${subCategory.title}`] = savedSubCategory._id;
  }

  // Step 3: save vendors and connect them to category and subcategory.
  for (const vendor of referenceData.vendors || []) {
    const categoryId = categoryMap[vendor.category];
    const subCategoryId = subCategoryMap[`${vendor.category}:${vendor.subcategory}`];

    if (!categoryId || !subCategoryId) {
      continue;
    }

    await saveVendor(vendor, categoryId, subCategoryId);
  }

  return {
    categories: referenceData.categories?.length || 0,
    subcategories: referenceData.subcategories?.length || 0,
    vendors: referenceData.vendors?.length || 0,
    metadata: referenceData.metadata || {},
  };
};

module.exports = {
  loadReferenceData,
  seedReferenceData,
};
