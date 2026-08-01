import {
	Menu,
	X,
	ShoppingCart,
	UserPlus,
	LogIn,
	LogOut,
	Lock,
	Heart,
	Home,
	Sun,
	Moon,
	LayoutGrid,
	Search,
	Phone,
	Info,
} from "lucide-react";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useThemeStore } from "../stores/useThemeStore";
import SearchBar from "./SearchBar";

const Navbar = () => {

	// Stores

	const { user, logout } = useUserStore();
	const { cart } = useCartStore();
	const { darkMode, toggleTheme } = useThemeStore();

	const isAdmin = user?.role === "admin";


	// States

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showCollectionDrawer, setShowCollectionDrawer] = useState(false);
	const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

	const location = useLocation();


	// Theme

	useEffect(() => {
		if (localStorage.getItem("theme") === "dark") {
			document.body.classList.add("dark-mode");
		}
	}, []);

	return (
		<>
			<header
				className="fixed top-0 left-0 w-full backdrop-blur-md shadow-md z-40 transition-all duration-300"
				style={{
					background: darkMode
						? "linear-gradient(135deg,#0c090f,#660c5e)"
						: "linear-gradient(to right,rgb(216 180 254),white,rgb(251 207 232))",
					borderBottom: darkMode
						? "1px solid #7a1b6d"
						: "1px solid #e9d5ff",
				}}
			>
				<div className="container mx-auto px-3 sm:px-6 py-3 sm:py-4">
					<div className="flex items-center justify-between">

						{/*  Logo  */}
						<Link to="/" className="flex items-center shrink-0">
							<img
								src="/logo.png"
								alt="Lovlit"
								className="h-14 md:h-16 w-auto"
							/>
						</Link>

						{/*  Search  */}

						<div className="hidden md:flex flex-1 justify-center px-3 lg:px-6">
							<div className="w-full max-w-sm xl:max-w-lg">
								<SearchBar />
							</div>
						</div>

						{/*  Mobile / Tablet Actions */}

						<div className="flex items-center gap-2 md:hidden">

							{/* Search */}
							<button
								className="md:hidden"
								onClick={() => setMobileSearchOpen(true)}
							>
								<Search size={22} />
							</button>

							{/* Theme */}
							<button
								onClick={toggleTheme}
								className="p-1 rounded-full"
								style={{
									background: darkMode
										? "linear-gradient(135deg,#0c090f,#660c5e)"
										: "#9333ea",
									color: "#fff",
									border: darkMode
										? "1px solid #c646b3"
										: "1px solid #e9d5ff",
								}}
							>
								{darkMode ? <Sun size={18} /> : <Moon size={18} />}
							</button>

							{/* Menu */}
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								style={{
									color: darkMode ? "#fff" : "#6b21a8",
								}}
							>
								{isMenuOpen ? <X size={28} /> : <Menu size={28} />}
							</button>

						</div>

						{/*  Desktop Navigation  */}

						<nav className="hidden md:flex flex-wrap items-center gap-4">

							{/* = Navigation Links  */}

							<Link
								to="/"
								className="text-purple-700 text-base lg:text-xl font-semibold hover:text-pink-500 transition duration-300"
								style={{
									color: darkMode ? "#ffffff" : "#6b21a8",
								}}
							>
								Home
							</Link>

							<Link
								to="/about"
								className="hidden lg:block text-purple-700 text-base lg:text-xl font-semibold hover:text-pink-500 transition duration-300"
								style={{
									color: darkMode ? "#ffffff" : "#6b21a8",
								}}
							>
								About
							</Link>

							<Link
								to="/contact"
								className="hidden lg:block text-purple-700 text-base lg:text-xl font-semibold hover:text-pink-500 transition duration-300"
								style={{
									color: darkMode ? "#ffffff" : "#6b21a8",
								}}
							>
								Contact
							</Link>

							{/* ================= Wishlist ================= */}

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

							{/* ================= Cart ================= */}

							{user && (
								<Link
									to="/cart"
									className="relative group flex items-center font-medium hover:text-pink-500 transition duration-300"
									style={{
										color: darkMode ? "#ffffff" : "#6b21a8",
									}}
								>
									<ShoppingCart
										className="inline-block mr-1"
										size={22}
									/>

									{/* Hide Cart text on tablets */}
									<span
										className="hidden xl:inline text-lg"
										style={{
											color: darkMode ? "#ffffff" : "#6b21a8",
										}}
									>
										Cart
									</span>

									{cart.length > 0 && (
										<span className="absolute -top-2 -left-2 bg-purple-600 text-white rounded-full px-2 py-0.5 text-xs shadow-md">
											{cart.length}
										</span>
									)}
								</Link>


							)}
							{/* ================= Theme Toggle ================= */}

							<button
								onClick={toggleTheme}
								className="p-2 rounded-full transition duration-300 ease-in-out"
								style={{
									background: darkMode
										? "linear-gradient(135deg,#0c090f,#660c5e)"
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
											"linear-gradient(135deg,#0c090f,#660c5e)";
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

							{/* ================= Admin Dashboard ================= */}

							{isAdmin && (
								<Link
									to="/secret-dashboard"
									className="px-2 lg:px-5 py-2 rounded-xl text-white font-semibold shadow-md transition duration-300 ease-in-out flex items-center"
									style={{
										background: darkMode
											? "linear-gradient(135deg,#0c090f,#660c5e)"
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
												"linear-gradient(135deg,#0c090f,#660c5e)";
											e.currentTarget.style.color = "#ffffff";
										} else {
											e.currentTarget.style.background = "#9333ea";
											e.currentTarget.style.color = "#ffffff";
										}
									}}
								>
									<Lock className="mr-2" size={18} />

									<span className="hidden xl:inline">
										Dashboard
									</span>
								</Link>
							)}

							{/* ================= Auth ================= */}

							{user ? (
								<button
									onClick={logout}
									className="bg-black/80 text-white py-2 px-2 lg:px-5 rounded-xl flex items-center shadow-md transition duration-300 ease-in-out"
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
								>
									<LogOut size={18} />

									<span className="hidden xl:inline ml-2 font-medium">
										Log Out
									</span>
								</button>
							) : (
								<>
									{/* Signup */}

									<Link
										to="/signup"
										className="text-white py-2 px-3 lg:px-5 rounded-xl flex items-center shadow-md transition duration-300 ease-in-out font-medium"
										style={{
											background: darkMode
												? "linear-gradient(135deg,#0c090f,#660c5e)"
												: "#9333ea",
											border: darkMode
												? "1px solid #c646b3"
												: "1px solid #e9d5ff",
										}}
									>
										<UserPlus className="mr-2" size={18} />

										<span className="hidden xl:inline">
											Sign Up
										</span>
									</Link>

									{/* Login */}

									<Link
										to="/login"
										className="py-2 px-3 lg:px-5 rounded-xl flex items-center shadow-md transition duration-300 ease-in-out font-medium"
										style={{
											background: darkMode
												? "linear-gradient(135deg,#0c090f,#660c5e)"
												: "#ffffff",
											color: darkMode ? "#ffffff" : "#6b21a8",
											border: darkMode
												? "1px solid #c646b3"
												: "1px solid #d8b4fe",
										}}
									>
										<LogIn className="mr-2" size={18} />

										<span className="hidden xl:inline">
											Login
										</span>
									</Link>
								</>
							)}

						</nav>
						{/* ================= Mobile Menu ================= */}

						{isMenuOpen && (
							<div
								className="md:hidden absolute top-full left-0 w-full shadow-lg border-t z-50"
								style={{
									background: darkMode
										? "#111111"
										: "rgb(240, 158, 249)",
									borderColor: darkMode ? "#333333" : "#e5e7eb",
								}}
							>
								<div className="flex flex-col py-2">

									{/* Home */}
									<Link
										to="/"
										onClick={() => setIsMenuOpen(false)}
										className="px-5 py-3 flex items-center gap-3 hover:bg-purple-100 dark:hover:bg-fuchsia-900 hover:text-purple-700 dark:hover:text-white transition-colors"
									>
										<Home size={20} />
										<span>Home</span>
									</Link>

									{/* About */}
									<Link
										to="/about"
										onClick={() => setIsMenuOpen(false)}
										className="px-5 py-3 flex items-center gap-3 hover:bg-purple-100 dark:hover:bg-fuchsia-900 hover:text-purple-700 dark:hover:text-white transition-colors"
									>
										<Info size={20} />
										<span>About</span>
									</Link>

									{/* Contact */}
									<Link
										to="/contact"
										onClick={() => setIsMenuOpen(false)}
										className="px-5 py-3 flex items-center gap-3 hover:bg-purple-100 dark:hover:bg-fuchsia-900 hover:text-purple-700 dark:hover:text-white transition-colors"
									>
										<Phone size={20} />
										<span>Contact</span>
									</Link>

									{/* Wishlist */}
									<Link
										to="/wishlist"
										onClick={() => setIsMenuOpen(false)}
										className="px-5 py-3 flex items-center gap-3 hover:bg-purple-100 dark:hover:bg-fuchsia-900 hover:text-purple-700 dark:hover:text-white transition-colors"
									>
										<Heart size={20} />
										<span>Wishlist</span>
									</Link>

									{/* Cart */}
									{user && (
										<Link
											to="/cart"
											onClick={() => setIsMenuOpen(false)}
											className="px-5 py-3 flex items-center gap-3 hover:bg-purple-100 dark:hover:bg-fuchsia-900 hover:text-purple-700 dark:hover:text-white transition-colors"
										>
											<ShoppingCart size={20} />
											<span>Cart ({cart.length})</span>
										</Link>
									)}

									{/* Admin */}
									{isAdmin && (
										<Link
											to="/secret-dashboard"
											onClick={() => setIsMenuOpen(false)}
											className="px-5 py-3 flex items-center gap-3 hover:bg-purple-100 dark:hover:bg-fuchsia-900 hover:text-purple-700 dark:hover:text-white transition-colors"
										>
											<Lock size={20} />
											<span>Dashboard</span>
										</Link>
									)}

									{/* Divider */}
									<div className="border-t my-2 border-gray-300 dark:border-gray-700"></div>

									{/* Auth */}
									{user ? (
										<button
											onClick={() => {
												logout();
												setIsMenuOpen(false);
											}}
											className="px-5 py-3 flex items-center gap-3 text-left hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-white transition-colors"
										>
											<LogOut size={20} />
											<span>Logout</span>
										</button>
									) : (
										<>
											<Link
												to="/signup"
												onClick={() => setIsMenuOpen(false)}
												className="px-5 py-3 flex items-center gap-3 hover:bg-purple-100 dark:hover:bg-fuchsia-900 hover:text-purple-700 dark:hover:text-white transition-colors"
											>
												<UserPlus size={20} />
												<span>Sign Up</span>
											</Link>

											<Link
												to="/login"
												onClick={() => setIsMenuOpen(false)}
												className="px-5 py-3 flex items-center gap-3 hover:bg-purple-100 dark:hover:bg-fuchsia-900 hover:text-purple-700 dark:hover:text-white transition-colors"
											>
												<LogIn size={20} />
												<span>Login</span>
											</Link>
										</>
									)}
								</div>
							</div>
						)}

					</div>
				</div>
			</header>
			{/* Collection Drawer */}
			{showCollectionDrawer && (
				<div
					className="fixed inset-0 bg-black/40 z-[60]"
					onClick={() => setShowCollectionDrawer(false)}
				>
					<div
						onClick={(e) => e.stopPropagation()}
						className={`absolute bottom-20 left-3 right-3 rounded-3xl p-5 border shadow-xl ${darkMode
							? "bg-[#18111f] border-fuchsia-700"
							: "bg-white border-purple-200"
							}`}
					>
						<div className="flex items-center justify-between mb-4">
							<h2
								className={`text-xl font-bold ${darkMode ? "text-white" : "text-purple-700"
									}`}
							>
								Collections
							</h2>

							<button
								onClick={() => setShowCollectionDrawer(false)}
							>
								<X size={22} />
							</button>
						</div>

						<div className="grid grid-cols-2 gap-3">

							<Link
								to="/category/jewelry"
								onClick={() => setShowCollectionDrawer(false)}
								className="rounded-xl border border-purple-300 py-3 text-center text-sm font-medium"
							>
								Jewelry
							</Link>

							<Link
								to="/category/phone-charms"
								onClick={() => setShowCollectionDrawer(false)}
								className="rounded-xl border border-purple-300 py-3 text-center text-sm font-medium"
							>
								Phone Charms
							</Link>

							<Link
								to="/category/army-zone"
								onClick={() => setShowCollectionDrawer(false)}
								className="rounded-xl border border-purple-300 py-3 text-center text-sm font-medium"
							>
								Fan Zone
							</Link>

							<Link
								to="/category/candles"
								onClick={() => setShowCollectionDrawer(false)}
								className="rounded-xl border border-purple-300 py-3 text-center text-sm font-medium"
							>
								Candles
							</Link>

							<Link
								to="/category/gifts-bouquets"
								onClick={() => setShowCollectionDrawer(false)}
								className="rounded-xl border border-purple-300 py-3 text-center text-sm font-medium"
							>
								Gifts & Bouquets
							</Link>

							<Link
								to="/category/trinkets-more"
								onClick={() => setShowCollectionDrawer(false)}
								className="rounded-xl border border-purple-300 py-3 text-center text-sm font-medium"
							>
								Trinkets & More
							</Link>

						</div>
					</div>
				</div>
			)}

			{/* ================= Bottom Mobile Navigation ================= */}

			<div
				className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t shadow-lg"
				style={{
					background: darkMode ? "#111111" : "#ffffff",
					borderColor: darkMode ? "#333333" : "#e5e7eb",
				}}
			>
				<div className="grid grid-cols-5 h-16">

					{/* Home */}
					<Link
						to="/"
						className={`flex flex-col items-center justify-center ${location.pathname === "/"
							? "text-purple-500"
							: darkMode
								? "text-white"
								: "text-gray-600"
							}`}
					>
						<Home size={22} />
						<span className="text-xs mt-1">Home</span>
					</Link>

					{/* Collections */}
					<button
						onClick={() => setShowCollectionDrawer(true)}
						className={`flex flex-col items-center justify-center ${darkMode ? "text-white" : "text-gray-600"
							}`}
					>
						<LayoutGrid size={22} />
						<span className="text-xs mt-1">Collections</span>
					</button>

					{/* Wishlist */}
					<Link
						to="/wishlist"
						className={`flex flex-col items-center justify-center ${location.pathname === "/wishlist"
							? "text-purple-500"
							: darkMode
								? "text-white"
								: "text-gray-600"
							}`}
					>
						<Heart size={22} />
						<span className="text-xs mt-1">Wishlist</span>
					</Link>

					{/* Cart */}
					<Link
						to="/cart"
						className={`relative flex flex-col items-center justify-center ${location.pathname === "/cart"
							? "text-purple-500"
							: darkMode
								? "text-white"
								: "text-gray-600"
							}`}
					>
						<ShoppingCart size={22} />

						{cart.length > 0 && (
							<span className="absolute top-1 right-4 bg-purple-600 text-white rounded-full text-[10px] px-1.5">
								{cart.length}
							</span>
						)}

						<span className="text-xs mt-1">Cart</span>
					</Link>

					{/* Profile */}
					{user ? (
						<button
							onClick={logout}
							className="flex flex-col items-center justify-center text-red-500"
						>
							<LogOut size={22} />
							<span className="text-xs mt-1">Logout</span>
						</button>
					) : (
						<Link
							to="/login"
							className={`flex flex-col items-center justify-center ${darkMode ? "text-white" : "text-gray-600"
								}`}
						>
							<LogIn size={22} />
							<span className="text-xs mt-1">Login</span>
						</Link>
					)}

				</div>
			</div>

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