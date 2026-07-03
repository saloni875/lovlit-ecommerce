import Review from "../models/review.model.js";

export const getReviews = async (req, res) => {
	try {
		const reviews = await Review.find().sort({
			createdAt: -1,
		});

		res.json(reviews);
	} catch (error) {
		res.status(500).json({
			message: "Failed to fetch reviews",
		});
	}
};

export const createReview = async (req, res) => {
	try {
		const { customerName, caption, image } = req.body;

		const review = await Review.create({
			customerName,
			caption,
			image,
		});

		res.status(201).json(review);
	} catch (error) {
		res.status(500).json({
			message: "Failed to create review",
		});
	}
};

export const deleteReview = async (req, res) => {
	try {
		await Review.findByIdAndDelete(req.params.id);

		res.json({
			message: "Review deleted",
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to delete review",
		});
	}
};