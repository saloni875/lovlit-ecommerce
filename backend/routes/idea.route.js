import express from "express";

import {
	submitIdea,
} from "../controllers/idea.controller.js";

const router = express.Router();

router.post("/", submitIdea);

export default router;