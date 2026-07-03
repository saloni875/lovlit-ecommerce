import express from "express";

import {
	getReviews,
	createReview,
	deleteReview,
} from "../controllers/review.controller.js";

import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getReviews);

router.post(
	"/",
	protectRoute,
	adminRoute,
	createReview
);

router.delete(
	"/:id",
	protectRoute,
	adminRoute,
	deleteReview
);

export default router;