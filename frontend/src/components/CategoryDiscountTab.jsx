import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useThemeStore } from "../stores/useThemeStore";
import { useCategorySaleStore } from "../stores/useCategorySaleStore";

const categories = [
    "necklaces",
    "bracelets",
    "bodychains",
    "photocards",
    "candles",
    "phonecharms",
    "scrunchies",
    "actionfigures",
    "chocolatebouquets",
    "gifthampers",
    "specialboxes",
    "mysteryscoops",
];

const categoryNames = {
    necklaces: "Necklaces",
    bracelets: "Bracelets",
    bodychains: "Body Chains",
    photocards: "Photocards",
    candles: "Candles",
    phonecharms: "Phone Charms",
    scrunchies: "Scrunchies",
    actionfigures: "Action Figures",
    chocolatebouquets: "Chocolate Bouquets",
    gifthampers: "Gift Hampers",
    specialboxes: "Special Boxes",
    mysteryscoops: "Mystery Scoops",
};

const CategoryDiscountTab = () => {
    const { darkMode } = useThemeStore();

    const {
        saveCategoryDiscount,
        fetchCategorySales,
        categorySales,
        deleteCategoryDiscount,
        loading,
    } = useCategorySaleStore();

    const [category, setCategory] = useState(categories[0]);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        fetchCategorySales();
    }, []);

    const handleSave = async () => {
        await saveCategoryDiscount({
            category,
            discount,
        });

        await fetchCategorySales();
    };

    const previewPrice = (
        100 -
        (100 * discount) / 100
    ).toFixed(2);
    return (
        <div
            className="rounded-3xl shadow-xl border p-6 transition-all duration-300"
            style={{
                background: darkMode
                    ? "linear-gradient(135deg,#1a1020,#0c090f)"
                    : "#ffffff",
                border: darkMode
                    ? "1px solid #c646b3"
                    : "1px solid #e9d5ff",
            }}
        >
            <h2
                className="text-3xl font-bold mb-2"
                style={{
                    color: darkMode ? "#ffffff" : "#6b21a8",
                }}
            >
                Category Discount
            </h2>

            <p
                className="mb-6"
                style={{
                    color: darkMode ? "#d1d5db" : "#6b7280",
                }}
            >
                Apply one discount to every product in the selected category.
            </p>

            <div className="space-y-6">

                {/* Category */}

                <div>
                    <label
                        className="block mb-2 font-semibold"
                        style={{
                            color: darkMode ? "#fff" : "#6b21a8",
                        }}
                    >
                        Select Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-xl p-3"
                        style={{
                            background: darkMode ? "#1a1020" : "#ffffff",
                            color: darkMode ? "#ffffff" : "#000000",
                            border: darkMode
                                ? "1px solid #c646b3"
                                : "1px solid #d8b4fe",
                        }}
                    >
                        {categories.map((item) => (
                            <option
                                key={item}
                                value={item}
                            >
                                {categoryNames[item]}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Discount */}

                <div>
                    <label
                        className="block mb-2 font-semibold"
                        style={{
                            color: darkMode ? "#fff" : "#6b21a8",
                        }}
                    >
                        Discount
                    </label>

                    <select
                        value={discount}
                        onChange={(e) =>
                            setDiscount(Number(e.target.value))
                        }
                        className="w-full rounded-xl p-3"
                        style={{
                            background: darkMode ? "#1a1020" : "#ffffff",
                            color: darkMode ? "#ffffff" : "#000000",
                            border: darkMode
                                ? "1px solid #c646b3"
                                : "1px solid #d8b4fe",
                        }}
                    >
                        {Array.from({ length: 81 }, (_, i) => (
                            <option
                                key={i}
                                value={i}
                            >
                                {i}%
                            </option>
                        ))}
                    </select>
                </div>

                {/* Warning */}

                {discount > 60 && (
                    <div className="rounded-xl bg-yellow-100 text-yellow-800 p-3 text-sm font-medium">
                        ⚠ Discounts above 60% may reduce your profit.
                    </div>
                )}

                {/* Live Preview */}

                <div
                    className="rounded-2xl p-5"
                    style={{
                        background: darkMode
                            ? "#211129"
                            : "#faf5ff",
                        border: darkMode
                            ? "1px solid #9333ea"
                            : "1px solid #ddd6fe",
                    }}
                >
                    <h3
                        className="text-xl font-bold mb-4"
                        style={{
                            color: darkMode ? "#fff" : "#6b21a8",
                        }}
                    >
                        Live Preview
                    </h3>

                    <p
                        style={{
                            color: darkMode ? "#fff" : "#444",
                        }}
                    >
                        Category :
                        <span className="font-bold">
                            {" "}
                            {categoryNames[category]}
                        </span>
                    </p>

                    <p
                        className="mt-2"
                        style={{
                            color: darkMode ? "#fff" : "#444",
                        }}
                    >
                        Discount :
                        <span className="font-bold text-green-500">
                            {" "}
                            {discount}% OFF
                        </span>
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-4">
                        <span className="line-through text-gray-500">
                            ₹100
                        </span>

                        <span className="text-2xl font-bold text-pink-500">
                            ₹{previewPrice}
                        </span>

                        <span className="rounded-full bg-green-100 text-green-700 px-3 py-1 text-sm font-bold">
                            {discount}% OFF
                        </span>
                    </div>
                </div>

                {/* Save */}

                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full rounded-xl py-3 text-white font-bold transition hover:scale-[1.01]"
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
                    {loading
                        ? "Saving..."
                        : "Save Category Discount"}
                </button>

                {/* Active Discounts */}

                <div className="pt-5">
                    <h3
                        className="text-xl font-bold mb-4"
                        style={{
                            color: darkMode ? "#fff" : "#6b21a8",
                        }}
                    >
                        Active Category Discounts
                    </h3>

                    {categorySales.length === 0 ? (
                        <p
                            style={{
                                color: darkMode
                                    ? "#9ca3af"
                                    : "#6b7280",
                            }}
                        >
                            No active discounts.
                        </p>
                    ) : (
                        categorySales.map((sale) => (
                            <div
                                key={sale._id}
                                className="flex flex-col sm:flex-row justify-between items-start sm:items-center rounded-2xl p-4 mb-3"
                                style={{
                                    background: darkMode
                                        ? "#211129"
                                        : "#faf5ff",
                                    border: darkMode
                                        ? "1px solid #9333ea"
                                        : "1px solid #ddd6fe",
                                }}
                            >
                                <div>
                                    <p
                                        className="font-bold text-lg"
                                        style={{
                                            color: darkMode
                                                ? "#fff"
                                                : "#6b21a8",
                                        }}
                                    >
                                        {categoryNames[sale.category]}
                                    </p>

                                    <p className="text-green-500 font-semibold">
                                        {sale.discount}% OFF
                                    </p>

                                    <p
                                        className="text-sm mt-1"
                                        style={{
                                            color: darkMode
                                                ? "#9ca3af"
                                                : "#6b7280",
                                        }}
                                    >
                                        Applied to all products in this category.
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        deleteCategoryDiscount(
                                            sale._id
                                        )
                                    }
                                    className="mt-2 sm:mt-0 flex items-center gap-2 rounded-xl bg-red-500 hover:bg-red-600 px-4 py-2 text-white font-semibold transition"
                                >
                                    <Trash2 size={16} />

                                </button>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}
export default CategoryDiscountTab;