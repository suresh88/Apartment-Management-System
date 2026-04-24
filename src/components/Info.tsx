import React from "react";
import { FaRupeeSign, FaUsers, FaHome } from "react-icons/fa";

const Info: React.FC = () => {
  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-semibold mb-16 text-gray-700">
          We Make A Difference
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border">
            <FaRupeeSign className="text-red-500 text-5xl mx-auto mb-4" />
            <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-500">
              130 Cr+
            </h3>
            <p className="text-gray-600 mt-2 font-medium">
              Brokerage Saved Monthly
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border">
            <FaUsers className="text-green-500 text-5xl mx-auto mb-4" />
            <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-green-500 to-teal-500">
              30 Lakh+
            </h3>
            <p className="text-gray-600 mt-2 font-medium">
              Customers Connected Monthly
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border">
            <FaHome className="text-purple-600 text-5xl mx-auto mb-4" />
            <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-500">
              2 Lakh+
            </h3>
            <p className="text-gray-600 mt-2 font-medium">
              New Listings Monthly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;