import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { useThemeStore } from "../stores/useThemeStore";

const ContactPage = () => {
  const { darkMode } = useThemeStore();

  return (
    <div
      className="min-h-screen py-16 px-4"
      style={{
        background: darkMode
          ? "linear-gradient(135deg,#0c090f,#660c5e)"
          : "linear-gradient(to right,#e9d5ff,#ffffff,#fbcfe8)",
      }}
    >
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-10">
          <p
            className={`uppercase tracking-[0.35em] text-xs font-semibold ${darkMode ? "text-pink-400" : "text-pink-500"
              }`}
          >
            WE'D LOVE TO HEAR FROM YOU
          </p>

          <h1
            className={`mt-2 text-3xl font-bold ${darkMode ? "text-white" : "text-purple-700"
              }`}
          >
            Contact Us
          </h1>

          <p
            className={`mt-3 ${darkMode ? "text-gray-300" : "text-gray-600"
              }`}
          >
            Have a question or need help? We're always happy to assist.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div
            className={`rounded-3xl p-4 shadow-xl ${darkMode
              ? "bg-[#18111f] border border-fuchsia-700"
              : "bg-white border border-purple-200"
              }`}
          >

            <h2
              className={`text-2xl font-bold mb-3 ${darkMode ? "text-white" : "text-purple-700"
                }`}
            >
              Contact Information
            </h2>

            <div className="space-y-6">

              <a
                href="mailto:lovlitshop@gmail.com"
                className="flex items-center gap-3 hover:text-pink-500 transition"
              >
                <Mail className="text-pink-500" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p>lovlitshop@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+918583094531"
                className="flex items-center gap-3 hover:text-pink-500 transition"
              >
                <Phone className="text-pink-500" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p>+91 85830 94531</p>
                </div>
              </a>

              <a
                href="https://instagram.com/lovlit_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-pink-500 transition"
              >
                <Instagram className="text-pink-500" />
                <div>
                  <p className="font-semibold">Instagram</p>
                  <p>@lovlit_</p>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <MapPin className="text-pink-500" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p>India</p>
                </div>
              </div>

            </div>
          </div>

          <div
            className={`rounded-3xl p-4 shadow-xl ${darkMode
              ? "bg-[#18111f] border border-fuchsia-700"
              : "bg-white border border-purple-200"
              }`}
          >

            <h2
              className={`text-2xl font-bold mb-3 ${darkMode ? "text-white" : "text-purple-700"
                }`}
            >
              Send Us a Message
            </h2>

            <form className="space-y-4">

              <input
                type="text"
                placeholder="Your Name"
                className={`w-full rounded-xl border p-2 outline-none transition ${darkMode
                  ? "bg-[#23152f] text-white border-fuchsia-700 placeholder:text-gray-400"
                  : "bg-white text-black border-purple-200 placeholder:text-gray-500"
                  }`}
              />

              <input
                type="email"
                placeholder="Email Address"
                className={`w-full rounded-xl border p-2 outline-none transition ${darkMode
                  ? "bg-[#23152f] text-white border-fuchsia-700 placeholder:text-gray-400"
                  : "bg-white text-black border-purple-200 placeholder:text-gray-500"
                  }`}
              />

              <input
                type="text"
                placeholder="Subject"
                className={`w-full rounded-xl border p-2 outline-none transition ${darkMode
                  ? "bg-[#23152f] text-white border-fuchsia-700 placeholder:text-gray-400"
                  : "bg-white text-black border-purple-200 placeholder:text-gray-500"
                  }`}
              />

              <textarea
                rows="5"
                placeholder="Write your message..."
                className={`w-full rounded-xl border p-2 outline-none transition ${darkMode
                  ? "bg-[#23152f] text-white border-fuchsia-700 placeholder:text-gray-400"
                  : "bg-white text-black border-purple-200 placeholder:text-gray-500"
                  }`}
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
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
                Send Message
              </button>

            </form>

          </div>
          
        </div><p
            className={`mt-4 text-center text-xl ${darkMode ? "text-gray-300" : "text-gray-600"
              }`}
          >
            We usually respond within <span className="font-semibold text-pink-500">24 hours</span>.
            Thank you for contacting Lovlit!
          </p>
      </div>
    </div>
  );
};

export default ContactPage;