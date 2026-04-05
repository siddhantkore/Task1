const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    authorName: {
      type: String,
      trim: true,
      default: '',
    },
    authorUrl: {
      type: String,
      trim: true,
      default: '',
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    text: {
      type: String,
      trim: true,
      default: '',
    },
    time: {
      type: Number,
      default: null,
    },
    relativeTimeDescription: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    _id: false,
  },
);

const vendorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    vendorName: {
      type: String,
      required: true,
      trim: true,
    },
    placeId: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      index: true,
    },
    photo: {
      type: String,
      trim: true,
      default: '',
    },
    city: {
      type: String,
      trim: true,
      default: '',
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    latitude: {
      type: Number,
      default: null,
    },
    longitude: {
      type: Number,
      default: null,
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: '',
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    numberOfRatings: {
      type: Number,
      min: 0,
      default: 0,
    },
    viewsCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    amenities: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    priceRange: {
      type: String,
      trim: true,
      default: '',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true,
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: true,
      index: true,
    },
    reviews: {
      type: [reviewSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

vendorSchema.index({ vendorName: 1, categoryId: 1 });

module.exports = mongoose.model('Vendor', vendorSchema);
