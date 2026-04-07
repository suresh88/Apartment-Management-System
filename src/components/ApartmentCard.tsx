import React from "react";

const ApartmentCard = ({ apartment, onView }) => {
  // Convert File to URL
  const imageUrl =
    apartment.mainImage instanceof File
      ? URL.createObjectURL(apartment.mainImage)
      : apartment.image;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-sm border">
      {/* IMAGE */}
      <img
        src={imageUrl}
        alt={apartment.title}
        className="h-56 w-full object-cover"
      />

      {/* CONTENT SECTION */}
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{apartment.name || apartment.title}</h2>
        </div>

        {/* LOCATION */}
        <p className="flex gap-2 text-gray-600 mt-1">
          {apartment.location ||
            `${apartment.city ? apartment.city + "," : ""} ${apartment.town}`}
        </p>

        {/* LINE */}
        <div className="w-full h-px bg-gray-200 my-4"></div>

        {/* DETAILS */}
        <div className="flex justify-between text-sm">
          <div>
            <p className="text-gray-400">TOTAL UNITS</p>
            <p className="font-semibold">{apartment.units}</p>
          </div>

          <div>
            <p className="text-gray-400">BEDROOMS</p>
            <p className="font-semibold">
              {apartment.bhk || Object.keys(apartment.bhkPrices).join(", ")}
            </p>
          </div>
        </div>

        {/* VIEW BUTTON */}
        <button
          onClick={() => onView(apartment)}
          className="mt-4 w-full text-black font-semibold py-2 rounded-md"
        >
          VIEW
        </button>
      </div>
    </div>
  );
};

export default ApartmentCard;