import Idea from "../models/idea.model.js";

export const submitIdea = async (req, res) => {
	try {
		const {
			name,
			contact,
			idea,
			inspirationLink,
		} = req.body;

		const newIdea = await Idea.create({
			name,
			contact,
			idea,
			inspirationLink,
		});

		res.status(201).json(newIdea);
	} catch (error) {
		console.log(
			"Error in submitIdea controller",
			error.message
		);

		res.status(500).json({
			message: "Server error",
		});
	}
};

export const getIdeas = async (req, res) => {
	try {
		const ideas = await Idea.find().sort({ createdAt: -1 });

		res.status(200).json(ideas);
	} catch (error) {
		console.log("Error in getIdeas controller", error.message);

		res.status(500).json({
			message: "Server error",
		});
	}
};

export const deleteIdea = async (req, res) => {
	try {
		const { id } = req.params;

		await Idea.findByIdAndDelete(id);

		res.status(200).json({
			message: "Idea deleted successfully",
		});
	} catch (error) {
		console.log("Error in deleteIdea controller", error.message);

		res.status(500).json({
			message: "Server error",
		});
	}
};