import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-white">EasyHome</h2>
          <p className="text-gray-400 mt-3 text-sm leading-relaxed">
            Your trusted partner to find the perfect apartment with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/apartment" className="hover:text-white transition">Apartments</a></li>
            <li><a href="/about" className="hover:text-white transition">About</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>

          <p className="flex md:items-center justify-center md:justify-start gap-2 text-gray-400 mb-2">
            <FaPhone /> +91 90477 20775
          </p>
          <p className="flex md:items-center justify-center md:justify-start gap-2 text-gray-400 mb-2">
            <FaEnvelope /> info@easyhome.com
          </p>
          <p className="flex md:items-center justify-center md:justify-start gap-2 text-gray-400">
            <FaMapMarkerAlt /> Tamil Nadu, India
          </p>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl justify-center md:justify-start">

            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-pink-600 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-sky-500 transition"
            >
              <FaTwitter />
            </a>

          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-5 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} EasyHome. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;