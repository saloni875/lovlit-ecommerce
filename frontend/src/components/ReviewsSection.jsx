import { useEffect, useMemo, useState } from "react";
import { useReviewStore } from "../stores/useReviewStore";
import { useThemeStore } from "../stores/useThemeStore";

const ReviewsSection = () => {
    const { reviews, fetchReviews, loading } = useReviewStore();
    const { darkMode } = useThemeStore();

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        fetchReviews();
    }, []);

    const publishedReviews = useMemo(
        () => reviews.filter((review) => review.published),
        [reviews]
    );

    useEffect(() => {
        if (publishedReviews.length <= 1) return;

        const interval = setInterval(() => {
            setCurrent((prev) =>
                prev === publishedReviews.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [publishedReviews]);

    if (loading || publishedReviews.length === 0) return null;

    return (
        <section
            className="py-10 px-2 transition-all duration-300"
            style={{
                background: darkMode
                    ? "linear-gradient(135deg,#0c090f,#660c5e)"
                    : "linear-gradient(to right,#e9d5ff,#ffffff,#fbcfe8)",
            }}
        >
            <div className="max-w-3xl mx-auto">

                <div className="text-center mb-3">

                    <p
                        className={`uppercase tracking-[0.35em] text-xs font-semibold ${darkMode
                            ? "text-pink-400"
                            : "text-pink-500"
                            }`}
                    >
                        ABSOLUTE SATISFACTION
                    </p>

                    <h2
                        className={`mt-2 text-xl sm:text-2xl font-bold ${darkMode
                            ? "text-white"
                            : "text-purple-700"
                            }`}
                    >
                        Customer Reviews
                    </h2>

                </div>

                <div className="relative overflow-hidden">

                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{
                            transform: `translateX(-${current * 100}%)`,
                        }}
                    >

                        {publishedReviews.map((review) => (
                            <div
                                key={review._id}
                                className="w-full flex-shrink-0"
                            >
                                <div
                                    className={`rounded-xl border shadow-xl p-3 sm:p-8 ${darkMode
                                        ? "border-fuchsia-700"
                                        : "border-purple-200"
                                        }`}
                                    style={{
                                        background: darkMode
                                            ? "linear-gradient(135deg,#18111f,#3b0b39)"
                                            : "#ffffff",
                                    }}
                                >

                                    <div className="flex items-start gap-3">

                                        <img
                                            src={review.image}
                                            alt={review.customerName}
                                           className=" w-32 h-56 sm:w-44 sm:h-72 lg:w-64 lg:h-[420px] rounded-3xl object-cover flex-shrink-0 shadow-lg
"
                                        />

                                        <div className="flex-1 flex flex-col justify-center">

                                            <p
                                                className={`text-base sm:text-lg leading-7 ${darkMode ? "text-gray-300" : "text-gray-700"
                                                    }`}
                                            >
                                                {review.caption}
                                            </p>

                                            <p
                                                className={`mt-2 text-xl font-bold ${darkMode ? "text-white" : "text-purple-700"
                                                    }`}
                                            >
                                                ~ {review.customerName}
                                            </p>

                                        </div>

                                    </div>
                                    <div className="flex justify-center gap-2 mt-4">
                                        {publishedReviews.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrent(index)}
                                                className={`transition-all rounded-full ${index === current
                                                    ? "w-8 h-3 bg-purple-600"
                                                    : darkMode
                                                        ? "w-3 h-3 bg-gray-500"
                                                        : "w-3 h-3 bg-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;