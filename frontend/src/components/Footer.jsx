import { Instagram, Mail, MessageCircle, MapPin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="mt-10 bg-gradient-to-r from-purple-200 via-white to-pink-100 border-t border-purple-200">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-30">

                {/* Brand */}
                <div>
                    <h2 className="logo-font text-5xl text-purple-700 mb-3">
                        Lovlit
                    </h2>

                    <p className="text-gray-700">
                        Handmade BTS inspired jewelry, accessories & <br /> aesthetic collectibles.
                    </p>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-2xl font-semibold text-purple-700 mb-4">
                        Contact
                    </h3>

                    <div className="space-y-3 text-gray-700">
                        <div className="flex items-center gap-3">
                            <Mail size={18} className="text-purple-700" />
                            <p>lovlitshop@gmail.com</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <MessageCircle size={18} className="text-purple-700" />
                            <p>+91 9876543210</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Instagram size={18} className="text-purple-700" />
                            <p>@lovlit_</p>
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div>
                    <h3 className="text-2xl font-semibold text-purple-700 mb-4">
                        Address
                    </h3>

                    <p className="text-gray-700">
                        New Delhi, India
                    </p>

                    <p className="text-gray-500 mt-6 text-sm">
                        © 2026 Lovlit. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;