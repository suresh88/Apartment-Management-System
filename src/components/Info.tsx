import React from "react";

function Info() {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl text-gray-600 md:text-4xl font-medium mb-12">
          We Make A Difference
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-30">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <h3 /* className="text-3xl font-bold text-red-500 mb-2" */>130cr+</h3>
            <p className="text-gray-600 font-medium">Brokerage Saved Monthly</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <h3 /* className="text-3xl font-bold text-green-500 mb-2" */>30 Lakh+</h3>
            <p className="text-gray-600 font-medium">Customers Connected Monthly</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <h3 /* className="text-3xl font-bold text-purple-500 mb-2" */>2 Lakh+</h3>
            <p className="text-gray-600 font-medium">New Listings Monthly</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;