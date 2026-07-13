import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

import { useProductStore } from "../stores/useProductStore";
import { useThemeStore } from "../stores/useThemeStore";

const SearchBar = ( {mobile = false, closeSearch}) => {

	/*
		This stores whatever
		the user types.

		Initially:
		""

		User types:

		necklace

		search becomes

		"necklace"
	*/

	const [search, setSearch] = useState("");

	/*
		Get these functions
		from Zustand
	*/

	const {
		searchProducts,
		searchResults,
		clearSearch,
		searchLoading,
	} = useProductStore();

	const { darkMode } = useThemeStore();

	/*
		Whenever search changes,
		run this effect.
	*/

	useEffect(() => {

		/*
			If input is empty,
			remove old results.
		*/

		if (!search.trim()) {

			clearSearch();

			return;
		}

		/*
			Search backend
		*/

		searchProducts(search);

	}, [search]);

	return (

		<div className="relative w-full ">

			{/* Search Box */}

			<div
				className="flex items-center rounded-full px-4 py-3"
				style={{
					background: darkMode
						? "linear-gradient(135deg, #10070d, #440840)"
						: "linear-gradient(to right, rgb(233 213 255), white, rgb(253, 226, 241))",
					border: darkMode
						? "1px solid #ac70e3"
						: "1px solid #c295d5",
				}}
			>

				<Search
					size={20}
					className="text-purple-500"
				/>

				<input
					type="text"

					placeholder="Search products..."

					value={search}

					onChange={(e) =>
						setSearch(e.target.value)
					}

					className="flex-1 bg-transparent outline-none px-3"

					style={{
						color: darkMode
							? "#ffffff"
							: "#111827",
					}}
					
				/>
				{mobile && (
					<button onClick={closeSearch}>
						✖
					</button>
				)}

			</div>

			{/* Dropdown */}

			{
				search.length > 0 && (

					<div
						className="absolute w-full mt-2 rounded-2xl overflow-hidden shadow-2xl z-50"
						style={{
							background: darkMode
								? "#170d1d"
								: "#ffffff",
						}}
					>

						{
							searchLoading && (

								<div className="p-4">

									Searching...

								</div>

							)
						}

						{
							!searchLoading &&
							searchResults.length === 0 && (

								<div className="p-4">

									No products found

								</div>

							)
						}

						{
							searchResults.map((product) => (

								<Link

									key={product._id}

									to={`/product/${product._id}`}

									onClick={() => {

										setSearch("");

										clearSearch();
										if(closeSearch){
											closeSearch();
										}

									}}

									className="flex items-center gap-3 p-3 cursor-pointer transition"

								>

									<img
										src={product.image}
										alt={product.name}
										className="w-14 h-14 rounded-lg object-cover"
									/>

									<div>

										<h4
											className="font-semibold"
											style={{
												color: darkMode
													? "#fff"
													: "#4c1d95",
											}}
										>
											{product.name}
										</h4>

										<p className="text-pink-500 font-bold">

											₹{product.finalPrice}

										</p>

									</div>

								</Link>

							))
						}

					</div>

				)
			}

		</div>

	);

};

export default SearchBar;


