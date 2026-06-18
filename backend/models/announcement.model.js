import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			default: "",
		},
		isVisible: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const Announcement = mongoose.model(
	"Announcement",
	announcementSchema
);

export default Announcement;