import { useState } from "react";
import { Loader, Upload, Star } from "lucide-react";
import { useReviewStore } from "../stores/useReviewStore";
import { useThemeStore } from "../stores/useThemeStore";

const ReviewForm = () => {
    const { createReview, loading } = useReviewStore();
    const { darkMode } = useThemeStore();

    const [review, setReview] = useState({
        customerName: "",
        caption: "",
        image: "",
        published: true,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            setReview({
                ...review,
                image: reader.result,
            });
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createReview(review);

        setReview({
            customerName: "",
            caption: "",
            image: "",
        });
    };

    return (
        <div
            className={`max-w-xl mx-auto rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-300 ${darkMode
                    ? "border border-fuchsia-700"
                    : "border border-purple-200"
                }`}
            style={{
                background: darkMode
                    ? "linear-gradient(135deg,#18111f,#3b0b39)"
                    : "#ffffff",
            }}
        >
            <div className="flex items-center gap-3 mb-6">
                <Star
                    className={
                        darkMode
                            ? "text-pink-400"
                            : "text-purple-700"
                    }
                />

                <h2
                    className={`text-2xl font-bold ${darkMode
                            ? "text-white"
                            : "text-purple-700"
                        }`}
                >
                    Publish Review
                </h2>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <div>
                    <label
                        className={`block mb-2 font-medium ${darkMode
                                ? "text-white"
                                : "text-purple-700"
                            }`}
                    >
                        Customer Name
                    </label>

                    <input
                        type="text"
                        required
                        value={review.customerName}
                        onChange={(e) =>
                            setReview({
                                ...review,
                                customerName: e.target.value,
                            })
                        }
                        className={`w-full rounded-2xl px-4 py-3 transition ${darkMode
                                ? "bg-[#18111f] border border-fuchsia-700 text-white placeholder:text-gray-400"
                                : "bg-white border-2 border-purple-300 text-black"
                            }`}
                    />
                </div>

                <div>
                    <label
                        className={`block mb-2 font-medium ${darkMode
                                ? "text-white"
                                : "text-purple-700"
                            }`}
                    >
                        Caption (optional)
                    </label>

                    <textarea
                        rows="4"
                        value={review.caption}
                        onChange={(e) =>
                            setReview({
                                ...review,
                                caption: e.target.value,
                            })
                        }
                        className={`w-full rounded-2xl px-4 py-3 transition ${darkMode
                                ? "bg-[#18111f] border border-fuchsia-700 text-white placeholder:text-gray-400"
                                : "bg-white border-2 border-purple-300 text-black"
                            }`}
                    />
                </div>

                <div>
                    <input
                        type="file"
                        id="reviewImage"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />

                    <label
                        htmlFor="reviewImage"
                        className={`inline-flex items-center gap-2 cursor-pointer rounded-xl px-5 py-3 font-medium transition ${darkMode
                                ? "bg-[#18111f] border border-fuchsia-700 text-white hover:bg-fuchsia-700"
                                : "bg-purple-100 border border-purple-300 text-purple-700 hover:bg-purple-200"
                            }`}
                    >
                        <Upload size={18} />
                        Upload Review Image
                    </label>

                    {review.image && (
                        <p
                            className={`mt-3 text-sm ${darkMode
                                    ? "text-gray-300"
                                    : "text-gray-600"
                                }`}
                        >
                            ✅ Image Selected
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="published"
                        checked={review.published}
                        onChange={(e) =>
                            setReview({
                                ...review,
                                published: e.target.checked,
                            })
                        }
                        className="w-5 h-5 accent-purple-600"
                    />

                    <label
                        htmlFor="published"
                        className={`font-medium ${darkMode ? "text-white" : "text-purple-700"
                            }`}
                    >
                        Published
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center py-3 rounded-2xl font-semibold transition-all duration-300"
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
                        e.currentTarget.style.background =
                            "#e100ff";
                        e.currentTarget.style.color = "#000";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                            darkMode
                                ? "linear-gradient(135deg,#0c090f,#660c5e)"
                                : "#9333ea";
                        e.currentTarget.style.color =
                            "#ffffff";
                    }}
                >
                    {loading ? (
                        <>
                            <Loader className="mr-2 h-5 w-5 animate-spin" />
                            Publishing...
                        </>
                    ) : (
                        <>
                            <Star className="mr-2 h-5 w-5" />
                            Publish Review
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;