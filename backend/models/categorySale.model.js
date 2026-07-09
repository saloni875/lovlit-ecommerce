import mongoose from "mongoose";

const categorySaleSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
    },

    discount: {
      type: Number,
      required: true,
      min: 0,
      max: 60,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const CategorySale = mongoose.model(
  "CategorySale",
  categorySaleSchema
);

export default CategorySale;