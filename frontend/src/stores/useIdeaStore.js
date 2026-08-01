import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const API_URL =
	import.meta.env.MODE === "development"
		? "http://localhost:5000/api/ideas"
		: "/api/ideas";

export const useIdeaStore = create((set) => ({
	ideas: [],
	loading: false,

	fetchIdeas: async () => {
		try {
			set({ loading: true });

			const res = await axios.get(API_URL);
			console.log("Ideas Response:", res.data);
			console.log("Is Array:", Array.isArray(res.data));

			set({
				ideas: res.data,
				loading: false,
			});
		} catch (error) {
			set({ loading: false });

			toast.error(
				error.response?.data?.message ||
				"Failed to load ideas"
			);
		}
	},

	deleteIdea: async (id) => {
		try {
			await axios.delete(`${API_URL}/${id}`);

			set((state) => ({
				ideas: state.ideas.filter(
					(idea) => idea._id !== id
				),
			}));

			toast.success("Idea deleted");
		} catch (error) {
			toast.error(
				error.response?.data?.message ||
				"Failed to delete idea"
			);
		}
	},
}));