import {
	ShoppingCart,
	UserPlus,
	LogIn,
	LogOut,
	Lock,
	Heart,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();

	return (
		<header className='fixed top-0 left-0 w-full bg-gradient-to-r from-purple-300 via-white to-pink-200  backdrop-blur-md shadow-md z-40 transition-all duration-300 border-b border-purple-200'>
			<div className='container mx-auto px-6 py-4'>
				<div className='flex flex-wrap justify-between items-center'>
					
					<Link
						to='/'
						className='flex items-center space-x-2'
					>
						<Heart className='text-purple-600 fill-purple-300 w-7 h-7' />

						<h1 className='logo-font text-5xl text-purple-700 tracking-wide drop-shadow-sm'>
							Lovlit
						</h1>
					</Link>

					
					<nav className='flex flex-wrap items-center gap-4'>
						
						<Link
							to={"/"}
							className='text-purple-700 text-xl font-semibold hover:text-pink-500 transition duration-300 ease-in-out'
						>
							Home
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

						
						{isAdmin && (
							<Link
								className='bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition duration-300 ease-in-out flex items-center'
								to={"/secret-dashboard"}
							>
								<Lock
									className='inline-block mr-2'
									size={18}
								/>

								<span className='hidden sm:inline'>
									Dashboard
								</span>
							</Link>
						)}

						
						{user ? (
							<button
								className='bg-black/80 hover:bg-purple-700 text-white py-2 px-5 rounded-xl flex items-center shadow-md transition duration-300 ease-in-out'
								onClick={logout}
							>
								<LogOut size={18} />

								<span className='hidden sm:inline ml-2 font-medium'>
									Log Out
								</span>
							</button>
						) : (
							<>
								
								<Link
									to={"/signup"}
									className='bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-xl flex items-center shadow-md transition duration-300 ease-in-out font-medium'
								>
									<UserPlus
										className='mr-2'
										size={18}
									/>

									Sign Up
								</Link>

								
								<Link
									to={"/login"}
									className='bg-white border border-purple-300 hover:bg-purple-100 text-purple-700 py-2 px-5 rounded-xl flex items-center shadow-sm transition duration-300 ease-in-out font-medium'
								>
									<LogIn
										className='mr-2'
										size={18}
									/>

									Login
								</Link>
							</>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Navbar;