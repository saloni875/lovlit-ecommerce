
import express from "express";

import {
	toggleWishlist,
	getWishlist,
	removeWishlistItem,
} from "../controllers/wishlist.controller.js";

import {
	protectRoute,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// Get current user's wishlist
router.get("/", protectRoute, getWishlist);

// Add / Remove product from wishlist
router.post("/", protectRoute, toggleWishlist);

// Remove a specific product from wishlist
router.delete("/:productId", protectRoute, removeWishlistItem);

export default router;