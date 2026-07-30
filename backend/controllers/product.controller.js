import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";
import CategorySale from "../models/categorySale.model.js";
import FestivalSale from "../models/festivalSale.model.js";


const applyDiscount = async (product) => {
	let finalDiscount = 0;
	let finalPrice = product.price;

	// 1. Product Sale Price (Highest Priority)
	if (
		product.salePrice !== null &&
		product.salePrice > 0 &&
		product.salePrice < product.price
	) {
		finalPrice = product.salePrice;

		finalDiscount = Math.round(
			((product.price - product.salePrice) / product.price) * 100
		);
	} else {
		// 2. Category Discount
		const categorySale = await CategorySale.findOne({
			category: product.category,
			active: true,
		});

		if (categorySale) {
			finalDiscount = categorySale.discount;

			finalPrice = Math.round(
				product.price * (100 - finalDiscount) / 100
			);
		} else {
			// 3. Festival Discount
			const festivalSale = await FestivalSale.findOne({
				active: true,
				$or: [
					{ categories: { $size: 0 } }, // All categories
					{ categories: product.category },
				],
			});

			if (festivalSale) {
				finalDiscount = festivalSale.discount;

				finalPrice = Math.round(
					product.price * (100 - finalDiscount) / 100
				);
			}
		}
	}

	return {
		...product.toObject(),
		originalPrice: product.price,
		finalPrice,
		discount: finalDiscount,
	};
};

export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({}).sort({ displayOrder: 1 });

		const discountedProducts = await Promise.all(
			products.map((product) => applyDiscount(product))
		);
		console.log(discountedProducts);

		res.json({ products: discountedProducts });
	} catch (error) {
		console.log("Error in getAllProducts controller", error.message);
		res.status(500).json({
			message: "Server error",
			error: error.message,
		});
	}
};

export const getFeaturedProducts = async (req, res) => {
	try {
		let cachedProducts = await redis.get("featured_products");

		// if (cachedProducts) {
		// 	return res.json(JSON.parse(cachedProducts));
		// 	console.log("featured from redis:" , cachedProducts);
		// }

		// if not in redis, fetch from mongodb
		// .lean() is gonna return a plain javascript object instead of a mongodb document
		// which is good for performance when we just want to read data and not use any mongoose methods on it

		const featured = await Product.find({
			isFeatured: true,
		});

		if (!featured.length) {
			return res.status(404).json({
				message: "No featured products found",
			});
		}

		const featuredProducts = await Promise.all(
			featured.map((product) => applyDiscount(product))
		);

		// Store discounted products in Redis
		await redis.set(
			"featured_products",
			JSON.stringify(featuredProducts)
		);

		res.json(featuredProducts);
	} catch (error) {
		console.log("Error in getFeaturedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createProduct = async (req, res) => {
	try {
		const {
			name,
			description,
			price,
			salePrice,
			images,
			category,
			highlights,
			details,
			colors,
			sizes,
			scents,
			stock,
			isCustomizable,
			maxCustomTextLength,
		} = req.body;

		let uploadedImages = [];

		if (images && images.length > 0) {
			uploadedImages = await Promise.all(
				images.map(async (image) => {
					const result = await cloudinary.uploader.upload(image, {
						folder: "products",
					});

					return result.secure_url;
				})
			);
		}

		const lastProduct = await Product.findOne({
			category,
		}).sort({ displayOrder: -1 });

		const displayOrder = lastProduct
			? lastProduct.displayOrder + 1
			: 1;

		const product = await Product.create({
			name,
			description,
			price,

			images: uploadedImages,

			category,
			displayOrder,
			highlights: highlights
				? highlights
					.split("\n")
					.map((item) => item.trim())
					.filter(Boolean)
				: [],

			details: details
				? details
					.split("\n")
					.map((item) => item.trim())
					.filter(Boolean)
				: [],


			colors: colors
				? colors
					.split("\n")
					.map((item) => item.trim())
					.filter(Boolean)
				: [],

			sizes: sizes
				? sizes
					.split("\n")
					.map((item) => item.trim())
					.filter(Boolean)
				: [],

			scents: scents
				? scents
					.split("\n")
					.map((item) => item.trim())
					.filter(Boolean)
				: [],
			stock,
			isCustomizable,
			maxCustomTextLength,
		});

		res.status(201).json(product);
	} catch (error) {
		console.log(
			"Error in createProduct controller",
			error.message
		);

		res.status(500).json({
			message: "Server error",
			error: error.message,
		});
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
			}
		}

		await Product.findByIdAndDelete(req.params.id);
		await redis.del("featured_products"); // Invalidate the cache after deletion
		await updateFeaturedProductsCache();
		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getRecommendedProducts = async (req, res) => {
	try {

		const products = await Product.find().limit(50);

		const randomProducts = products
			.sort(() => 0.5 - Math.random())
			.slice(0, 4);

		const discountedProducts = await Promise.all(
			randomProducts.map(product => applyDiscount(product))
		);

		res.json(discountedProducts);

	} catch (error) {
		console.log("Error in getRecommendedProducts controller", error.message);

		res.status(500).json({
			message: "Server error",
		});
	}
};

export const getProductsByCategory = async (req, res) => {
	const { category } = req.params;

	try {
		const products = await Product.find({ category }).sort({
			displayOrder: 1,
		});

		const discountedProducts = await Promise.all(
			products.map((product) => applyDiscount(product))
		);

		res.json({
			products: discountedProducts,
		});
	} catch (error) {
		console.log(
			"Error in getProductsByCategory controller",
			error.message
		);

		res.status(500).json({
			message: "Server error",
			error: error.message,
		});
	}
};

export const getSingleProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({
				message: "Product not found",
			});
		}

		const discountedProduct = await applyDiscount(product);

		res.json(discountedProduct);
	} catch (error) {
		console.log(
			"Error in getSingleProduct controller",
			error.message
		);

		res.status(500).json({
			message: "Server error",
			error: error.message,
		});
	}
};

