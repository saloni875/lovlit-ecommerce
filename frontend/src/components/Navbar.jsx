import {
	Menu,
	X,
	ShoppingCart,
	UserPlus,
	LogIn,
	LogOut,
	Lock,
	Heart,
} from "lucide-react";
import { useState, useEffect } from 'react'

import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../stores/useThemeStore";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();
	const { darkMode, toggleTheme } = useThemeStore();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	useEffect(() => {
		if (localStorage.getItem("theme") === "dark") {
			document.body.classList.add("dark-mode");
		}
	}, []);

	return (
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

					<button
						className='md:hidden text-purple-700'
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <X size={28} /> : <Menu size={28} />}
					</button>
					<nav className='hidden md:flex flex-wrap items-center gap-4 '>


						<Link
							to={"/"}
							className='text-purple-700 text-base sm:text-xl font-semibold hover:text-pink-500 transition duration-300 ease-in-out'
						>
							Home
						</Link>

						<Link to={"/about"} className='hidden sm:block text-purple-700 text-base sm:text-xl font-semibold hover:text-pink-500 transition duration-300'>
							About
						</Link>



						{user && (
							<Link
								to={"/cart"}
								className='relative group flex items-center text-purple-700 font-medium hover:text-pink-500 transition duration-300 ease-in-out'
							>
								<ShoppingCart
									className='inline-block mr-1'
									size={22}
								/>

								<span className='hidden sm:inline text-lg'>
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
								console.log("Moon clicked");
								toggleTheme();
								console.log(document.body.className);
							}}
							className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition duration-300 ease-in-out"
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

							{/* <Link
								to='/'
								onClick={() => setIsMenuOpen(false)}
								className={`${darkMode ? "text-white" : "text-purple-700"} font-semibold`}
							>
								Home
							</Link> */}
							<Link
								to={"/"}
								className={`${darkMode ? "text-red-500" : "text-green-500"} text-base sm:text-xl font-semibold`}
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
								>
									Dashboard
								</Link>
							)}

							{user ? (
								<button
									onClick={logout}
									className='text-left text-purple-700 font-semibold'
								>
									Log Out
								</button>
							) : (
								<>
									<Link
										to='/signup'
										className='text-purple-700 font-semibold'
									>
										Sign Up
									</Link>

									<Link
										to='/login'
										className='text-purple-700 font-semibold'
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
	);
};

export default Navbar;