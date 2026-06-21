import { Instagram, Mail, MessageCircle, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="relative z-50 mt-10 bg-gradient-to-r from-purple-200 via-white to-pink-100 border-t border-purple-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div>
                        <h2 className="logo-font text-4xl sm:text-5xl text-purple-700 mb-3">
                            Lovlit
                        </h2>

                        <p className="text-sm sm:text-base text-gray-700">
                            Handmade BTS inspired jewelry,
                            accessories and aesthetic collectibles.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg sm:text-2xl font-semibold text-purple-700 mb-4">
                            Contact
                        </h3>

                        <div className="space-y-3 text-xs sm:text-base text-gray-700">

                            <a
                                href="mailto:lovlitshop@gmail.com"
                                className="flex items-center gap-2 hover:text-purple-700 transition"
                            >
                                <Mail size={16} />
                                <p>lovlitshop@gmail.com</p>
                            </a>

                            <a
                                href="https://wa.me/918583094531"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-purple-700 transition"
                            >
                                <MessageCircle size={16} />
                                <p>+91 85830 94531</p>
                            </a>

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
                        <h3 className="text-lg sm:text-2xl font-semibold text-purple-700 mb-4">
                            Policies
                        </h3>

                        <div className="flex flex-col gap-2 text-xs sm:text-base text-gray-700">

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

                        <div className="flex items-center gap-2 text-sm sm:text-base text-gray-700">
                            <MapPin size={16} />
                            <p>Kolkata, India</p>
                        </div>
                    </div>

                </div>

                <p className="text-xs sm:text-sm text-gray-700 mt-8 text-center">
                    © 2026 Lovlit. All rights reserved.
                </p>

            </div>
        </footer>
    );
};

export default Footer;