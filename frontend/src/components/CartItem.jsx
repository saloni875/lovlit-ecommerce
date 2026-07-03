import { Minus, Plus, Trash, Heart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { useThemeStore } from "../stores/useThemeStore";

const CartItem = ({ item }) => {
	const { darkMode } = useThemeStore();
	const { removeFromCart, updateQuantity } = useCartStore();
	console.log("CartItem received item:", item);
	console.log(item);
	return (
		<>
			< div className="block md:hidden" >
				<div
					className={`rounded-3xl p-4 ${darkMode
						? "border border-fuchsia-700"
						: "border border-purple-200"
						}`}
					style={{
						background: darkMode
							? "linear-gradient(135deg,#18111f,#3b0b39)"
							: "#ffffff",
					}}
				>
					<div className="flex gap-4">

						<div className="relative shrink-0">
							<img
								src={item.image}
								alt={item.name}
								className="h-28 w-28 rounded-2xl object-cover"
							/>

							<div
								className={`absolute top-2 right-2 rounded-full p-1.5 ${darkMode
									? "bg-[#18111f]"
									: "bg-white"
									}`}
							>
								<Heart className="w-4 h-4 text-pink-500" />
							</div>
						</div>

						<div className="flex flex-1 flex-col">

							<h3
								className={`font-bold text-lg leading-tight line-clamp-2 ${darkMode
									? "text-white"
									: "text-purple-700"
									}`}
							>
								{item.name}
							</h3>
							<p className={` text-sm ${darkMode ? "text-gray-300" : "text-gray-500"} leading-relaxed`}>
								{item.description}
							</p>

							{item.selectedOption && (
								<p
									className={`mt-1 text-sm ${darkMode
										? "text-pink-400"
										: "text-purple-600"
										}`}
								>
									{item.optionType}: {item.selectedOption}
								</p>
							)}

							{item.customText && (
								<p className="text-sm text-pink-500">
									{item.customText}
								</p>
							)}

							<p className="mt-2 text-2xl font-bold text-pink-500">
								₹{item.price}
							</p>

						</div>
					</div>

					<div className="mt-4 flex items-center justify-between">

						<div
							className={`flex items-center gap-3 rounded-xl px-3 py-2 ${darkMode
								? "bg-[#18111f] border border-fuchsia-700"
								: "bg-purple-50 border border-purple-200"
								}`}
						>
							<button
								onClick={() =>
									updateQuantity(item._id, item.quantity - 1)
								}
								className="flex h-8 w-8 items-center justify-center rounded-full border"
							>
								<Minus className="w-4 h-4" />
							</button>

							<span
								className={`font-bold ${darkMode
									? "text-white"
									: "text-purple-700"
									}`}
							>
								{item.quantity}
							</span>

							<button
								onClick={() =>
									updateQuantity(item._id, item.quantity + 1)
								}
								className="flex h-8 w-8 items-center justify-center rounded-full border"
							>
								<Plus className="w-4 h-4" />
							</button>
						</div>

						<button
							onClick={() => removeFromCart(item._id)}
							className="flex items-center gap-2 text-red-500 font-medium"
						>
							<Trash className="w-5 h-5" />
							Remove
						</button>

					</div>
				</div>
			</div>
			{/* for desktop */}
			<div
				className={`hidden md:block rounded-3xl shadow-lg p-5 md:p-6 hover:shadow-2xl transition-all duration-300 ${darkMode
					? "border border-fuchsia-700"
					: "border border-purple-200"
					}`}
				style={{
					background: darkMode
						? "linear-gradient(135deg,#18111f,#3b0b39)"
						: "#ffffff",
				}}
			>
				<div className='space-y-5 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>

					<div className='shrink-0 md:order-1 relative'>
						<img
							className={`h-32 w-32 sm:h-36 sm:w-36 rounded-2xl object-cover border shadow-md ${darkMode
								? "border-fuchsia-700"
								: "border-purple-200"
								}`}
							src={item.image}
							alt={item.name}
						/>

						<div className={`absolute top-2 right-2 ${darkMode ? "bg-[#18111f]" : "bg-white/80"} p-2 rounded-full shadow`}>
							<Heart className='w-4 h-4 text-purple-600 fill-pink-200' />
						</div>
					</div>


					<div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md'>

						<p className={`text-xl sm:text-2xl font-bold capitalize leading-tight line-clamp-2 ${darkMode ? "text-white" : "text-purple-700"
							}`}>
							{item.name}
						</p>

						{item.optionType === "Color" && (
							<p className={`text-sm ${darkMode ? "text-pink-400" : "text-purple-600"} font-medium`}>
								Color: {item.selectedOption}
							</p>
						)}

						{item.optionType === "Scent" && (
							<p className={`text-sm ${darkMode ? "text-pink-400" : "text-purple-600"} font-medium`}>
								Scent: {item.selectedOption}
							</p>
						)}

						{item.optionType === "Size" && (
							<p className={`text-sm ${darkMode ? "text-pink-400" : "text-purple-600"} font-medium`}>
								Size: {item.selectedOption}
							</p>
						)}

						{item.customText && (
							<p className='text-sm text-pink-500 font-medium'>
								Custom Name: {item.customText}
							</p>
						)}

						<p className={` text-sm ${darkMode ? "text-gray-300" : "text-gray-500"} leading-relaxed`}>
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

						<div className={`px-4 py-2 rounded-2xl border flex items-center gap-3 ${darkMode
							? "bg-[#18111f] border-fuchsia-700"
							: "bg-purple-50 border-purple-200"
							}`}>
							<button
								className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition duration-300 ${darkMode
									? "bg-[#2b1833] border-fuchsia-700 hover:bg-fuchsia-700"
									: "bg-white border-purple-300 hover:bg-purple-100"
									}`}
								onClick={() =>
									updateQuantity(item._id, item.quantity - 1)
								}
							>
								<Minus className={`w-4 h-4 ${darkMode ? "text-white" : "text-purple-700"
									}`} />
							</button>

							<p className={`text-lg font-bold ${darkMode ? "text-white" : "text-purple-700"
								}`}>
								{item.quantity}
							</p>

							<button
								className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition duration-300 ${darkMode
									? "bg-[#2b1833] border-fuchsia-700 hover:bg-fuchsia-700"
									: "bg-white border-purple-300 hover:bg-purple-100"
									}`}
								onClick={() =>
									updateQuantity(item._id, item.quantity + 1)
								}
							>
								<Plus className={`w-4 h-4 ${darkMode ? "text-white" : "text-purple-700"
									}`} />
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
		</>

	);
};

export default CartItem;