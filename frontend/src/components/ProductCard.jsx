import toast from "react-hot-toast";
import { ShoppingCart, Heart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", {
				id: "login",
			});
			return;
		}

		addToCart(product);
	};

	const handleBuyNow = () => {
		if (!user) {
			toast.error("Please login first 💜");
			return;
		}

		addToCart(product);

		window.open(
			"https://wa.me/919876543210?text=Hello! I want to buy this product: " +
			product.name,
			"_blank"
		);
	};

	return (
		<div className='flex w-full relative flex-col overflow-hidden rounded-3xl bg-white border border-purple-200 shadow-lg hover:shadow-2xl transition-all duration-300'>
			<Link to={`/product/${product._id}`} className='relative mx-3 mt-3 flex h-72 overflow-hidden rounded-2xl'>
				<div className='relative mx-3 mt-3 flex h-72 overflow-hidden rounded-2xl'>
					{product.stock <= 0 && (
						<div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
							SOLD OUT
						</div>
					)}
					<img
						className='object-cover w-full transition-transform duration-500 hover:scale-105'
						src={product.image}
						alt='product image'
					/>

					<div className='absolute inset-0 bg-black/10' />

					<div className='absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow-md'>
						<Heart className='w-5 h-5 text-purple-600' />
					</div>
				</div>
			</Link>
			<div className='mt-4 px-5 pb-5 flex flex-col flex-grow'>

				<h5 className='text-2xl font-bold tracking-tight text-purple-700 capitalize mb-2'>
					{product.name}
				</h5>

				<p className='text-gray-600 text-sm mb-4 line-clamp-2'>
					{product.description}
				</p>

				<div className='mt-auto mb-5 flex items-center justify-between'>
					<p>
						<span className='text-3xl font-bold text-pink-500'>
							₹{product.price}
						</span>
					</p>
				</div>

				<div className='flex flex-col gap-3'>
					<button
						disabled={product.stock <= 0}
						className={`w-full py-3 rounded-xl font-semibold ${product.stock <= 0
								? "bg-gray-400 cursor-not-allowed"
								: "bg-purple-600 hover:bg-purple-700 text-white"
							}`}
					>
						{product.stock <= 0 ? "Sold Out" : "Add To Cart"}
					</button>

					<button
						className='flex items-center justify-center rounded-xl border border-purple-600 bg-white px-5 py-3 text-center text-sm font-semibold text-purple-700 hover:bg-purple-50 transition-all duration-300'
						onClick={handleBuyNow}
					>
						💜 Buy Now
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;