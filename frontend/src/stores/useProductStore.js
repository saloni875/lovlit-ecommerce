import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";


export const useProductStore = create((set) => ({
	products: [],
	selectedProduct: null,
	loading: false,
	searchResults: [],
	searchLoading: false,

	setProducts: (products) => set({ products }),
	createProduct: async (productData) => {
		set({ loading: true });
		try {
			const res = await axios.post("/products", productData);
			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},

	fetchAllProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products");
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},

	fetchFeaturedProducts: async () => {

		set({ loading: true });

		try {
			const res = await axios.get("/products/featured");

			console.log(res.data);


			set({
				products: res.data,
				loading: false,
			});
		} catch (error) {
			set({ loading: false });

			toast.error(
				error.response?.data?.error || "Failed to fetch featured products"
			);
		}
	},

	fetchSingleProduct: async (productId) => {
		set({ loading: true });

		try {
			const response = await axios.get(`/products/${productId}`);

			set({
				selectedProduct: response.data,
				loading: false,
			});
		} catch (error) {
			set({
				selectedProduct: null,
				loading: false,
			});

			toast.error(
				error.response?.data?.message ||
				"Failed to fetch product"
			);
		}
	},

	deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			await axios.delete(`/products/${productId}`);
			set((prevProducts) => ({
				products: prevProducts.products.filter((product) => product._id !== productId),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete product");
		}
	},

	toggleFeaturedProduct: async (productId) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`/products/${productId}`);
			// this will update the isFeatured prop of the product
			set((prevProducts) => ({
				products: prevProducts.products.map((product) =>
					product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
				),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to update product");
		}
	},

	updateProduct: async (productId, productData) => {
		set({ loading: true });

		try {
			const response = await axios.put(
				`/products/${productId}`,
				productData
			);

			set((state) => ({
				products: state.products.map((product) =>
					product._id === productId
						? response.data
						: product
				),
				loading: false,
			}));

			toast.success("Product updated successfully");
		} catch (error) {
			set({ loading: false });

			toast.error(
				error.response?.data?.message ||
				"Failed to update product"
			);
		}
	},

	moveProductUp: async (productId) => {
		set({ loading: true });

		try {
			await axios.put(`/products/${productId}/move-up`);

			await useProductStore.getState().fetchAllProducts();

			set({ loading: false });

			toast.success("Product moved up");
		} catch (error) {
			set({ loading: false });

			toast.error(
				error.response?.data?.message || "Failed to move product"
			);
		}
	},

	moveProductDown: async (productId) => {
		set({ loading: true });

		try {
			await axios.put(`/products/${productId}/move-down`);

			await useProductStore.getState().fetchAllProducts();

			set({ loading: false });

			toast.success("Product moved down");
		} catch (error) {
			set({ loading: false });

			toast.error(
				error.response?.data?.message || "Failed to move product"
			);
		}
	},

	moveProductToTop: async (productId) => {
		set({ loading: true });

		try {
			await axios.put(`/products/${productId}/move-top`);

			await useProductStore.getState().fetchAllProducts();

			set({ loading: false });

			toast.success("Moved to top");
		} catch (error) {
			set({ loading: false });

			toast.error(
				error.response?.data?.message || "Failed to move product"
			);
		}
	},

	moveProductToBottom: async (productId) => {
		set({ loading: true });

		try {
			await axios.put(`/products/${productId}/move-bottom`);

			await useProductStore.getState().fetchAllProducts();

			set({ loading: false });

			toast.success("Moved to bottom");
		} catch (error) {
			set({ loading: false });

			toast.error(
				error.response?.data?.message || "Failed to move product"
			);
		}
	},

	updateProductDiscount: async (productId, productDiscount) => {
		set({ loading: true });

		try {
			const response = await axios.put(
				`/products/${productId}/discount`,
				{ productDiscount }
			);

			set((state) => ({
				products: state.products.map((product) =>
					product._id === productId
						? response.data.product
						: product
				),
				loading: false,
			}));

			toast.success("Discount updated successfully");
		} catch (error) {
			set({ loading: false });

			toast.error(
				error.response?.data?.message ||
				"Failed to update discount"
			);
		}
	},

	fetchProductsByCategory: async (category) => {
		set({
			loading: true,
			products: [], // Clear old products immediately
		});

		try {
			const res = await axios.get(`/products/category/${category}`);
			console.log(res.data);

			set({
				products: res.data.products,
				loading: false,
			});
		} catch (error) {
			set({
				products: [],
				loading: false,
			});
		}
	},

	searchProducts: async (query) => {
		try {
			set({
				searchLoading: true,
			});

			const res = await axios.get(
				`/products/search?query=${query}`
			);

			set({
				searchResults: res.data.products,
				searchLoading: false,
			});
		} catch (error) {
			console.log(error);

			set({
				searchResults: [],
				searchLoading: false,
			});
		}
	},

	clearSearch: () =>
		set({
			searchResults: [],
		}),
}));
