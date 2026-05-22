import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
	{
		href: "/necklaces",
		name: "Necklaces",
		imageUrl: "/necklace.jpeg",
	},
	{
		href: "/bracelets",
		name: "Bracelets",
		imageUrl: "/bracelets.jpeg",
	},
	{
		href: "/keychains",
		name: "keychains",
		imageUrl: "/keychain.jpeg",
	},
	{
		href: "/candles",
		name: "Candles",
		imageUrl: "/candles.jpeg",
	},
	{
		href: "/hoodies",
		name: "BTS Wear",
		imageUrl: "/hoodie.jpeg",
	},
	{
		href: "/photocards",
		name: "Photocards",
		imageUrl: "/photocard.jpeg",
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
			
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				
				<div className='text-center mb-14'>
					<h1 className='logo-font text-6xl sm:text-7xl text-purple-700 mb-5 drop-shadow-sm'>
						Lovlit
					</h1>

					<h2 className='text-4xl sm:text-5xl font-bold text-black mb-4'>
						Explore Our Collection
					</h2>

					<p className='text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed'>
						BTS inspired jewelry, aesthetic gifts,
						purple collections, candles, hoodies,
						and handmade accessories crafted with love 💜
					</p>
				</div>

				
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
					{categories.map((category) => (
						<CategoryItem
							category={category}
							key={category.name}
						/>
					))}
				</div>

				
				{!isLoading && products.length > 0 && (
					<div className='mt-24'>
						<FeaturedProducts
							featuredProducts={products}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default HomePage;