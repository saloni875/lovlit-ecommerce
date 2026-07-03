import { useEffect } from "react";
import { Star } from "lucide-react";
import { useReviewStore } from "../stores/useReviewStore";
import { useThemeStore } from "../stores/useThemeStore";


const ReviewsSection = () => {
    const { reviews, fetchReviews, loading } = useReviewStore();
    const { darkMode } = useThemeStore();

    useEffect(() => {
        fetchReviews();
    }, []);

    if (loading || reviews.length === 0) return null;

    return (
        <section
            className="py-16 px-4 sm:px-6 lg:px-8 transition-all duration-300"
            style={{
                background: darkMode
                    ? "linear-gradient(135deg,#0c090f,#660c5e)"
                    : "linear-gradient(to right, rgb(233 213 255), white, rgb(251 207 232))",
            }}
            
        >
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-12">

                    <p
                        className={`uppercase tracking-[0.3em] text-sm mb-3 ${darkMode ? "text-pink-400" : "text-pink-500"
                            }`}
                    >
                        Customer Love
                    </p>

                    <h2
                        className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-purple-700"
                            }`}
                    >
                        Reviews/Feedback by Our Customers...
                    </h2>

                    <p
                        className={`max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                    >
                        Real reviews shared by our Lovlit users.
                    </p>

                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

                    {reviews
                        .filter((review) => review.published)
                        .map((review) => (

                            <div
                                key={review._id}
                                className={`rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 ${darkMode
                                    ? "border border-fuchsia-700"
                                    : "border border-purple-200"
                                    }`}
                                style={{
                                    background: darkMode
                                        ? "linear-gradient(135deg,#18111f,#3b0b39)"
                                        : "#ffffff",
                                }}
                            >

                                <img
                                    src={review.image}
                                    alt={review.customerName}
                                    className="w-full aspect-[9/16] object-cover"
                                />

                                <div className="p-5">

                                    {/* <div className="flex justify-center mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                fill="#facc15"
                                                color="#facc15"
                                            />
                                        ))}
                                    </div> */}
                                    <div
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${darkMode
                                                ? "bg-fuchsia-900/40 text-pink-300 border border-fuchsia-700"
                                                : "bg-pink-100 text-pink-600 border border-pink-200"
                                            }`}
                                    >
                                        💜 Verified Customer
                                    </div>

                                    <h3
                                        className={`text-lg font-bold  ${darkMode
                                            ? "text-white"
                                            : "text-purple-700"
                                            }`}
                                    >
                                        {review.customerName}
                                    </h3>

                                    <p
                                        className={`mt-3 text-sm  leading-6 ${darkMode
                                            ? "text-gray-300"
                                            : "text-gray-600"
                                            }`}
                                    >
                                        {review.caption}
                                    </p>

                                </div>

                            </div>

                        ))}

                </div>

            </div>
        </section>
    );
};

export default ReviewsSection;