import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};

	return (
		<div className='flex flex-col justify-center py-10 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-purple-100 via-white to-pink-100'>
			
			<motion.div
				className='sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<div className='text-center'>
					<h1 className='logo-font text-7xl text-purple-700 mb-2'>
						Lovlit
					</h1>

					<h2 className='text-2xl font-semibold text-gray-800'>
						Welcome back
					</h2>

					<p className='text-gray-500 mt-2'>
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
				<div className='bg-white/70 backdrop-blur-md py-10 px-6 shadow-2xl rounded-3xl border border-purple-200 sm:px-10'>
					
					<form onSubmit={handleSubmit} className='space-y-6'>
						
						<div>
							<label htmlFor='email' className='block text-sm font-medium text-gray-700'>
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
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='block w-full px-3 py-3 pl-10 bg-white border border-purple-200 text-black rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
									placeholder='you@example.com'
								/>
							</div>
						</div>

						
						<div>
							<label htmlFor='password' className='block text-sm font-medium text-gray-700'>
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
									className='block w-full px-3 py-3 pl-10 bg-white border border-purple-200 text-black rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
									placeholder='••••••••'
								/>
							</div>
						</div>

						
						<button
							type='submit'
							className='w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out disabled:opacity-50'
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader
										className='mr-2 h-5 w-5 animate-spin'
										aria-hidden='true'
									/>
									Loading...
								</>
							) : (
								<>
									<LogIn
										className='mr-2 h-5 w-5'
										aria-hidden='true'
									/>
									Login
								</>
							)}
						</button>
					</form>

					
					<p className='mt-8 text-center text-sm text-gray-500'>
						Not a member?{" "}
						<Link
							to='/signup'
							className='font-medium text-purple-700 hover:text-purple-900'
						>
							Sign up now <ArrowRight className='inline h-4 w-4' />
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default LoginPage;