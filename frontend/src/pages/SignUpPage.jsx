import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { useThemeStore } from "../stores/useThemeStore";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { signup, loading } = useUserStore();
	const { darkMode } = useThemeStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData);
	};

	return (
		<div
			className="flex flex-col justify-center py-10 sm:px-6 lg:px-8 min-h-screen transition-all duration-300"
			style={{
				background: darkMode
					? "linear-gradient(135deg,#0c090f,#660c5e)"
					: "linear-gradient(to bottom right,#ede9fe,#ffffff,#fce7f3)",
			}}
		>
			<motion.div
				className='sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<div className='text-center'>
					<h1 className={`logo-font text-7xl ${darkMode ? "text-pink-500" : "text-purple-700"} mb-2`}>
						Lovlit
					</h1>

					<h2 className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
						Create your account
					</h2>

					<p className={`${darkMode ? "text-gray-300" : "text-gray-500"} mt-2`}>
						Join the aesthetic collection community
					</p>
				</div>
			</motion.div>

			<motion.div
				className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<div
					className={`py-10 px-6 shadow-2xl rounded-3xl sm:px-10 transition-all duration-300 ${darkMode
						? "border border-fuchsia-700"
						: "border border-purple-200"
						}`}
					style={{
						background: darkMode
							? "linear-gradient(135deg,#18111f,#3b0b39)"
							: "rgba(255,255,255,0.75)",
					}}
				>
					<form onSubmit={handleSubmit} className='space-y-6'>

						<div>
							<label htmlFor='name' className='block text-sm font-medium ${darkMode ? "text-white" : "text-gray-700"}'>
								Full name
							</label>

							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<User className='h-5 w-5 text-purple-400' aria-hidden='true' />
								</div>

								<input
									id='name'
									type='text'
									required
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
									className='block w-full px-3 py-3 pl-10 bg-white border border-purple-200 text-black rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
									placeholder='John Doe'
								/>
							</div>
						</div>


						<div>
							<label htmlFor='email' className='block text-sm font-medium ${darkMode ? "text-white" : "text-gray-700"}'>
								Email address
							</label>

							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Mail className='h-5 w-5 text-purple-400' aria-hidden='true' />
								</div>

								<input
									id='email'
									type='email'
									required
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
									className='block w-full px-3 py-3 pl-10 bg-white border border-purple-200 text-black rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
									placeholder='you@example.com'
								/>
							</div>
						</div>


						<div>
							<label htmlFor='password' className='block text-sm font-medium ${darkMode ? "text-white" : "text-gray-700"}'>
								Password
							</label>

							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-purple-400' aria-hidden='true' />
								</div>

								<input
									id='password'
									type='password'
									required
									value={formData.password}
									onChange={(e) =>
										setFormData({ ...formData, password: e.target.value })
									}
									className='block w-full px-3 py-3 pl-10 bg-white border border-purple-200 text-black rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
									placeholder='••••••••'
								/>
							</div>
						</div>


						<div>
							<label htmlFor='confirmPassword' className='block text-sm font-medium ${darkMode ? "text-white" : "text-gray-700"}'>
								Confirm Password
							</label>

							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-purple-400' aria-hidden='true' />
								</div>

								<input
									id='confirmPassword'
									type='password'
									required
									value={formData.confirmPassword}
									onChange={(e) =>
										setFormData({
											...formData,
											confirmPassword: e.target.value,
										})
									}
									className='block w-full px-3 py-3 pl-10 bg-white border border-purple-200 text-black rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
									placeholder='••••••••'
								/>
							</div>
						</div>


						<button
							type="submit"
							disabled={loading}
							className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-50"
							style={{
								background: darkMode
									? "linear-gradient(135deg,#0c090f,#660c5e)"
									: "#9333ea",
								color: "#ffffff",
								border: darkMode
									? "1px solid #f209e2"
									: "1px solid #9333ea",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = "#e100ff";
								e.currentTarget.style.color = "#000000";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = darkMode
									? "linear-gradient(135deg,#0c090f,#660c5e)"
									: "#9333ea";
								e.currentTarget.style.color = "#ffffff";
							}}
						>
							{loading ? (
								<>
									<Loader
										className="mr-2 h-5 w-5 animate-spin"
										aria-hidden="true"
									/>
									Loading...
								</>
							) : (
								<>
									<UserPlus
										className="mr-2 h-5 w-5"
										aria-hidden="true"
									/>
									Sign Up
								</>
							)}
						</button>
					</form>

					<p
						className={`mt-8 text-center text-sm ${darkMode ? "text-gray-300" : "text-gray-500"
							}`}
					>
						Already have an account?{" "}
						<Link
							to="/login"
							className={`font-medium transition ${darkMode
									? "text-pink-400 hover:text-pink-300"
									: "text-purple-700 hover:text-purple-900"
								}`}
						>
							Login here{" "}
							<ArrowRight className="inline h-4 w-4" />
						</Link>
					</p>


				</div>
			</motion.div>
		</div>
	);
};

export default SignUpPage;