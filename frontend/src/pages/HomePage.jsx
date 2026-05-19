import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

// const categories = [
// 	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
// 	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
// 	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
// 	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
// 	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
// 	{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
// 	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
// ];
const categories = [
	{ href: "/bracelets", name: "Bracelets", imageUrl: "/bracelets.jpeg" },
	{ href: "/necklaces", name: "Necklaces", imageUrl: "/necklace.jpeg" },
	{ href: "/photocards", name: "Photocards", imageUrl: "/photocard.jpeg" },
	{ href: "/candles", name: "Candles", imageUrl: "/candles.jpeg" },
	{ href: "/hoodies", name: "Hoodies", imageUrl: "/hoodie.jpeg" },
	{ href: "/keychains", name: "Keychains", imageUrl: "/keychain.jpeg" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='relative min-h-screen  text-black overflow-hidden bg-gradient-to-r from-purple-200 via-white to-pink-100'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='logo-font text-center text-8xl text-purple-700 mb-4'>
					Lovlit
				</h1>
				<p className='text-center text-3xl text-white-600 mb-12'>
					Handmade BTS inspired jewelry, candles, accessories & aesthetic collectibles
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
			</div>
		</div>
	);
};
export default HomePage;
