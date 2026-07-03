import { useEffect } from "react";
import { Trash2, Star } from "lucide-react";
import { useReviewStore } from "../stores/useReviewStore";
import { useThemeStore } from "../stores/useThemeStore";

const ReviewsList = () => {
	const {
		reviews,
		fetchReviews,
		deleteReview,
		loading,
	} = useReviewStore();

	const { darkMode } = useThemeStore();

	useEffect(() => {
		fetchReviews();
	}, []);

	if (loading) {
		return (
			<p
				className={`text-center text-xl font-semibold mt-8 ${
					darkMode ? "text-white" : "text-purple-700"
				}`}
			>
				Loading reviews...
			</p>
		);
	}

	if (reviews.length === 0) {
		return (
			<p
				className={`text-center text-xl font-semibold mt-8 ${
					darkMode ? "text-white" : "text-purple-700"
				}`}
			>
				No reviews published yet.
			</p>
		);
	}

	return (
		<div
			className={`mt-10 rounded-3xl p-6 shadow-xl transition-all ${
				darkMode
					? "border border-fuchsia-700"
					: "border border-purple-200"
			}`}
			style={{
				background: darkMode
					? "linear-gradient(135deg,#18111f,#3b0b39)"
					: "#ffffff",
			}}
		>
			<h2
				className={`text-2xl font-bold mb-6 ${
					darkMode ? "text-white" : "text-purple-700"
				}`}
			>
				Published Reviews
			</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{reviews.map((review) => (
					<div
						key={review._id}
						className={`rounded-3xl overflow-hidden shadow-lg transition ${
							darkMode
								? "bg-[#18111f] border border-fuchsia-700"
								: "bg-white border border-purple-200"
						}`}
					>
						<img
							src={review.image}
							alt={review.customerName}
							className="w-full h-60 object-cover"
						/>

						<div className="p-5">
							<div className="flex items-center gap-2 mb-3">
								<Star
									size={18}
									className={
										darkMode
											? "text-pink-400"
											: "text-purple-600"
									}
								/>

								<h3
									className={`font-bold text-lg ${
										darkMode
											? "text-white"
											: "text-purple-700"
									}`}
								>
									{review.customerName}
								</h3>
							</div>

							<p
								className={`text-sm leading-6 mb-5 ${
									darkMode
										? "text-gray-300"
										: "text-gray-700"
								}`}
							>
								{review.caption || "No caption"}
							</p>

							<button
								onClick={() =>
									deleteReview(review._id)
								}
								className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 font-semibold transition ${
									darkMode
										? "border border-red-500 text-red-400 hover:bg-red-600 hover:text-white"
										: "border border-red-300 text-red-500 hover:bg-red-500 hover:text-white"
								}`}
							>
								<Trash2 size={18} />
								Delete Review
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ReviewsList;