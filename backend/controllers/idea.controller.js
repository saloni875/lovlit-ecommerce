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