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


		discountType: {
			type: String,
			enum: ["none", "productSale", "category", "festival"],
			default: "none",
		},

		images: {
			type: [String],
			required: [true, "At least one image is required"],
			validate: {
				validator: function (value) {
					return value.length > 0;
				},
				message: "At least one image is required",
			},
		},

		category: {
			type: String,
			required: true,
		},

		displayOrder: {
			type: Number,
			required: true,
			default: 0,
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

		colors: {
			type: [String],
			default: [],
		},

		sizes: {
			type: [String],
			default: [],
		},

		scents: {
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