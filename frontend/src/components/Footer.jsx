import { Instagram, Mail, MessageCircle, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useThemeStore } from "../stores/useThemeStore";

const Footer = () => {
    const { darkMode } = useThemeStore();

    return (
        <footer
            className="relative z-50 mt-10"
            style={{
                background: darkMode
                    ? "linear-gradient(135deg, #0c090f, #660c5e)"
                    : "linear-gradient(to right, rgb(233 213 255), white, rgb(251 207 232))",
                borderTop: darkMode
                    ? "1px solid #c646b3"
                    : "1px solid #e9d5ff",
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div>
                        <h2 className="logo-font text-4xl sm:text-5xl text-purple-700 mb-3">
                            Lovlit
                        </h2>

                        <p
                            className="text-sm sm:text-base"
                            style={{
                                color: darkMode ? "#ffffff" : "#374151",
                            }}
                        >
                            Thoughtfully handmade for every milestone, celebration and small win. Because the right gift becomes a memory.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg sm:text-2xl font-semibold text-purple-700 mb-4">
                            Contact
                        </h3>

                        <div className="space-y-3 text-xs sm:text-base" style={{ color: darkMode ? "#ffffff" : "#374151" }}>

                            <a
                                href="mailto:lovlitshop@gmail.com"
                                className="flex items-center gap-2 hover:text-purple-700 transition"
                            >
                                <Mail size={16} />
                                <p>lovlitshop@gmail.com</p>
                            </a>

                            {/* <a
                                href="https://wa.me/918583094531"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-purple-700 transition"
                            >
                                <MessageCircle size={16} />
                                <p>+91 85830 94531</p>
                            </a> */}

                            {/* <a
                                href="https://wa.me/918583094531?text=Hello Lovlit, I'm interested in your handmade gifts. Could you share more details and options?"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-purple-700 transition"
                            >
                                <MessageCircle size={16} />
                                <p></p>
                            </a> */}

                            <a
                                href="https://www.instagram.com/lovlit_/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-purple-700 transition"
                            >
                                <Instagram size={16} />
                                <p>@lovlit_</p>
                            </a>

                        </div>
                    </div>

                    {/* Policies */}
                    <div>
                        <h3 className="text-lg sm:text-2xl font-semibold text-purple-700 mb-4" >
                            Policies
                        </h3>

                        <div className="flex flex-col gap-2 text-xs sm:text-base" style={{ color: darkMode ? "#ffffff" : "#423751" }}>

                            <Link
                                to="/privacy-policy"
                                className="cursor-pointer hover:text-purple-700 hover:underline transition"
                            >
                                Privacy Policy
                            </Link>

                            <Link
                                to="/terms-and-conditions"
                                className="cursor-pointer hover:text-purple-700 hover:underline transition"
                            >
                                Terms & Conditions
                            </Link>

                            <Link
                                to="/shipping-policy"
                                className="cursor-pointer hover:text-purple-700 hover:underline transition"
                            >
                                Shipping Policy
                            </Link>

                            <Link
                                to="/refund-policy"
                                className="cursor-pointer hover:text-purple-700 hover:underline transition"
                            >
                                Refund Policy
                            </Link>

                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <h3 className="text-lg sm:text-2xl font-semibold text-purple-700 mb-4">
                            Address
                        </h3>

                        <div className="flex items-center gap-2 text-sm sm:text-base" style={{ color: darkMode ? "#ffffff" : "#374151" }}>
                            <MapPin size={16} />
                            <p>Kolkata, India</p>
                        </div>
                    </div>

                </div>

                <p
                    className="text-sm sm:text-base text-center mt-8"
                    style={{
                        color: darkMode ? "#ffffff" : "#374151",
                    }}
                >
                    © 2026 Lovlit. All rights reserved.
                </p>

            </div>
        </footer>
    );
};

export default Footer;