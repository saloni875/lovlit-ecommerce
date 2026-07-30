import express from "express";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getFeaturedProducts,
	getProductsByCategory,
	getRecommendedProducts,
	toggleFeaturedProduct,
	getSingleProduct,
	updateProduct,
	searchProducts,
	moveProductDown,
	moveProductToTop,
	moveProductUp,
	moveProductToBottom
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/search", searchProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecommendedProducts);
router.get("/:id", getSingleProduct);
router.post("/", protectRoute, adminRoute, createProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.put("/:id", protectRoute, adminRoute, updateProduct);
router.put("/:id/discount", protectRoute, adminRoute);
router.put( "/:id/move-up", protectRoute, adminRoute, moveProductUp);
router.put( "/:id/move-down", protectRoute, adminRoute, moveProductDown);
router.put( "/:id/move-top", protectRoute, adminRoute, moveProductToTop);
router.put( "/:id/move-bottom", protectRoute, adminRoute, moveProductToBottom);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);



export default router;
