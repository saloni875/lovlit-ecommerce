import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useThemeStore } from "../stores/useThemeStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
	const { fetchProductsByCategory, products, loading } = useProductStore();
	const { darkMode } = useThemeStore();

	const { category } = useParams();

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});

		fetchProductsByCategory(category);
	}, [fetchProductsByCategory, category]);

	return (
		<div
			className="min-h-screen transition-all duration-300"
			style={{
				background: darkMode
					? "linear-gradient(135deg,#0c090f,#660c5e)"
					: "",
			}}
		>
			<div className="relative z-10 max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8 py-14">

				<motion.h1
					className={`text-center text-4xl sm:text-5xl font-bold mb-8 ${darkMode ? "text-white" : "text-purple-600"
						}`}
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{category.charAt(0).toUpperCase() + category.slice(1)}
				</motion.h1>

				{loading && (
					<div className="text-center py-20">
						<h2 className="text-2xl font-semibold text-purple-600">
							Loading products...
						</h2>
					</div>
				)}{loading && (
					<div className="text-center py-20">
						<h2 className="text-2xl font-semibold text-purple-600">
							Loading products...
						</h2>
					</div>
				)}

				{!loading && (<motion.div
					className="explore-grid grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 justify-items-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{products?.length === 0 && (
						<h2
							className={`text-3xl font-semibold text-center col-span-full ${darkMode ? "text-white" : "text-purple-700"
								}`}
						>
							No products found, we will be adding more soon!
							Stay tuned for updates and new arrivals in this category.
						</h2>
					)}

					{products?.map((product) => (
						<div key={product._id} className="w-full">
							<ProductCard

								product={product}
							/>
						</div>
					))}
				</motion.div>
				)}

			</div>
		</div>
	);
};

export default CategoryPage;