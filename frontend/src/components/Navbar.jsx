import {
	Menu,
	X,
	ShoppingCart,
	UserPlus,
	LogIn,
	LogOut,
	Lock,
	Heart,
	Home, Sun, Moon,
	LayoutGrid, Search,
} from "lucide-react";
import { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";

import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useThemeStore } from "../stores/useThemeStore";
import SearchBar from "./SearchBar";



const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();
	const { darkMode, toggleTheme } = useThemeStore();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();
	const [showCollectionDrawer, setShowCollectionDrawer] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("theme") === "dark") {
			document.body.classList.add("dark-mode");
		}
	}, []);

	return (
		<>
			<header
				className='fixed top-0 left-0 w-full backdrop-blur-md shadow-md z-40 transition-all duration-300'
				style={{
					background: darkMode
						? "linear-gradient(135deg, #0c090f, #660c5e)"
						: "linear-gradient(to right, rgb(216 180 254), white, rgb(251 207 232))",
					borderBottom: darkMode
						? "1px solid #7a1b6d"
						: "1px solid #e9d5ff",
				}}
			>
				<div className='container mx-auto px-3 sm:px-6 py-3 sm:py-4'>
					<div className=' flex justify-between items-center'>

						<Link
							to='/'
							className='flex items-center'
						>
							<img
								src='/logo.png'
								alt='Lovlit'
								className='h-14 md:h-16 w-auto'
							/>
						</Link>
						{/* searchbar */}
						<div className="hidden md:flex flex-1 justify-center px-6">
							<div className="w-full max-w-lg">
								<SearchBar />
							</div>
						</div>


						<div className="flex items-center gap-2 md:hidden">

							{/* Mobile Search */}
							<button
								className="md:hidden"
								onClick={() => setMobileSearchOpen(true)}
							>
								<Search size={22} />
							</button>

							<button
								onClick={toggleTheme}
								className="p-1 rounded-full"
								style={{
									background: darkMode
										? "linear-gradient(135deg, #0c090f, #660c5e)"
										: "#9333ea",
									color: "#ffffff",
									border: darkMode
										? "1px solid #c646b3"
										: "1px solid #e9d5ff",
								}}
							>
								{darkMode ? (
									<Sun size={18} />
								) : (
									<Moon size={18} />
								)}
							</button>

							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								style={{
									color: darkMode ? "#ffffff" : "#6b21a8",
								}}
							>
								{isMenuOpen ? <X size={28} /> : <Menu size={28} />}
							</button>

						</div>

						<nav className='hidden md:flex flex-wrap items-center gap-4 '>


							<Link
								to={"/"}
								className='text-purple-700 text-base sm:text-xl font-semibold hover:text-pink-500 transition duration-300 ease-in-out'
								style={{
									color: darkMode ? "#ffffff" : "#6b21a8",
								}}
							>
								Home
							</Link>

							<Link to={"/about"} className='hidden sm:block text-purple-700 text-base sm:text-xl font-semibold hover:text-pink-500 transition duration-300'
								style={{
									color: darkMode ? "#ffffff" : "#6b21a8",
								}}>
								About
							</Link>

							<Link to={"/contact"} className='hidden sm:block text-purple-700 text-base sm:text-xl font-semibold hover:text-pink-500 transition duration-300'
								style={{
									color: darkMode ? "#ffffff" : "#6b21a8",
								}}>
								Contact
							</Link>

							{user ? (
								<Link
									to="/wishlist"
									className={`flex flex-col items-center ${location.pathname === "/wishlist"
										? "text-purple-500"
										: darkMode
											? "text-white"
											: "text-gray-600"
										}`}
								>
									<Heart size={22} />

								</Link>
							) : (
								<Link
									to="/login"
									className={`flex flex-col items-center ${darkMode ? "text-white" : "text-gray-600"
										}`}
								>
									<Heart size={22} />

								</Link>
							)}



							{user && (
								<Link
									to={"/cart"}
									className='relative group flex items-center text-purple-700 font-medium hover:text-pink-500 transition duration-300 ease-in-out' style={{
										color: darkMode ? "#ffffff" : "#6b21a8",
									}}
								>
									<ShoppingCart
										className='inline-block mr-1'
										size={22}
									/>

									<span className='hidden sm:inline text-lg' style={{
										color: darkMode ? "#ffffff" : "#6b21a8",
									}}>
										Cart
									</span>

									{cart.length > 0 && (
										<span
											className='absolute -top-2 -left-2 bg-purple-600 text-white rounded-full px-2 py-0.5 text-xs shadow-md'
										>
											{cart.length}
										</span>
									)}
								</Link>
							)}


							<button
								onClick={() => {
									toggleTheme();
								}}
								className="p-2 rounded-full transition duration-300 ease-in-out"
								style={{
									background: darkMode
										? "linear-gradient(135deg, #0c090f, #660c5e)"
										: "#9333ea",
									color: "#ffffff",
									border: darkMode
										? "1px solid #c646b3"
										: "1px solid #e9d5ff",
								}}
								onMouseEnter={(e) => {
									if (darkMode) {
										e.currentTarget.style.background = "#e100ff";
										e.currentTarget.style.color = "#000000";
									} else {
										e.currentTarget.style.background = "#7e22ce";
									}
								}}
								onMouseLeave={(e) => {
									if (darkMode) {
										e.currentTarget.style.background =
											"linear-gradient(135deg, #0c090f, #660c5e)";
										e.currentTarget.style.color = "#ffffff";
									} else {
										e.currentTarget.style.background = "#9333ea";
										e.currentTarget.style.color = "#ffffff";
									}
								}}
							>
								{darkMode ? (
									<Sun className="w-5 h-5" />
								) : (
									<Moon className="w-5 h-5" />
								)}
							</button>

							{isAdmin && (
								// dashboard link for admin users
								<Link
									to={"/secret-dashboard"}
									className='px-3 sm:px-5 py-2 rounded-xl text-white font-semibold shadow-md transition duration-300 ease-in-out flex items-center'
									style={{
										background: darkMode
											? "linear-gradient(135deg, #0c090f, #660c5e)"
											: "#9333ea",
										border: darkMode
											? "1px solid #d322b8"
											: "1px solid #e5ddec",
									}}
									onMouseEnter={(e) => {
										if (darkMode) {
											e.currentTarget.style.background = "#e100ff";
											e.currentTarget.style.color = "#000000";
										} else {
											e.currentTarget.style.background = "#7e22ce";
										}
									}}
									onMouseLeave={(e) => {
										if (darkMode) {
											e.currentTarget.style.background =
												"linear-gradient(135deg, #0c090f, #660c5e)";
											e.currentTarget.style.color = "#ffffff";

										} else {
											e.currentTarget.style.background = "#9333ea";
											e.currentTarget.style.color = "#ffffff";
										}
									}}
								>
									<Lock className='inline-block mr-2' size={18} />

									<span className='hidden sm:inline'>
										Dashboard
									</span>
								</Link>
							)}


							{user ? (
								<button
									className='bg-black/80 text-white py-2 px-3 sm:px-5 ho rounded-xl flex items-center shadow-md transition duration-300 ease-in-out'
									style={{

										border: darkMode
											? "1px solid #c646b3"
											: "1px solid #e9d5ff",
									}}
									onMouseEnter={(e) => {
										if (darkMode) {
											e.currentTarget.style.background = "#e100ff";
											e.currentTarget.style.color = "#000000";
										}
									}}
									onMouseLeave={(e) => {
										if (darkMode) {
											e.currentTarget.style.background = "";
											e.currentTarget.style.color = "#ffffff";
										}
									}}
									onClick={logout}
								>
									<LogOut size={18} />

									<span className='hidden sm:inline ml-2 font-medium'>
										Log Out
									</span>
								</button>
							) : (
								<>
									{/* sign up button */}

									<Link
										to={"/signup"}
										className='text-white py-2 px-5 rounded-xl flex items-center shadow-md transition duration-300 ease-in-out font-medium'
										style={{
											background: darkMode
												? "linear-gradient(135deg, #0c090f, #660c5e)"
												: "#9333ea",
											border: darkMode
												? "1px solid #c646b3"
												: "1px solid #e9d5ff",
										}}
										onMouseEnter={(e) => {
											if (darkMode) {
												e.currentTarget.style.background = "#e100ff";
												e.currentTarget.style.color = "#000000";
											} else {
												e.currentTarget.style.background = "#7e22ce";
											}
										}}
										onMouseLeave={(e) => {
											if (darkMode) {
												e.currentTarget.style.background =
													"linear-gradient(135deg, #0c090f, #660c5e)";
												e.currentTarget.style.color = "#ffffff";
											} else {
												e.currentTarget.style.background = "#9333ea";
												e.currentTarget.style.color = "#ffffff";
											}
										}}
									>
										<UserPlus className='mr-2' size={18} />
										Sign Up
									</Link>

									{/* login button */}
									<Link
										to={"/login"}
										className='py-2 px-5 rounded-xl flex items-center shadow-md transition duration-300 ease-in-out font-medium'
										style={{
											background: darkMode
												? "linear-gradient(135deg, #0c090f, #660c5e)"
												: "#ffffff",
											color: darkMode ? "#ffffff" : "#6b21a8",
											border: darkMode
												? "1px solid #c646b3"
												: "1px solid #d8b4fe",
										}}
										onMouseEnter={(e) => {
											if (darkMode) {
												e.currentTarget.style.background = "#e100ff";
												e.currentTarget.style.color = "#000000";
											} else {
												e.currentTarget.style.background = "#f3e8ff";
											}
										}}
										onMouseLeave={(e) => {
											if (darkMode) {
												e.currentTarget.style.background =
													"linear-gradient(135deg, #0c090f, #660c5e)";
												e.currentTarget.style.color = "#ffffff";
											} else {
												e.currentTarget.style.background = "#ffffff";
												e.currentTarget.style.color = "#6b21a8";
											}
										}}
									>
										<LogIn className='mr-2' size={18} />
										Login
									</Link>
								</>
							)}

						</nav>

						{isMenuOpen && (
							<div className='md:hidden mt-4  flex flex-col gap-4 border-t border-purple-200 pt-4'>


								<Link
									to={"/"}
									className={`${darkMode ? "text-red-500" : "text-green-500"} text-base sm:text-xl font-semibold`}
									style={{
										color: darkMode ? "#ffffff" : "#6b21a8",
									}}
								>
									Home
								</Link>

								<Link
									to='/about'
									onClick={() => setIsMenuOpen(false)}
									className={`${darkMode ? "text-white" : "text-purple-700"} font-semibold`}
								>
									About
								</Link>

								<Link
									to='/contact'
									onClick={() => setIsMenuOpen(false)}
									className={`${darkMode ? "text-white" : "text-purple-700"} font-semibold`}
								>
									Contact
								</Link>

								{user && (
									<Link
										to='/cart'
										onClick={() => setIsMenuOpen(false)}
										className={`${darkMode ? "text-white" : "text-purple-700"} font-semibold`}
									>
										Cart
									</Link>
								)}

								{isAdmin && (
									<Link
										to='/secret-dashboard'
										onClick={() => setIsMenuOpen(false)}
										className='text-purple-700 font-semibold'
										style={{
											color: darkMode ? "#ffffff" : "#6b21a8",
										}}
									>
										Dashboard
									</Link>
								)}

								{user ? (
									<button
										onClick={logout}
										className='text-left text-purple-700 font-semibold'
										style={{
											color: darkMode ? "#ffffff" : "#6b21a8",
										}}
									>
										Log Out
									</button>
								) : (
									<>
										<Link
											to='/signup'
											className='text-purple-700 font-semibold'
											style={{
												color: darkMode ? "#ffffff" : "#6b21a8",
											}}
										>
											Sign Up
										</Link>

										<Link
											to='/login'
											className='text-purple-700 font-semibold'
											style={{
												color: darkMode ? "#ffffff" : "#6b21a8",
											}}
										>
											Login
										</Link>
									</>
								)}
							</div>
						)}
					</div>
				</div>
			</header>

			{/* Bottom Navigation - Mobile Only */}
			<div
				className="md:hidden fixed bottom-0 left-0 w-full z-50"
				style={{
					background: darkMode
						? "linear-gradient(135deg,#0c090f,#660c5e)"
						: "#ffffff",
					borderTop: darkMode
						? "1px solid #c646b3"
						: "1px solid #e5e7eb",
				}}
			>
				<div className="grid grid-cols-5 py-2">

					<Link
						to="/"
						className={`flex flex-col items-center ${location.pathname === "/"
							? "text-purple-500"
							: darkMode
								? "text-white"
								: "text-gray-600"
							}`}
					>
						<Home size={22} />
						<span className="text-xs mt-1">Home</span>
					</Link>

					<button
						type="button"
						onClick={() => setShowCollectionDrawer(true)}
						className={`flex flex-col items-center ${darkMode ? "text-white" : "text-gray-600"
							}`}
					>
						<LayoutGrid size={22} />
						<span className="text-xs mt-1">Collection</span>
					</button>

					{user ? (
						<Link
							to="/wishlist"
							className={`flex flex-col items-center ${location.pathname === "/wishlist"
									? "text-purple-500"
									: darkMode
										? "text-white"
										: "text-gray-600"
								}`}
						>
							<Heart size={22} />
							<span className="text-xs mt-1">Wishlist</span>
						</Link>
					) : (
						<Link
							to="/login"
							className={`flex flex-col items-center ${darkMode ? "text-white" : "text-gray-600"
								}`}
						>
							<Heart size={22} />
							<span className="text-xs mt-1">Wishlist</span>
						</Link>
					)}

					{user ? (
						<Link
							to="/cart"
							className={`relative flex flex-col items-center ${location.pathname === "/cart"
								? "text-purple-500"
								: darkMode
									? "text-white"
									: "text-gray-600"
								}`}
						>
							<ShoppingCart size={22} />

							{cart.length > 0 && (
								<span className="absolute -top-1 right-5 bg-pink-500 text-white text-[10px] px-1.5 rounded-full">
									{cart.length}
								</span>
							)}

							<span className="text-xs mt-1">Cart</span>
						</Link>
					) : (
						<Link
							to="/login"
							className={`flex flex-col items-center ${location.pathname === "/login"
								? "text-purple-500"
								: darkMode
									? "text-white"
									: "text-gray-600"
								}`}
						>
							<LogIn size={22} />
							<span className="text-xs mt-1">Login</span>
						</Link>
					)}

					

					<Link
						to="/about"
						className={`flex flex-col items-center ${location.pathname === "/about"
							? "text-purple-500"
							: darkMode
								? "text-white"
								: "text-gray-600"
							}`}
					>
						<UserPlus size={22} />
						<span className="text-xs mt-1">About</span>
					</Link>

				</div>
			</div>
			{showCollectionDrawer && (
				<div
					className="fixed inset-0 bg-black/40 z-[60]"
					onClick={() => setShowCollectionDrawer(false)}
				>
					<div
						onClick={(e) => e.stopPropagation()}
						className={`absolute bottom-20 left-3 right-3 rounded-3xl p-5 ${darkMode
							? "bg-[#18111f] border border-fuchsia-700"
							: "bg-white border border-purple-200"
							}`}
					>
						<h2 className="text-xl font-bold mb-4">Collections</h2>


						<div className="grid grid-cols-3 gap-2">
							<Link
								to="/category/necklaces"
								onClick={() => setShowCollectionDrawer(false)}
								className="rounded-xl border border-purple-300 py-3 text-xs font-medium text-center"
							>
								Necklaces
							</Link>
							<Link
								to="/category/bracelets"
								onClick={() => setShowCollectionDrawer(false)}
								className="rounded-xl border border-purple-300 py-3 text-xs font-medium text-center"
							>
								Bracelets
							</Link>

							<Link
								to="/category/body-chains"
								onClick={() => setShowCollectionDrawer(false)}
								className="rounded-xl border border-purple-300 py-3 text-xs font-medium text-center"
							>
								Body Chains
							</Link>

							<Link
								to="/category/photocards"
								onClick={() => setShowCollectionDrawer(false)}
								className="rounded-xl border border-purple-300 py-3 text-xs font-medium text-center"
							>
								Photocards
							</Link>

							<Link
								to="/category/candles"
								onClick={() => setShowCollectionDrawer(false)}
								className="rounded-xl border border-purple-300 py-3 text-xs font-medium text-center"
							>
								Candles
							</Link>

							<Link
								to="/category/phone-charms"
								onClick={() => setShowCollectionDrawer(false)}
								className="rounded-xl border border-purple-300 py-3 text-xs font-medium text-center"
							>
								Phone Charms
							</Link>

							<Link
								to="/category/scrunchies"
								onClick={() => setShowCollectionDrawer(false)}
								className="rounded-xl border border-purple-300 py-3 text-xs font-medium text-center"
							>
								Scrunchies
							</Link>

							<Link
								to="/category/action-figures"
								onClick={() => setShowCollectionDrawer(false)}
								className="rounded-xl border border-purple-300 py-3 text-xs font-medium text-center"
							>
								Action Figures
							</Link>

							<Link
								to="/category/chocolate-bouquets"
								onClick={() => setShowCollectionDrawer(false)}
								className="rounded-xl border border-purple-300 py-3 text-xs font-medium text-center"
							>
								Chocolate Bouquets
							</Link>


							<Link
								to="/category/gift-hampers"
								onClick={() => setShowCollectionDrawer(false)}
								className="rounded-xl border border-purple-300 py-3 text-xs font-medium text-center"
							>
								Gift Hampers
							</Link>

							<Link
								to="/category/special-boxes"
								onClick={() => setShowCollectionDrawer(false)}
								className="rounded-xl border border-purple-300 py-3 text-xs font-medium text-center"
							>
								Special Boxes
							</Link>

							<Link
								to="/category/mystery-scoops"
								onClick={() => setShowCollectionDrawer(false)}
								className="rounded-xl border border-purple-300 py-3 text-xs font-medium text-center"
							>
								Mystery Scoops
							</Link>


							<Link
								to="/category/gift-hampers"
								onClick={() => setShowCollectionDrawer(false)}
								className="rounded-xl border border-purple-300 py-3 text-xs font-medium text-center"
							>
								Gift Hampers
							</Link>

						</div>
					</div>
				</div>
			)}

			{mobileSearchOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-[100] flex items-start justify-center pt-20 px-4"
					onClick={() => setMobileSearchOpen(false)}
				>
					<div
						className="w-full max-w-md"
						onClick={(e) => e.stopPropagation()}
					>
						<SearchBar
							mobile={true}
							closeSearch={() => setMobileSearchOpen(false)}
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default Navbar;