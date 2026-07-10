import { useThemeStore } from "../stores/useThemeStore";

const CategoryDiscountTab = () => {
    const { darkMode } = useThemeStore();
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
                Product Discount
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
                Apply the same discount to every product in one category.
            </p>

            <p
                className="text-center py-10"
                style={{
                    color: darkMode ? "#9ca3af" : "#6b7280",
                }}
            >
                Category discount settings will appear here.
            </p>
        </div>
    );
};

export default CategoryDiscountTab;