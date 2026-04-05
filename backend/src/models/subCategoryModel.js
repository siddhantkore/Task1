const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
  {
    title:{
      type: String,
      required: true,
      trim: true,
    },
    slug:{
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    viewsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

subCategorySchema.index({ title: 1, categoryId: 1 }, { unique: true });

module.exports = mongoose.model('SubCategory', subCategorySchema);
