import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},

		description: {
			type: String,
			required: true,
		},

		price: {
			type: Number,
			min: 0,
			required: true,
		},

		salePrice: {
			type: Number,
			min: 0,
			default: null,
		},

		discount: {
			type: Number,
			default: 0,
			min: 0,
			max: 100,
		},

		discountType: {
			type: String,
			enum: ["none", "product", "category", "festival"],
			default: "none",
		},

		image: {
			type: String,
			required: [true, "Image is required"],
		},

		category: {
			type: String,
			required: true,
		},

		isFeatured: {
			type: Boolean,
			default: false,
		},

		highlights: {
			type: [String],
			default: [],
		},

		details: {
			type: [String],
			default: [],
		},


		optionType: {
			type: String,
			default: "",
		},


		optionValues: {
			type: [String],
			default: [],
		},


		stock: {
			type: Number,
			default: 1,
		},


		isCustomizable: {
			type: Boolean,
			default: false,
		},


		maxCustomTextLength: {
			type: Number,
			default: 7,
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;