import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import { Heart } from "lucide-react";
import { useThemeStore } from "../stores/useThemeStore";

const PeopleAlsoBought = () => {
	const { darkMode } = useThemeStore();
	const [recommendations, setRecommendations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchRecommendations = async () => {
			try {
				const res = await axios.get("/products/recommendations");
				setRecommendations(res.data);
			} catch (error) {
				toast.error(
					error.response?.data?.message ||
					"Error fetching recommendations"
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchRecommendations();
	}, []);

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className='mt-14'>
			<div className="text-center mb-8">

				<div
					className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 ${darkMode
							? "bg-[#18111f] border border-fuchsia-700"
							: "bg-purple-100"
						}`}
				>
					<Heart
						className={`w-7 h-7 ${darkMode
								? "text-pink-400"
								: "text-purple-600"
							}`}
					/>
				</div>

				<h2
					className={`text-xl sm:text-3xl font-bold ${darkMode
							? "text-white"
							: "text-black"
						}`}
				>
					You may also like
				</h2>

				<p
					className={`mt-2 text-sm ${darkMode
							? "text-gray-400"
							: "text-gray-500"
						}`}
				>
					Discover more handmade favourites.
				</p>


			</div>

			<div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
				{recommendations.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</div>
	);
};

export default PeopleAlsoBought;







