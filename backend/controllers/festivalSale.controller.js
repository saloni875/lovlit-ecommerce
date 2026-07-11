import FestivalSale from "../models/festivalSale.model.js";

// Create or Update Festival Sale
export const createOrUpdateFestivalSale = async (req, res) => {
	try {
		const { festivalName, discount, categories, active,startDate,
				endDAte, } = req.body;

		if (!festivalName) {
			return res.status(400).json({
				success: false,
				message: "Festival name is required",
			});
		}

		if (discount < 0 || discount > 60) {
			return res.status(400).json({
				success: false,
				message: "Discount must be between 0 and 60%",
			});
		}

		const sale = await FestivalSale.findOneAndUpdate(
			{ festivalName },
			{
				festivalName,
				discount,
				categories,
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
		console.log("Festival Sale Error:", error.message);

		res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};

// Get All Festival Sales
export const getFestivalSales = async (req, res) => {
	try {
		const sales = await FestivalSale.find().sort({ createdAt: -1 });

		res.status(200).json({
			success: true,
			sales,
		});
	} catch (error) {
		console.log("Festival Sale Error:", error.message);

		res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};

// Delete Festival Sale
export const deleteFestivalSale = async (req, res) => {
	try {
		await FestivalSale.findByIdAndDelete(req.params.id);

		res.status(200).json({
			success: true,
			message: "Festival Sale Deleted",
		});
	} catch (error) {
		console.log("Festival Sale Error:", error.message);

		res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
};