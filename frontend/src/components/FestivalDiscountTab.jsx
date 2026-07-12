import { useState, useEffect } from "react";
import { CalendarDays, Gift } from "lucide-react";
import { useThemeStore } from "../stores/useThemeStore";
import { useFestivalSaleStore } from "../stores/useFestivalSaleStore";

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

const FestivalDiscountTab = () => {
    const { darkMode } = useThemeStore();

    const {
        festivalSales,
        fetchFestivalSales,
        saveFestivalSale,
        deleteFestivalSale,
        loading,
    } = useFestivalSaleStore();

    const [festivalName, setFestivalName] = useState("");

    const [discount, setDiscount] = useState(0);

    const [startDate, setStartDate] = useState("");

    const [endDate, setEndDate] = useState("");

    const [applyToAll, setApplyToAll] = useState(true);

    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        fetchFestivalSales();
    }, []);

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(
                selectedCategories.filter(
                    (item) => item !== category
                )
            );
        } else {
            setSelectedCategories([
                ...selectedCategories,
                category,
            ]);
        }
    };

    const handleSave = async () => {
        await saveFestivalSale({
            festivalName,
            discount,
            startDate,
            endDate,
            applyToAll,
            active: true,
            categories: applyToAll
                ? []
                : selectedCategories,
        });

        setFestivalName("");
        setDiscount(0);
        setStartDate("");
        setEndDate("");
        setSelectedCategories([]);
        setApplyToAll(true);

        fetchFestivalSales();
    };

    const previewPrice = (
        100 -
        (discount * 100) / 100
    ).toFixed(2);
    return (
        <div
            className="rounded-3xl shadow-xl border p-6"
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
                className="text-3xl font-bold flex items-center gap-2 mb-2"
                style={{
                    color: darkMode ? "#fff" : "#6b21a8",
                }}
            >
                <Gift size={28} />
                Festival Discount
            </h2>

            <p
                className="mb-6"
                style={{
                    color: darkMode ? "#d1d5db" : "#6b7280",
                }}
            >
                Create limited-time discounts for festivals or special events.
            </p>

            <div className="space-y-5">

                {/* Festival Name */}

                <div>
                    <label
                        className="block mb-2 font-semibold"
                        style={{
                            color: darkMode ? "#fff" : "#6b21a8",
                        }}
                    >
                        Festival Name
                    </label>

                    <input
                        type="text"
                        value={festivalName}
                        onChange={(e) =>
                            setFestivalName(e.target.value)
                        }
                        placeholder="Diwali Sale"
                        className="w-full rounded-xl p-3"
                        style={{
                            background: darkMode ? "#1a1020" : "#ffffff",
                            color: darkMode ? "#ffffff" : "#000000",
                            border: darkMode
                                ? "1px solid #c646b3"
                                : "1px solid #d8b4fe",
                        }}
                    />
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

                {/* Dates */}

                <div className="grid md:grid-cols-2 gap-4">

                    <div>
                        <label
                            className="block mb-2 font-semibold"
                            style={{
                                color: darkMode ? "#fff" : "#6b21a8",
                            }}
                        >
                            Start Date
                        </label>

                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) =>
                                setStartDate(e.target.value)
                            }
                            className="w-full rounded-xl p-3"
                            style={{
                                background: darkMode ? "#1a1020" : "#ffffff",
                                color: darkMode ? "#ffffff" : "#000000",
                                border: darkMode
                                    ? "1px solid #c646b3"
                                    : "1px solid #d8b4fe",
                            }}
                        />
                    </div>

                    <div>
                        <label
                            className="block mb-2 font-semibold"
                            style={{
                                color: darkMode ? "#fff" : "#6b21a8",
                            }}
                        >
                            End Date
                        </label>

                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) =>
                                setEndDate(e.target.value)
                            }
                            className="w-full rounded-xl p-3"
                            style={{
                                background: darkMode ? "#1a1020" : "#ffffff",
                                color: darkMode ? "#ffffff" : "#000000",
                                border: darkMode
                                    ? "1px solid #c646b3"
                                    : "1px solid #d8b4fe",
                            }}
                        />
                    </div>

                </div>

                {/* Apply Entire Store */}

                <label className="flex items-center gap-3">

                    <input
                        type="checkbox"
                        checked={applyToAll}
                        onChange={() =>
                            setApplyToAll(!applyToAll)
                        }
                    />

                    <span
                        style={{
                            color: darkMode ? "#fff" : "#444",
                        }}
                    >
                        Apply to Entire Store
                    </span>

                </label>

                {/* Categories */}

                {!applyToAll && (

                    <div>

                        <label
                            className="block mb-3 font-semibold"
                            style={{
                                color: darkMode ? "#fff" : "#6b21a8",
                            }}
                        >
                            Choose Categories
                        </label>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                            {categories.map((cat) => (

                                <label
                                    key={cat}
                                    className="flex items-center gap-2"
                                >

                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(cat)}
                                        onChange={() =>
                                            toggleCategory(cat)
                                        }
                                    />

                                    <span
                                        style={{
                                            color: darkMode
                                                ? "#fff"
                                                : "#444",
                                        }}
                                    >
                                        {categoryNames[cat]}
                                    </span>

                                </label>

                            ))}

                        </div>

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
                        🎉 Live Preview
                    </h3>

                    <p
                        style={{
                            color: darkMode ? "#fff" : "#444",
                        }}
                    >
                        <b>{festivalName || "Festival Name"}</b>
                    </p>

                    <p className="text-green-500 font-semibold mt-2">
                        {discount}% OFF
                    </p>

                    <div className="flex items-center gap-3 mt-4">

                        <span className="line-through text-gray-500">
                            ₹100
                        </span>

                        <span className="text-2xl font-bold text-pink-500">
                            ₹{previewPrice}
                        </span>

                        <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-bold">
                            {discount}% OFF
                        </span>

                    </div>

                </div>

                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700"
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
                        : "Save Festival Discount"}
                </button>

            </div>
            <div className="mt-10">

                <h3
                    className="text-2xl font-bold mb-5"
                    style={{
                        color: darkMode ? "#fff" : "#6b21a8",
                    }}
                >
                    Active Festival Discounts
                </h3>

                {festivalSales.length === 0 ? (

                    <div
                        className="rounded-xl p-6 text-center"
                        style={{
                            background: darkMode
                                ? "#1b1123"
                                : "#faf5ff",
                        }}
                    >
                        No active festivals.
                    </div>

                ) : (

                    festivalSales.map((sale) => {

                        const today = new Date();

                        const start = new Date(sale.startDate);

                        const end = new Date(sale.endDate);

                        let status = "Upcoming";

                        let color = "#f59e0b";

                        if (today >= start && today <= end) {
                            status = "Active";
                            color = "#10b981";
                        }

                        if (today > end) {
                            status = "Expired";
                            color = "#ef4444";
                        }

                        return (

                            <div
	key={sale._id}
	className="rounded-2xl p-5 mb-5 shadow-lg"
	style={{
		background: darkMode ? "#211129" : "#faf5ff",
		border: darkMode
			? "1px solid #9333ea"
			: "1px solid #ddd6fe",
	}}
>
	<div className="flex justify-between items-start flex-wrap gap-5">

		<div>

			<h3
				className="text-2xl font-bold mb-2"
				style={{
					color: darkMode ? "#fff" : "#6b21a8",
				}}
			>
				🎉 {sale.festivalName}
			</h3>

			<p className="text-green-500 font-bold text-lg">
				💸 {sale.discount}% OFF
			</p>

			<p
				className="mt-3"
				style={{
					color: darkMode
						? "#d1d5db"
						: "#6b7280",
				}}
			>
				📅
				{" "}
				{new Date(sale.startDate).toLocaleDateString()}
				{" "}
				→
				{" "}
				{new Date(sale.endDate).toLocaleDateString()}
			</p>

			<p
				className="mt-2"
				style={{
					color: darkMode
						? "#d1d5db"
						: "#6b7280",
				}}
			>
				🏷️ Applies To :
				{" "}

				{sale.applyToAll
					? "Entire Store"
					: sale.categories.join(", ")}
			</p>

		</div>

		<div className="flex flex-col gap-3">

			<span
				className="px-4 py-2 rounded-full text-white font-bold text-center"
				style={{
					background:
						status === "Active"
							? "#10b981"
							: status === "Upcoming"
							? "#f59e0b"
							: "#ef4444",
				}}
			>
				{status}
			</span>

			<button
				onClick={() =>
					deleteFestivalSale(sale._id)
				}
				className="bg-red-500 hover:bg-red-600 rounded-xl px-5 py-2 text-white font-semibold"
			>
				Delete
			</button>

		</div>

	</div>
</div>

                        );

                    })

                )}

            </div>
        </div>
    );
}
export default FestivalDiscountTab;