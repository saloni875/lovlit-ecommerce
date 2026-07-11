import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useFestivalSaleStore = create((set) => ({
	festivalSales: [],
	loading: false,

	fetchFestivalSales: async () => {
		try {
			const res = await axios.get("/festival-sale");

			set({
				festivalSales: res.data.sales,
			});
		} catch (error) {
			console.log(error);
			toast.error("Failed to load festival discounts.");
		}
	},

	saveFestivalSale: async (data) => {
		set({ loading: true });

		try {
			await axios.post("/festival-sale", data);

			await useFestivalSaleStore
				.getState()
				.fetchFestivalSales();

			toast.success("Festival discount saved.");

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
				"Failed to save festival."
			);
		}
	},

	deleteFestivalSale: async (id) => {
		try {
			await axios.delete(`/festival-sale/${id}`);

			await useFestivalSaleStore
				.getState()
				.fetchFestivalSales();

			toast.success("Festival removed.");
		} catch (error) {
			console.log(error);
			toast.error("Failed to delete.");
		}
	},
}));