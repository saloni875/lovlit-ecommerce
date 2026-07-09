import express from "express";
import {
	createOrUpdateFestivalSale,
	getFestivalSales,
	deleteFestivalSale,
} from "../controllers/festivalSale.controller.js";

import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getFestivalSales);

router.post("/", protectRoute, adminRoute, createOrUpdateFestivalSale);

router.delete("/:id", protectRoute, adminRoute, deleteFestivalSale);

export default router;