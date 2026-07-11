import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useCategorySaleStore = create((set) => ({
	categorySales: [],
	loading: false,

	// Get all category discounts
	fetchCategorySales: async () => {
		try {
			const res = await axios.get("/category-sale");

			set({
				categorySales: res.data.sales,
			});
		} catch (error) {
			console.log(error);

			toast.error("Failed to load category discounts.");
		}
	},

	// Save Category Discount
	saveCategoryDiscount: async (data) => {
		set({ loading: true });

		try {
			await axios.post("/category-sale", {
				...data,
				active: data.discount > 0,
			});

			await useCategorySaleStore
				.getState()
				.fetchCategorySales();

			toast.success("Category discount saved.");

			set({
				loading: false,
			});
		} catch (error) {
			console.log(error);

			set({
				loading: false,
			});

			toast.error(
				error.response?.data?.message ||
					"Failed to save category discount."
			);
		}
	},

	// Delete Category Discount
	deleteCategoryDiscount: async (id) => {
		set({
			loading: true,
		});

		try {
			await axios.delete(`/category-sale/${id}`);

			await useCategorySaleStore
				.getState()
				.fetchCategorySales();

			toast.success("Category discount removed.");

			set({
				loading: false,
			});
		} catch (error) {
			console.log(error);

			set({
				loading: false,
			});

			toast.error(
				error.response?.data?.message ||
					"Failed to delete category discount."
			);
		}
	},
}));