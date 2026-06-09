import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { Link } from "react-router-dom";

const categories = [
	{
		href: "necklaces",
		name: "Necklaces",
		imageUrl: "/necklace.jpeg",
	},
	{
		href: "bracelets",
		name: "Bracelets",
		imageUrl: "/bracelets.jpeg",
	},
	{
		href: "bodychains",
		name: "Body Chains",
		imageUrl: "/bodychain.jpeg",
	},
	{
		href: "scrunchies",
		name: "Scrunchies",
		imageUrl: "/scrunchie.jpeg",
	},
	{
		href: "phonecharms",
		name: "Phone Charms",
		imageUrl: "/phonecharm.jpeg",
	},
	{
		href: "candles",
		name: "Candles",
		imageUrl: "/candles.jpeg",
	},
	{
		href: "photocards",
		name: "Photocards",
		imageUrl: "/photocard1.jpeg",
	},
	{
		href: "actionfigures",
		name: "Action Figures",
		imageUrl: "/actionfigure.jpeg",
	},
	{
		href: "chocolatebouquets",
		name: "Chocolate Bouquets",
		imageUrl: "/chocolatebouquet1.jpeg",
	},
	{
		href: "gifthampers",
		name: "Gift Hampers",
		imageUrl: "/gifthamper.jpeg",
	},
	{
		href: "specialboxes",
		name: "Special Occasion Boxes",
		imageUrl: "/specialbox.jpeg",
	},
	{
		href: "scoops",
		name: "Mystery Scoops",
		imageUrl: "/scoops1.jpeg",
	},
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } =
		useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='relative min-h-screen bg-gradient-to-r from-purple-200 via-white to-pink-100 '>

			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>

				<div className='text-center mb-10'>
					<h1 className='logo-font text-6xl sm:text-7xl text-purple-700  drop-shadow-sm'>
						Lovlit
					</h1>
					<p className='text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed'> Handmade aesthetic jewelry... </p>

				</div>

				{!isLoading && products.length > 0 && (
					<div className='mt-24'>
						<FeaturedProducts
							featuredProducts={products}
						/>
					</div>
				)}
				<div className='text-center mb-14'>
					<h2 className='text-4xl sm:text-5xl font-bold text-black mb-4'>
						Explore Our Collection
					</h2>

					<p className='text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed'>
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

					<div className='relative overflow-hidden rounded-[3rem] border border-purple-200 bg-gradient-to-r from-purple-200 via-white to-pink-100  backdrop-blur-md shadow-2xl p-6 sm:p-8 md:p-12'>

						<div className='absolute -top-20 -right-20 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-40' />

						<div className='absolute -bottom-20 -left-20 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-40 ' />

						<div className='relative z-10 text-center max-w-5xl mx-auto '>

							<p className='text-sm uppercase tracking-[0.3em] text-pink-500 mb-5'>
								Lovlit Custom Requests
							</p>

							<h2 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-black mb-6 '>
								Have a custom idea in mind?{" "}
								<span className='text-purple-700'>
									💜
								</span>
							</h2>

							<p className='text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto'>
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
							>
								Share Your Idea
							</Link>
						</div>
					</div>
				</div>


			</div>
		</div>
	);
};

export default HomePage;