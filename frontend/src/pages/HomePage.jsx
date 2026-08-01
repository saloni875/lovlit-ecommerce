import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { Link } from "react-router-dom";
import AnnouncementBanner from "../components/AnnouncementBanner";
import { useThemeStore } from "../stores/useThemeStore";
import ReviewsSection from "../components/ReviewsSection";
import FAQSection from "../components/FQASection";
import { Helmet } from "react-helmet-async";

const categories = [
	{
		href: "jewelry",
		name: "Jewelry",
		imageUrl: "/jwerly2.jpeg",
	},
	{
		href: "phone-charms",
		name: "Phone Charms",
		imageUrl: "/phonecharm1.png",
	},
	{
		href: "army-zone",
		name: "Fan Zone",
		imageUrl: "/fan-zone.jpeg",
	},
	{
		href: "candles",
		name: "Candles",
		imageUrl: "/candles.jpeg",
	},
	{
		href: "gifts-bouquets",
		name: "Gifts & Bouquets",
		imageUrl: "/gift&bouqutes.png",
	},
	{
		href: "trinkets-more",
		name: "Trinkets & More",
		imageUrl: "/trinklets and more.jpeg",
	},
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, loading } =
		useProductStore();


	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);
	const { darkMode } = useThemeStore();

	return (

		<>

			<Helmet>
				<title>Lovlit | Handmade Jewelry & Aesthetic Gifts</title>

				<meta
					name="description"
					content="Lovlit offers handmade jewelry, BTS-inspired gifts, candles, bouquets, phone charms, and aesthetic accessories."
				/>

				<meta
					name="keywords"
					content="handmade jewelry, BTS gifts, aesthetic gifts, candles, phone charms"
				/>
			</Helmet>
			<div
				className='relative min-h-screen'
				style={{
					background: darkMode
						? "linear-gradient(135deg, #10070d, #440840)"
						: "linear-gradient(to right, rgb(233 213 255), white, rgb(251 207 232))",
				}}
			>

				<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
					<AnnouncementBanner />
					<div className='text-center mb-4 px-4'>
						<h1 className='logo-font text-4xl sm:text-7xl text-purple-700  drop-shadow-sm'>
							Lovlit
						</h1>
						<p
							className='text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed'
							style={{
								color: darkMode ? "#d8cde0" : "#374151",
							}}
						>
							Handmade aesthetic jewelry...
						</p>

					</div>

					{!loading && products.length > 0 && (
						<div className='mt-4'>
							<FeaturedProducts
								featuredProducts={products}
							/>
						</div>
					)}
					<div className='text-center mt-8 mb-8 px-4'>
						<h2
							className='text-3xl sm:text-5xl font-bold mb-3'
							style={{
								color: darkMode ? "#ffffff" : "#000000",
							}}
						>
							Explore Our Collection
						</h2>

						<p
							className='text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed'
							style={{
								color: darkMode ? "#d8cde0" : "#374151",
							}}
						>
							BTS inspired jewelry, aesthetic gifts,
							, candles, rings, keychains,
							and handmade accessories crafted with love 💜
						</p>
					</div>

					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6'>
						{categories.map((category) => (
							<CategoryItem
								category={category}
								key={category.name}
							/>
						))}
					</div>

					<div className='max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 ' >

						<div
							className='relative overflow-hidden rounded-[3rem] backdrop-blur-md shadow-2xl p-6 sm:p-8 md:p-12'
							// style={{
							// 	background: darkMode
							// 		? "#440840"
							// 		: "linear-gradient(135deg, #10070d, #440840)",
							// 	border: darkMode
							// 		? "1px solid #4b1d5c"
							// 		: "1px solid #e9d5ff",
							// }}
							style={{
								background: darkMode
									? "linear-gradient(135deg, #10070d, #440840)"
									: "linear-gradient(to right, rgb(233 213 255), white, rgb(251 207 232))",
								border: darkMode
									? "1px solid #4b1d5c"
									: "1px solid #e9d5ff",
							}}
						>

							<div className='absolute -top-20 -right-20 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-40' />

							<div className='absolute -bottom-20 -left-20 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-40 ' />

							<div className='relative z-10 text-center max-w-5xl mx-auto '>

								<p className='text-sm uppercase tracking-[0.3em] text-pink-500 mb-5' style={{
									color: darkMode ? "#e82b93" : "#000000",
								}}>
									Lovlit Custom Requests
								</p>

								<h2
									className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6'
									style={{
										color: darkMode ? "#ffffff" : "#000000",
									}}
								>
									Have a custom idea in mind?{" "}
									<span className='text-purple-700'>
										💜
									</span>
								</h2>

								<p
									className='text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto'
									style={{
										color: darkMode ? "#d8cde0" : "#374151",
									}}
								>
									Want a personalized keychain,
									custom BTS inspired product,
									aesthetic jewelry,
									or a special handmade gift idea?

									Lovlit would love to hear your vision
									and possibly bring it to life.
								</p>

								<Link
									to='/ideas'
									className='inline-flex items-center justify-center rounded-2xl bg-purple-600 px-8  py-3 text-lg font-semibold text-white shadow-lg hover:bg-pink-400 transition duration-300'
									style={{
										background: darkMode
											? "linear-gradient(135deg, #0c090f, #660c5e)"
											: "",
										color: darkMode ? "#ffffff" : "",
										border: darkMode ? "1px solid #c646b3" : "1px solid #e9d5ff",
									}}
									onMouseEnter={(e) => {
										if (darkMode) {
											e.currentTarget.style.background = "#e100ff";
											e.currentTarget.style.color = "#000000";
										}
									}}
									onMouseLeave={(e) => {
										if (darkMode) {
											e.currentTarget.style.background =
												"linear-gradient(135deg, #0c090f, #660c5e)";
											e.currentTarget.style.color = "#ffffff";
										}
									}}
								>
									Share Your Idea
								</Link>

							</div>
						</div>
					</div>


				</div>
				<ReviewsSection />
				<FAQSection />
			</div >
		</>
	);
};

export default HomePage;