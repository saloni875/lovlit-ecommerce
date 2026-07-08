import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useThemeStore } from "../stores/useThemeStore";

const faqs = [
    {
        question: "How do I place an order on Lovlit?",
        answer:
            "Sign in to your Lovlit account, choose your favorite product, click Buy Now or Add to Cart, enter your delivery details, and place your order currenlty on whatsApp. Your order will be confirmed.",
    },
    {
        question: "Are Lovlit products handmade?",
        answer:
            "Yes. Most Lovlit products are carefully handmade with attention to every detail. Small variations make each item unique.",
    },
    {
        question: "Do I have to pay shipping charges?",
        answer:
            "Yes. Shipping charges are paid by the customer. The shipping cost is displayed during checkout.",
    },
    {
        question: "Where does Lovlit deliver?",
        answer:
            "Currently, Lovlit delivers only within India. International shipping will be available in a future update.",
    },
    {
        question: "Can I cancel or change my order?",
        answer:
            "If your order has not been packed or shipped, contact us or we would as soon as possible. We'll do our best to help.",
    },
    {
        question: "How long does delivery take?",
        answer:
            "Most orders are delivered within 7-10 business days after dispatch. Handmade products may require extra preparation time.",
    },
    {
        question: "How can I contact Lovlit?",
        answer:
            "You can reach us through our Contact page or our official social media accounts. We'll be happy to help.",
    },
];

const FAQSection = () => {
    const { darkMode } = useThemeStore();
    const [open, setOpen] = useState(null);

    return (

        <section
            className="py-16 px-4 transition-all duration-300"
            style={{
                background: darkMode
                    ? "linear-gradient(135deg,#0c090f,#660c5e)"
                    : "linear-gradient(to right,#e9d5ff,#ffffff,#fbcfe8)",
            }}
        >
            <div className="max-w-4xl mx-auto">

                <div className="text-center mb-10">

                    <p
                        className={`uppercase tracking-[0.35em] text-xs font-semibold ${darkMode ? "text-pink-400" : "text-pink-500"
                            }`}
                    >
                        NEED HELP?
                    </p>

                    <h2
                        className={`mt-3 text-3xl sm:text-4xl font-bold ${darkMode ? "text-white" : "text-purple-700"
                            }`}
                    >
                        Frequently Asked Questions
                    </h2>

                </div>

                <div className="space-y-4">

                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl border overflow-hidden ${darkMode
                                ? "border-fuchsia-700"
                                : "border-purple-200"
                                }`}
                            style={{
                                background: darkMode
                                    ? "linear-gradient(135deg,#18111f,#3b0b39)"
                                    : "#ffffff",
                            }}
                        >
                            <button
                                onClick={() =>
                                    setOpen(open === index ? null : index)
                                }
                                className="w-full flex justify-between items-center text-left p-4 sm:p-5"
                            >
                                <span
                                    className={`font-semibold text-sm sm:text-lg ${darkMode
                                        ? "text-white"
                                        : "text-purple-700"
                                        }`}
                                >
                                    {faq.question}
                                </span>

                                {open === index ? (
                                    <ChevronUp
                                        className={
                                            darkMode
                                                ? "text-white"
                                                : "text-purple-700"
                                        }
                                    />
                                ) : (
                                    <ChevronDown
                                        className={
                                            darkMode
                                                ? "text-white"
                                                : "text-purple-700"
                                        }
                                    />
                                )}
                            </button>

                            {open === index && (
                                <div
                                    className={`px-4 sm:px-5 pb-5 text-xs sm:text-base leading-7 ${darkMode
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                        }`}
                                >
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}

                </div>

                <p
                    className={`text-center mt-10 text-sm ${darkMode
                        ? "text-gray-400"
                        : "text-gray-600"
                        }`}
                >
                    Didn't find your answer? Contact us anytime—we're happy to help.
                </p>

            </div>
        </section>


    );
};

export default FAQSection;