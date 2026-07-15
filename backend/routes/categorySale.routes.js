import express from "express";
import {
	createOrUpdateCategorySale,
	getCategorySales,
	deleteCategorySale,
} from "../controllers/categorySale.controller.js";

import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/test", (req, res) => {
	console.log(" POST test reached");
	res.json({ success: true });
});

// Get all ctgry discounts
router.get("/", protectRoute, adminRoute, getCategorySales);
// router.post("/", (req, res, next) => {
// 	console.log("Category sale route hit");
// 	next();
// }, createOrUpdateCategorySale);

// Create or update category discount
router.post("/", protectRoute, adminRoute, createOrUpdateCategorySale);

// Delete category dis
router.delete("/:id", protectRoute, adminRoute, deleteCategorySale);



export default router;