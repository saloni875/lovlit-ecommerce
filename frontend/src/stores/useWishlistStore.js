import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useWishlistStore = create((set, get) => ({

	wishlist: [],
	loading: false,

	// Get Wishlist
	getWishlist: async () => {
		try {

			set({ loading: true });

			const res = await axios.get("/wishlist");

			set({
				wishlist: res.data.wishlist,
				loading: false,
			});

		} catch (error) {

			console.log(error);

			set({ loading: false });
		}
	},

	// Add / Remove Wishlist
	toggleWishlist: async (productId) => {
		try {

			const res = await axios.post("/wishlist", {
				productId,
			});

			toast.success(res.data.message);

			get().getWishlist();

		} catch (error) {

			console.log(error);

			toast.error(
				error.response?.data?.message ||
				"Something went wrong."
			);
		}
	},

	// Remove Item
	removeWishlistItem: async (productId) => {
		try {

			await axios.delete(`/wishlist/${productId}`);

			toast.success("Removed from wishlist.");

			get().getWishlist();

		} catch (error) {

			console.log(error);

			toast.error("Failed to remove item.");
		}
	},

}));