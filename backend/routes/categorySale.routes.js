import express from "express";
import {
	createOrUpdateCategorySale,
	getCategorySales,
	deleteCategorySale,
} from "../controllers/categorySale.controller.js";

import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get all ctgry discounts
router.get("/", protectRoute, adminRoute, getCategorySales);

// Create or update category discount
router.post("/", protectRoute, adminRoute, createOrUpdateCategorySale);

// Delete category dis
router.delete("/:id", protectRoute, adminRoute, deleteCategorySale);

export default router;