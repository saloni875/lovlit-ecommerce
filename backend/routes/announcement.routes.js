import express from "express";
import {
	getAnnouncement,
	updateAnnouncement,
} from "../controllers/announcement.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAnnouncement);

router.put("/", protectRoute, updateAnnouncement);

export default router;