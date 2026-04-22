
import { FaHome, FaHandshake, FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <div className="w-full">

      {/* About Info */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-6 sm:mb-12">
          About Our Apartment
        </h2>

        <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          Our Apartment Management System helps users browse apartments,
          compare prices, book flats, and manage all property information
          easily and transparently. We focus on simplicity, speed, and trust.
        </p>
      </div>

      {/* Mission Vision */}
      <div className="bg-gray-100 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl sm:text-2xl font-bold text-blue-600">Our Mission</h3>
            <p className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed">
              To create a smart and trusted digital system for all apartment needs —
              from searching to booking, everything on one platform.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl sm:text-2xl font-bold text-indigo-600">Our Vision</h3>
            <p className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed">
              To become India’s most reliable apartment marketplace with the best customer experience.
            </p>
          </div>

        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-700 mb-10 sm:mb-12">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">

          <div className="text-center p-6 sm:p-8 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition hover:-translate-y-1">
            <FaHome className="text-blue-600 text-4xl sm:text-5xl mx-auto" />
            <h4 className="text-lg sm:text-xl font-semibold mt-4">Verified Apartments</h4>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Every listing is verified for accuracy.</p>
          </div>

          <div className="text-center p-6 sm:p-8 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition hover:-translate-y-1">
            <FaUsers className="text-green-600 text-4xl sm:text-5xl mx-auto" />
            <h4 className="text-lg sm:text-xl font-semibold mt-4">User Friendly</h4>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Easy navigation with fast search.</p>
          </div>

          <div className="text-center p-6 sm:p-8 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition hover:-translate-y-1">
            <FaHandshake className="text-purple-600 text-4xl sm:text-5xl mx-auto" />
            <h4 className="text-lg sm:text-xl font-semibold mt-4">Transparent Deals</h4>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">No hidden charges — 100% clear process.</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default About;