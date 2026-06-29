import express from "express";

import {
	submitIdea,
	getIdeas,
	deleteIdea,
} from "../controllers/idea.controller.js";

const router = express.Router();

router.post("/", submitIdea);
router.get("/", getIdeas);
router.delete("/:id", deleteIdea);

export default router;