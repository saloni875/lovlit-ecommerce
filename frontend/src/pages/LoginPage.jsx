import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useThemeStore } from "../stores/useThemeStore";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, loading } = useUserStore();
	const { darkMode } = useThemeStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
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
					<h1
						className={`logo-font text-7xl mb-2 ${darkMode ? "text-pink-500" : "text-purple-700"
							}`}
					>
						Lovlit
					</h1>
					<h2
						className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-gray-800"
							}`}
					>
						Welcome back
					</h2>

					<p
						className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-500"
							}`}
					>
						Login to continue your aesthetic shopping journey
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
							<label htmlFor='email' className='block text-sm font-medium ${darkMode ? "text-white" : "text-gray-700"}'>
								Email address
							</label>

							<div className='mt-1 relative rounded-md shadow-sm
							'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none
								'>
									<Mail className='h-5 w-5 text-purple-400' aria-hidden='true' />
								</div>

								<input
									id='email'
									type='email'
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className={`block w-full px-3 py-3 pl-10 rounded-xl shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all duration-300 ${darkMode
										? "bg-[#18111f] border border-fuchsia-700 text-white placeholder:text-gray-400"
										: "bg-white/30 border-2 border-purple-300 text-black shadow-sm"
										}`}
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
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className={`block w-full px-3 py-3 pl-10 rounded-xl shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all duration-300 ${darkMode
										? "bg-[#18111f] border border-fuchsia-700 text-white placeholder:text-gray-400"
										: "bg-white border-2 border-purple-300 text-black shadow-sm"
										}`}
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
									<LogIn
										className="mr-2 h-5 w-5"
										aria-hidden="true"
									/>
									Login
								</>
							)}
						</button>
					</form>

					<p
						className={`mt-8 text-center text-sm ${darkMode ? "text-gray-300" : "text-gray-500"
							}`}
					>
						Not a member?{" "}
						<Link
							to="/signup"
							className={`font-medium transition ${darkMode
									? "text-pink-400 hover:text-pink-300"
									: "text-purple-700 hover:text-purple-900"
								}`}
						>
							Sign up now{" "}
							<ArrowRight className="inline h-4 w-4" />
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default LoginPage;