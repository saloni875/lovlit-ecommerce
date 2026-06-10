import { Minus, Plus, Trash, Heart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
	
	const { removeFromCart, updateQuantity } = useCartStore();
	console.log("CartItem received item:", item);
	console.log(item);
	return (
		<div className='rounded-3xl border border-purple-200 bg-white shadow-lg p-5 md:p-6 hover:shadow-2xl transition-all duration-300'>
			<div className='space-y-5 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>

				<div className='shrink-0 md:order-1 relative'>
					<img
						className='h-28 w-28 md:h-36 md:w-36 rounded-2xl object-cover border border-purple-200 shadow-md'
						src={item.image}
						alt={item.name}
					/>

					<div className='absolute top-2 right-2 bg-white/80 p-2 rounded-full shadow'>
						<Heart className='w-4 h-4 text-purple-600 fill-pink-200' />
					</div>
				</div>


				<div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md'>

					<p className='text-2xl font-bold text-purple-700 capitalize'>
						{item.name}
					</p>

					{item.optionType === "Color" && (
						<p className='text-sm text-purple-600 font-medium'>
							Color: {item.selectedOption}
						</p>
					)}

					{item.optionType === "Scent" && (
						<p className='text-sm text-purple-600 font-medium'>
							Scent: {item.selectedOption}
						</p>
					)}

					{item.optionType === "Size" && (
						<p className='text-sm text-purple-600 font-medium'>
							Size: {item.selectedOption}
						</p>
					)}

					{item.customText && (
						<p className='text-sm text-pink-500 font-medium'>
							Custom Name: {item.customText}
						</p>
					)}

					<p className='text-gray-500 leading-relaxed'>
						{item.description}
					</p>

					<div className='flex items-center gap-4'>
						<button
							className='inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-700 transition duration-300'
							onClick={() => removeFromCart(item._id)}
						>
							<Trash className='w-5 h-5' />
							Remove
						</button>
					</div>
				</div>


				<div className='flex items-center justify-between md:order-3 md:justify-end gap-6'>

					<div className='flex items-center gap-3 bg-purple-50 px-4 py-2 rounded-2xl border border-purple-200'>
						<button
							className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white border border-purple-300 hover:bg-purple-100 transition duration-300'
							onClick={() =>
								updateQuantity(item._id, item.quantity - 1)
							}
						>
							<Minus className='text-purple-700 w-4 h-4' />
						</button>

						<p className='text-lg font-bold text-purple-700'>
							{item.quantity}
						</p>

						<button
							className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white border border-purple-300 hover:bg-purple-100 transition duration-300'
							onClick={() =>
								updateQuantity(item._id, item.quantity + 1)
							}
						>
							<Plus className='text-purple-700 w-4 h-4' />
						</button>
					</div>


					<div className='text-end md:w-32'>
						<p className='text-2xl font-bold text-pink-500'>
							₹{item.price}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItem;