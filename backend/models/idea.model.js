import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},

		contact: {
			type: String,
			required: true,
		},

		idea: {
			type: String,
			required: true,
		},

		inspirationLink: {
			type: String,
		},
		instagram: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

const Idea = mongoose.model("Idea", ideaSchema);

export default Idea;