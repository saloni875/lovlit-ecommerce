import Wishlist from "../models/wishlist.model.js";

// Add or Remove Wishlist
export const toggleWishlist = async (req, res) => {
	try {
		const { productId } = req.body;

		const existing = await Wishlist.findOne({
			user: req.user._id,
			product: productId,
		});

		if (existing) {
			await Wishlist.findByIdAndDelete(existing._id);

			return res.json({
				success: true,
				message: "Removed from wishlist",
				isWishlisted: false,
			});
		}

		await Wishlist.create({
			user: req.user._id,
			product: productId,
		});

		res.json({
			success: true,
			message: "Added to wishlist",
			isWishlisted: true,
		});
	} catch (error) {
		console.log("Wishlist Error:", error);

		res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};

// Get Wishlist
export const getWishlist = async (req, res) => {
	try {
		const wishlist = await Wishlist.find({
			user: req.user._id,
		})
			.populate("product")
			.lean();

		const validWishlist = wishlist.filter(item => item.product);
		res.json({
			success: true,
			wishlist: validWishlist,
		});
	} catch (error) {
		console.log("Wishlist Error:", error);

		res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};

// Remove Wishlist Item
export const removeWishlistItem = async (req, res) => {
	try {
		await Wishlist.findOneAndDelete({
			user: req.user._id,
			product: req.params.productId,
		});

		res.json({
			success: true,
			message: "Wishlist item removed",
		});
	} catch (error) {
		console.log("Wishlist Error:", error);

		res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};