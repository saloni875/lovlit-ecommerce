import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

import { useWishlistStore } from "../stores/useWishlistStore";
import { useThemeStore } from "../stores/useThemeStore";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";

const WishlistPage = () => {
    const { wishlist, getWishlist, toggleWishlist } = useWishlistStore();
    const { darkMode } = useThemeStore();

    useEffect(() => {
        getWishlist();
    }, []);

    return (
        <div
            className="min-h-screen py-8 px-4"
            style={{
                background: darkMode
                    ? "linear-gradient(135deg,#0c090f,#660c5e)"
                    : "linear-gradient(to right,#e9d5ff,#ffffff,#fbcfe8)",
            }}
        >
            <div className="max-w-7xl mx-auto">

                <h1
                    className={`text-3xl sm:text-5xl font-bold text-center mb-4 ${darkMode ? "text-white" : "text-purple-700"
                        }`}
                >
                    ❤️ My Wishlist
                </h1>

                {wishlist.length === 0 ? (

                    <div
                        className={`rounded-3xl p-10 text-center ${darkMode
                            ? "bg-[#18111f] border border-fuchsia-700"
                            : "bg-white border border-purple-200"
                            }`}
                    >
                        <h2
                            className={`text-2xl font-bold ${darkMode ? "text-white" : "text-purple-700"
                                }`}
                        >
                            Your wishlist is empty
                        </h2>

                        <p
                            className={`mt-3 ${darkMode ? "text-gray-300" : "text-gray-600"
                                }`}
                        >
                            Start adding your favourite Lovlit products 💜
                        </p>

                        <Link
                            to="/"
                            className="inline-block mt-6 rounded-xl bg-purple-600 px-6 py-3 text-white font-semibold hover:bg-purple-700"
                            style={{
                                background: darkMode
                                    ? "linear-gradient(135deg, #0c090f, #660c5e)"
                                    : "",
                                color: darkMode ? "#ffffff" : "",
                                border: darkMode ? "1px solid #c646b3" : "1px solid #e9d5ff",
                            }}
                            onMouseEnter={(e) => {
                                if (darkMode) {
                                    e.currentTarget.style.background = "#e100ff";
                                    e.currentTarget.style.color = "#000000";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (darkMode) {
                                    e.currentTarget.style.background =
                                        "linear-gradient(135deg, #0c090f, #660c5e)";
                                    e.currentTarget.style.color = "#ffffff";
                                }
                            }}
                        >
                            Continue Shopping
                        </Link>
                    </div>

                ) : (

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">



                        {wishlist.map((item) => (
                            <ProductCard
                                key={item.product._id}
                                product={item.product}
                            />
                        ))}



                    </div>

                )}

            </div>
        </div>
    );
};

export default WishlistPage;