export const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			product.isFeatured = !product.isFeatured;
			const updatedProduct = await product.save();
			await updateFeaturedProductsCache();
			res.json(updatedProduct);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		console.log("Error in toggleFeaturedProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


// The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance
async function updateFeaturedProductsCache() {
	try {
		console.log("Updating featured cache...");

		const featuredProducts =
			await Product.find({ isFeatured: true }).lean();

		console.log(featuredProducts.length);

		await redis.set(
			"featured_products",
			JSON.stringify(featuredProducts)
		);

		console.log("Cache updated");
	} catch (error) {
		console.log(error);
	}
}

// export const updateProductDiscount = async (req, res) => {
// 	try {
// 		const { productDiscount } = req.body;

// 		if (productDiscount < 0 || productDiscount > 80) {
// 			return res.status(400).json({
// 				success: false,
// 				message: "Discount must be between 0 and 60%",
// 			});
// 		}

// 		const product = await Product.findByIdAndUpdate(
// 			req.params.id,
// 			{ productDiscount },
// 			{ new: true }
// 		);

// 		if (!product) {
// 			return res.status(404).json({
// 				success: false,
// 				message: "Product not found",
// 			});
// 		}

// 		await updateFeaturedProductsCache();

// 		res.status(200).json({
// 			success: true,
// 			product,
// 		});
// 	} catch (error) {
// 		console.log(error);

// 		res.status(500).json({
// 			success: false,
// 			message: "Server Error",
// 		});
// 	}
// };



export const updateProduct = async (req, res) => {
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);

		if (!updatedProduct) {
			return res.status(404).json({
				message: "Product not found",
			});
		}

		await updateFeaturedProductsCache();

		res.json(updatedProduct);
	} catch (error) {
		console.log(
			"Error in updateProduct controller",
			error.message
		);

		res.status(500).json({
			message: "Server error",
			error: error.message,
		});
	}
};

