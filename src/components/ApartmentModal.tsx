import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../slice/bookingSlice";
import type { Apartment } from "../type/Apartment";
import type { User } from "../type/User";
import type { RootState } from "../store/store";
import UserDetailsForm from "./UserDetailsForm";

interface ApartmentModalProps {
  apartment: Apartment;
  onClose: () => void;
}

interface UserDetails {
  mobile: string;
  city: string;
  town: string;
}

const ApartmentModal: React.FC<ApartmentModalProps> = ({ apartment, onClose }) => {
  const [showUserForm, setShowUserForm] = useState(false);

  const [userDetails, setUserDetails] = useState<UserDetails>({
    mobile: "",
    city: "",
    town: "",
  });

  // Image state
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!apartment.image) return;

    // File upload
    if (apartment.image instanceof File) {
      const url = URL.createObjectURL(apartment.image);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }

    // Backend image (string)
    if (typeof apartment.image === "string") {
      setImageUrl(
        apartment.image.replace(
          "http://localhost:5000",
          "https://retinal-lark-phony.ngrok-free.dev"
        )
      );
    }
  }, [apartment.image]);

  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state: RootState) => state.auth.currentUser as User | null
  );

  const handleBooking = () => {
    if (!userDetails.mobile || !userDetails.city || !userDetails.town) {
      alert("Mobile, City and Town must be filled!");
      return;
    }

    const booking = {
      apartmentName: apartment.title,
      price: apartment.price,
      date: new Date().toISOString(),
      user: {
        name: currentUser?.name,
        email: currentUser?.email,
        mobile: userDetails.mobile,
        city: userDetails.city,
        town: userDetails.town,
      },
    };

    dispatch(addBooking(booking));
    alert("Booking Successful!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      
      {/* Modal Box */}
      <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-4/5 lg:w-3/5 max-h-[90vh] flex flex-col overflow-hidden relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-3xl text-gray-500 hover:text-black"
        >
          &times;
        </button>

        {/* Scroll Area */}
        <div className="p-6 overflow-y-auto">

          {/* Title */}
          <h2 className="text-3xl font-bold mb-1">{apartment.title}</h2>
          <p className="text-gray-500 mb-4">
            {apartment.city}, {apartment.area}
          </p>

          {/* Image*/}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={apartment.title}
              className="w-full h-72 object-cover rounded-xl mb-6 hover:scale-105 transition"
            />
          ) : (
            <div className="w-full h-72 bg-gray-200 flex items-center justify-center rounded-xl mb-6">
              No Image
            </div>
          )}

          {/*Description */}
          <div className="mb-6">
            <Info label="Description" value={apartment.description} />
          </div>

          {/*  Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Info label="City" value={apartment.city} />
            <Info label="Area" value={apartment.area} />
            <Info label="Price" value={`₹ ${apartment.price}`} />
            <Info label="Flats" value={apartment.noOfFlats} />
          </div>

          {/* Owner */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-2">Owner Details</h3>
            <p>Name: {apartment.ownerName}</p>
            <p>Mobile: {apartment.contactNumber}</p>
            <p>Email: {apartment.email}</p>
          </div>
        </div>

        {/*Footer Buttons */}
        <div className="flex gap-4 p-4 border-t bg-white shadow-inner">
          <button
            onClick={() => setShowUserForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex-1 transition"
          >
            Book Now
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg flex-1 transition"
          >
            Close
          </button>
        </div>

        {/* User Form */}
        {showUserForm && (
          <UserDetailsForm
            currentUser={currentUser}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            onClose={() => setShowUserForm(false)}
            onConfirm={handleBooking}
          />
        )}
      </div>
    </div>
  );
};

/* Info Card */
const Info = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) => (
  <div className="bg-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold text-gray-800">{value || "-"}</p>
  </div>
);

export default ApartmentModal;