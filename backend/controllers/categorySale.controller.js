import CategorySale from "../models/categorySale.model.js";

// Create or Update Category Sale
export const createOrUpdateCategorySale = async (req, res) => {
	try {
		console.log("catogry sale req", req.body);
		const { category, discount, active } = req.body;

		if (!category) {
			return res.status(400).json({
				success: false,
				message: "Category is required",
			});
		}

		if (discount < 0 || discount > 80) {
			return res.status(400).json({
				success: false,
				message: "Discount must be between 0 and 80%",
			});
		}

		const sale = await CategorySale.findOneAndUpdate(
			{ category },
			{
				category,
				discount,
				active,
			},
			{
				new: true,
				upsert: true,
			}
		);

		res.status(200).json({
			success: true,
			sale,
		});
	} catch (error) {
		console.log("Category Sale Error:", error.message);

		res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};

// Get All Category Sales
export const getCategorySales = async (req, res) => {
	try {
		const sales = await CategorySale.find().sort({ createdAt: -1 });

		res.status(200).json({
			success: true,
			sales,
		});
	} catch (error) {
		console.log("Category Sale Error:", error.message);

		res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};

// Delete Category Sale
export const deleteCategorySale = async (req, res) => {
	try {
		await CategorySale.findByIdAndDelete(req.params.id);

		res.status(200).json({
			success: true,
			message: "Category Sale Deleted",
		});
	} catch (error) {
		console.log("Category Sale Error:", error.message);

		res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};