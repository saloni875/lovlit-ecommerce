import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useReviewStore = create((set) => ({
	reviews: [],
	loading: false,

	fetchReviews: async () => {
		try {
			set({ loading: true });

			const res = await axios.get("/reviews");

			set({
				reviews: res.data,
				loading: false,
			});
		} catch (error) {
			set({ loading: false });
			toast.error("Failed to fetch reviews");
		}
	},

	createReview: async (reviewData) => {
		try {
			set({ loading: true });

			const res = await axios.post("/reviews", reviewData);

			set((state) => ({
				reviews: [res.data, ...state.reviews],
				loading: false,
			}));

			toast.success("Review published successfully 💜");
		} catch (error) {
			set({ loading: false });
			toast.error(
				error.response?.data?.message ||
					"Failed to publish review"
			);
		}
	},

	deleteReview: async (id) => {
		try {
			await axios.delete(`/reviews/${id}`);

			set((state) => ({
				reviews: state.reviews.filter(
					(review) => review._id !== id
				),
			}));

			toast.success("Review deleted");
		} catch (error) {
			toast.error("Failed to delete review");
		}
	},
}));