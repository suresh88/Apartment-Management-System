import React, { useState } from "react";

const ApartmentModal = ({ apartment, onClose }) => {
  const [selectedBHK, setSelectedBHK] = useState("");

  // File → URL convert
  const imageUrl =
    apartment.mainImage instanceof File
      ? URL.createObjectURL(apartment.mainImage)
      : apartment.image;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center overflow-auto z-50 py-10">
      <div className="bg-white rounded-xl shadow-xl w-11/12 md:w-4/5 lg:w-3/5 p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-1">
          {apartment.name || apartment.title}
        </h2>

        {/* Location */}
        <p className="text-gray-600 mb-4">
          {apartment.location ||
            `${apartment.city}, ${apartment.town}, ${apartment.village}`}
        </p>

        {/* Image */}
        <img
          src={imageUrl}
          alt={apartment.name}
          className="w-full h-72 object-cover rounded-lg mb-6"
        />

        {/* Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Info label="Property Type" value={`${apartment.flattype}`} />
          <Info label="Location" value={`${apartment.city}, ${apartment.town}`} />
          <Info label="Bedrooms" value={Object.keys(apartment.bhkPrices).join(", ")} />
          <Info label="Units" value={apartment.units} />
          <Info label="Blocks" value={apartment.blocks} />
          <Info label="Floors" value={apartment.floors} />
        </div>

        {/* Price Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Price</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(apartment.bhkPrices).map(([bhk, price]) => (
              <div key={bhk} className="bg-green-100 p-4 rounded-lg shadow-sm">
                <p className="font-semibold">{bhk}</p>
                <p className="text-gray-600">Rs. {price || "N/A"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">About the Project</h3>
          <p className="text-gray-700">{apartment.about || apartment.description}</p>
        </div>

        {/* Owner Info */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Owner Details</h3>
          <p className="text-gray-700">Name: {apartment.ownerName}</p>
          <p className="text-gray-700">Mobile: {apartment.ownerMobile}</p>
          <p className="text-gray-700">Email: {apartment.ownerEmail}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md flex-1">
            Book Now
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md flex-1"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

// Reusable Block
const Info = ({ label, value }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
    <p className="font-semibold text-gray-700">{label}</p>
    <p className="text-gray-600">{value}</p>
  </div>
);

export default ApartmentModal;