import { Link } from "react-router-dom";
import { useThemeStore } from "../stores/useThemeStore";
import { Helmet } from "react-helmet-async";

const NotFoundPage = () => {
	const { darkMode } = useThemeStore();

	return (
		<>


			<Helmet>
				<title>404 - Page Not Found | Lovlit</title>

				<meta
					name="description"
					content="The page you are looking for doesn't exist. Browse Lovlit's handmade jewelry, gifts, candles and more."
				/>
			</Helmet>
			<div
				className="min-h-screen flex items-center justify-center px-6 transition-all duration-300"
				style={{
					background: darkMode
						? "linear-gradient(135deg,#0c090f,#660c5e)"
						: "linear-gradient(to right,#ede9fe,#ffffff,#fce7f3)",
				}}
			>
				<div
					className='max-w-lg w-full rounded-3xl p-8 text-center shadow-2xl'
					style={{
						background: darkMode
							? "linear-gradient(135deg,#18111f,#3b0b39)"
							: "#ffffff",
					}}
				>
					<img
						src="lost.jpeg"
						alt="Oops"
						className="w-58 mx-auto mb-6"
					/>

					<h1
						className={`text-6xl font-bold mb-3 ${darkMode ? "text-pink-400" : "text-purple-700"
							}`}
					>
						404
					</h1>

					<h2
						className={`text-2xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"
							}`}
					>
						Oops... this page wandered away.
					</h2>

					<p
						className={`mb-8 leading-7 ${darkMode ? "text-gray-300" : "text-gray-600"
							}`}
					>
						The page you're looking for doesn't exist,
						or it may have been moved.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<button
							onClick={() => window.location.reload()}
							className="px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
							style={{
								background: darkMode
									? "linear-gradient(135deg,#0c090f,#660c5e)"
									: "#9333ea",
								color: "#fff",
								border: darkMode
									? "1px solid #f209e2"
									: "1px solid #9333ea",
							}}
						>
							Try Again
						</button>

						<Link
							to="/"
							className="px-6 py-3 rounded-2xl font-semibold border border-purple-500 text-purple-700 hover:bg-purple-100 transition-all duration-300"
						>
							Go Home
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default NotFoundPage;