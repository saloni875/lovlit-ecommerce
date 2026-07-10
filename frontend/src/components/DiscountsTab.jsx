import { useState } from "react";
import ProductDiscountTab from "./ProductDiscountTab.jsx";
import CategoryDiscountTab from "./CategoryDiscountTab.jsx";
import FestivalDiscountTab from "./FestivalDiscountTab.jsx";
import { useThemeStore } from "../stores/useThemeStore.js";

const tabs = [
    {
        id: "product",
        label: "Product Discount",
    },
    {
        id: "category",
        label: "Category Discount",
    },
    {
        id: "festival",
        label: "Festival Discount",
    },
];

const DiscountsTab = () => {
    const {darkMode} = useThemeStore();
    const [activeTab, setActiveTab] = useState("product");

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-6">

            <div className="mb-6">
                <h2
                    className="text-2xl sm:text-3xl font-bold mb-2"
                    style={{
                        color: darkMode ? "#ffffff" : "#6b21a8",
                    }}
                >
                    Manage Discounts
                </h2>

                <p
                    className="text-sm sm:text-base"
                    style={{
                        color: darkMode ? "#d1d5db" : "#6b7280",
                    }}
                >
                    Choose how you want to apply discounts in your store.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">

                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="rounded-2xl p-4 font-semibold transition-all duration-300 shadow-md"
                        style={{
                            background:
                                activeTab === tab.id
                                    ? darkMode
                                        ? "linear-gradient(135deg,#0c090f,#660c5e)"
                                        : "#9333ea"
                                    : darkMode
                                        ? "#1a1020"
                                        : "#ffffff",

                            color:
                                activeTab === tab.id
                                    ? "#ffffff"
                                    : darkMode
                                        ? "#ffffff"
                                        : "#6b21a8",

                            border: darkMode
                                ? "1px solid #c646b3"
                                : "1px solid #d8b4fe",

                            transform:
                                activeTab === tab.id
                                    ? "scale(1.02)"
                                    : "scale(1)",
                        }}
                    >
                        <div className="text-base sm:text-lg">
                            {tab.label}
                        </div>
                    </button>
                ))}

            </div>

            {activeTab === "product" && <ProductDiscountTab />}

            {activeTab === "category" && <CategoryDiscountTab />}

            {activeTab === "festival" && <FestivalDiscountTab />}

        </div>

    );
};

export default DiscountsTab;