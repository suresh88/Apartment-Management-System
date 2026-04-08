import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../slice/bookingSlice";

const ApartmentModal = ({ apartment, onClose }) => {
  const [selectedBHK, setSelectedBHK] = useState("");
  const [showUserForm, setShowUserForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    mobile: "",
    city: "",
    town: "",
  });

  const dispatch = useDispatch();

  // Get logged-in user from Redux
  const currentUser = useSelector((state) => state.auth.currentUser) || {
    name: "",
    email: "",
  };

  // Convert File → URL if needed
  const imageUrl =
    apartment.mainImage instanceof File
      ? URL.createObjectURL(apartment.mainImage)
      : apartment.image;

  // Handle booking confirmation
  const handleBooking = () => {
    // Validate required fields
    if (!userDetails.mobile || !userDetails.city || !userDetails.town) {
      alert("Mobile, City and Town எல்லாவற்றையும் பூர்த்தி செய்யவும்!");
      return;
    }

    const booking = {
      apartmentName: apartment.name,
      bhk: selectedBHK,
      price: apartment.bhkPrices[selectedBHK],
      date: new Date().toISOString(),
      user: {
        name: currentUser.name,
        email: currentUser.email,
        mobile: userDetails.mobile,
        city: userDetails.city,
        town: userDetails.town,
      },
    };

    dispatch(addBooking(booking));
    alert("Booking வெற்றிகரமாக சேமிக்கப்பட்டது!");
    onClose();
  };

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

        {/* Apartment Info */}
        <h2 className="text-3xl font-bold mb-1">
          {apartment.name || apartment.title}
        </h2>
        <p className="text-gray-600 mb-4">
          {apartment.location ||
            `${apartment.city}, ${apartment.town}, ${apartment.village}`}
        </p>
        <img
          src={imageUrl}
          alt={apartment.name}
          className="w-full h-72 object-cover rounded-lg mb-6"
        />

        {/* Apartment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Info label="Property Type" value={apartment.flattype} />
          <Info label="Location" value={`${apartment.city}, ${apartment.town}`} />
          <Info label="Bedrooms" value={Object.keys(apartment.bhkPrices).join(", ")} />
          <Info label="Units" value={apartment.units} />
          <Info label="Blocks" value={apartment.blocks} />
          <Info label="Floors" value={apartment.floors} />
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

        {/* Select BHK */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Select BHK</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(apartment.bhkPrices).map(([bhk, price]) => (
              <label
                key={bhk}
                className={`flex items-center gap-2 p-4 rounded-lg shadow-sm cursor-pointer
                  ${selectedBHK === bhk ? "bg-green-300" : "bg-green-100"}`}
              >
                <input
                  type="radio"
                  name="bhk"
                  value={bhk}
                  checked={selectedBHK === bhk}
                  onChange={() => setSelectedBHK(bhk)}
                  className="form-radio h-5 w-5 text-green-600"
                />
                <div>
                  <p className="font-semibold">{bhk}</p>
                  <p className="text-gray-600">Rs. {price || "N/A"}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Book & Close Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setShowUserForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md flex-1"
          >
            Book Now
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md flex-1"
          >
            Close
          </button>
        </div>

        {/* User Details Popup */}
        {showUserForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
            <div className="bg-white rounded-lg shadow-xl p-6 w-11/12 md:w-2/5 relative">
              <button
                onClick={() => setShowUserForm(false)}
                className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>
              <h3 className="text-2xl font-semibold mb-4">User Details</h3>
              <div className="grid grid-cols-1 gap-4">
                {/* Pre-filled Name & Email */}
                <input
                  type="text"
                  placeholder="Name"
                  value={currentUser.name}
                  disabled
                  className="border p-2 rounded bg-gray-100"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={currentUser.email}
                  disabled
                  className="border p-2 rounded bg-gray-100"
                />

                {/* Manual Inputs */}
                <input
                  type="text"
                  placeholder="Mobile"
                  value={userDetails.mobile}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, mobile: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={userDetails.city}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, city: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Town"
                  value={userDetails.town}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, town: e.target.value })
                  }
                  className="border p-2 rounded"
                />
              </div>
              <button
                onClick={handleBooking}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Info Block
const Info = ({ label, value }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
    <p className="font-semibold text-gray-700">{label}</p>
    <p className="text-gray-600">{value}</p>
  </div>
);

export default ApartmentModal;