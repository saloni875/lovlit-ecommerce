import Announcement from "../models/announcement.model.js";

export const getAnnouncement = async (req, res) => {
	try {
		let announcement = await Announcement.findOne();

		if (!announcement) {
			announcement = await Announcement.create({
				text: "",
				isVisible: false,
			});
		}

		res.json(announcement);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

export const updateAnnouncement = async (req, res) => {
	try {
		const { text, isVisible } = req.body;

		let announcement = await Announcement.findOne();

		if (!announcement) {
			announcement = await Announcement.create({
				text,
				isVisible,
			});
		} else {
			announcement.text = text;
			announcement.isVisible = isVisible;

			await announcement.save();
		}

		res.json(announcement);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};