// move product to top
export const moveProductToTop = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});
		}

		// Already at top
		if (product.displayOrder === 1) {
			return res.status(200).json({
				success: true,
				message: "Product is already at the top",
			});
		}

		// Shift all products above it down by one
		await Product.updateMany(
			{
				category: product.category,
				displayOrder: {
					$gte: 1,
					$lt: product.displayOrder,
				},
			},
			{
				$inc: { displayOrder: 1 },
			}
		);

		// Move selected product to top
		product.displayOrder = 1;
		await product.save();

		res.status(200).json({
			success: true,
			message: "Product moved to top successfully",
		});
	} catch (error) {
		console.log("Error moving product to top:", error);

		res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};

// move down
export const moveProductDown = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});
		}

		const lastProduct = await Product.findOne({
			category: product.category,
		}).sort({ displayOrder: -1 });

		// Already at bottom
		if (product.displayOrder === lastProduct.displayOrder) {
			return res.status(200).json({
				success: true,
				message: "Product is already at the bottom",
			});
		}

		// Find the product below it
		const lowerProduct = await Product.findOne({
			category: product.category,
			displayOrder: product.displayOrder + 1,
		});

		if (!lowerProduct) {
			return res.status(404).json({
				success: false,
				message: "Lower product not found",
			});
		}

		// Swap displayOrder
		const temp = product.displayOrder;

		product.displayOrder = lowerProduct.displayOrder;
		lowerProduct.displayOrder = temp;

		await product.save();
		await lowerProduct.save();

		res.status(200).json({
			success: true,
			message: "Product moved down successfully",
		});
	} catch (error) {
		console.log("Error moving product down:", error);

		res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};

// two product swap with up product
export const moveProductUp = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({
				message: "Product not found",
			});
		}

		// Already at the top
		if (product.displayOrder === 1) {
			return res.status(400).json({
				message: "Product is already at the top",
			});
		}

		// Find the product just above it in the same category
		const upperProduct = await Product.findOne({
			category: product.category,
			displayOrder: product.displayOrder - 1,
		});

		if (!upperProduct) {
			return res.status(404).json({
				message: "Upper product not found",
			});
		}

		// Swap displayOrder values
		const temp = product.displayOrder;

		product.displayOrder = upperProduct.displayOrder;
		upperProduct.displayOrder = temp;

		await product.save();
		await upperProduct.save();

		res.status(200).json({
			success: true,
			message: "Product moved up successfully",
		});
	} catch (error) {
		console.log("Error moving product up:", error);

		res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};

// product swap with bottom
export const moveProductToBottom = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});
		}

		const lastProduct = await Product.findOne({
			category: product.category,
		}).sort({ displayOrder: -1 });

		// Already at bottom
		if (product.displayOrder === lastProduct.displayOrder) {
			return res.status(200).json({
				success: true,
				message: "Product is already at the bottom",
			});
		}

		// Shift all products below it up by one
		await Product.updateMany(
			{
				category: product.category,
				displayOrder: {
					$gt: product.displayOrder,
					$lte: lastProduct.displayOrder,
				},
			},
			{
				$inc: { displayOrder: -1 },
			}
		);

		// Move selected product to bottom
		product.displayOrder = lastProduct.displayOrder;

		await product.save();

		res.status(200).json({
			success: true,
			message: "Product moved to bottom successfully",
		});
	} catch (error) {
		console.log("Error moving product to bottom:", error);

		res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};

export const searchProducts = async (req, res) => {
	try {
		const { query } = req.query;

		if (!query) {
			return res.json({
				products: [],
			});
		}

		const products = await Product.find({
			$or: [
				{
					name: {
						$regex: query,
						$options: "i",
					},
				},
				{
					category: {
						$regex: query,
						$options: "i",
					},
				},
				{
					description: {
						$regex: query,
						$options: "i",
					},
				},
			],
		});

		const discountedProducts = await Promise.all(
			products.map((product) => applyDiscount(product))
		);

		res.json({
			products: discountedProducts,
		});
	} catch (error) {
		console.log("Search Error:", error);

		res.status(500).json({
			message: "Server Error",
		});
	}
};

