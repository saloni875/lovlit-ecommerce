import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";

import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";
import { useThemeStore } from "../stores/useThemeStore";
import { Helmet } from "react-helmet-async";

const CartPage = () => {
	const { cart } = useCartStore();
	const { darkMode } = useThemeStore();

	return (
		<>


			<Helmet>
				<title>Shopping Cart | Lovlit</title>

				<meta
					name="description"
					content="Review the items in your Lovlit shopping cart before proceeding to secure checkout."
				/>
			</Helmet>
			<div
				className="min-h-screen py-10 md:py-16 transition-all duration-300"
				style={{
					background: darkMode
						? "linear-gradient(135deg,#0c090f,#660c5e)"
						: "linear-gradient(to bottom right,#ede9fe,#ffffff,#fce7f3)",
				}}
			>
				<div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>

					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className='text-center mb-12'
					>
						<h1
							className={`logo-font text-6xl mb-3 ${darkMode ? "text-pink-500" : "text-purple-700"
								}`}
						>
							Lovlit
						</h1>

						<h2
							className={`text-4xl font-bold ${darkMode ? "text-white" : "text-purple-700"
								}`}
						>
							Your Shopping Cart
						</h2>

						<p
							className={`mt-3 text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
						>						Your favorite BTS inspired collection 💜
						</p>
					</motion.div>


					<div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>

						<motion.div
							className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							{cart.length === 0 ? (
								<EmptyCartUI />
							) : (
								<div className='space-y-6'>
									{cart.map((item) => (
										<CartItem
											key={`${item._id}-${item.customText}-${item.selectedOption}`}
											item={item}
										/>
									))}
								</div>
							)}


						</motion.div>


						{cart.length > 0 && (
							<motion.div
								className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.4 }}
							>

								<OrderSummary />
								<GiftCouponCard />
							</motion.div>

						)}

					</div>{cart.length > 0 && <PeopleAlsoBought />}
				</div>
			</div>
		</>
	);
};

export default CartPage;

const EmptyCartUI = () => {
	const { darkMode } = useThemeStore();

	return (	
		<motion.div
			className={`flex flex-col items-center justify-center space-y-5 py-20 rounded-3xl shadow-xl transition-all duration-300 ${darkMode
				? "border border-fuchsia-700"
				: "border border-purple-200"
				}`}
			style={{
				background: darkMode
					? "linear-gradient(135deg,#18111f,#3b0b39)"
					: "#ffffff",
			}}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div
				className={`p-6 rounded-full ${darkMode ? "bg-[#18111f]" : "bg-purple-100"
					}`}
			>
				<ShoppingCart
					className={`h-20 w-20 ${darkMode ? "text-pink-400" : "text-purple-600"
						}`}
				/>
			</div>

			<h3 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-purple-700"}`}>
				Your cart is empty
			</h3>

			<p className={`text-gray-500 text-center max-w-md ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
				Looks like you haven&apos;t added anything to your cart yet.
				Start exploring beautiful BTS inspired accessories and gifts 💜
			</p>

			<Link
				className="mt-4 rounded-2xl px-8 py-3 font-semibold shadow-md transition-all duration-300 hover:scale-105 flex items-center gap-2"
				style={{
					background: darkMode
						? "linear-gradient(135deg,#0c090f,#660c5e)"
						: "#9333ea",
					color: "#fff",
					border: darkMode
						? "1px solid #f209e2"
						: "1px solid #9333ea",
				}}
				to='/'
			>
				<Heart className='w-5 h-5' />
				Start Shopping
			</Link>
		</motion.div>
	);
};