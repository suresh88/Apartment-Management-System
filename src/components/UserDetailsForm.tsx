import React, { useState } from "react";
import type { User } from "../type/User";
import type { UserDetails } from "../type/UserDetails";
import type {Error} from"../type/Error"
interface Props {
 currentUser: User | null;
 userDetails: UserDetails;
 setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>;
  onClose: () => void;
  onConfirm: () => void;
}

const UserDetailsForm: React.FC<Props> = ({
  currentUser,
  userDetails,
  setUserDetails,
  onClose,
  onConfirm,
}) => {
  const [errors, setErrors] = useState({
    mobile: "",
    city: "",
    town: "",
  });

  const validate = () => {
  const tempErrors: Error = {
        mobile: "",
  city: "",
  town: "",
    };

    tempErrors.mobile =
      userDetails.mobile.trim() === ""
        ? "Mobile number is required"
        : userDetails.mobile.length !== 10
        ? "Mobile must be 10 digits"
        : "";

    tempErrors.city =
      userDetails.city.trim() === "" ? "City is required" : "";

    tempErrors.town =
      userDetails.town.trim() === "" ? "Town is required" : "";

    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleConfirm = () => {
    if (validate()) {
      onConfirm();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center  z-60">
      <div className="bg-white rounded-lg shadow-xl p-6 w-11/12 md:w-2/5 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>

        <h3 className="text-2xl font-semibold mb-4">User Details</h3>

        <div className="grid grid-cols-1 gap-4">

          {/* Name */}
          <div>
            <input
              type="text"
              value={currentUser?.name || ""}
              disabled
              className="border p-2 rounded bg-gray-100 w-full"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              value={currentUser?.email || ""}
              disabled
              className="border p-2 rounded bg-gray-100 w-full"
            />
          </div>

          {/* Mobile */}
          <div>
            <input
              type="text"
              placeholder="Mobile"
              value={userDetails.mobile}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  mobile: e.target.value.replace(/[^0-9]/g, ""),
                })
              }
              maxLength={10}
              className={`border p-2 rounded w-full ${
                errors.mobile ? "border-red-500" : ""
              }`}
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* City */}
          <div>
            <input
              type="text"
              placeholder="City"
              value={userDetails.city}
              onChange={(e) =>
                setUserDetails({ ...userDetails, city: e.target.value })
              }
              className={`border p-2 rounded w-full ${
                errors.city ? "border-red-500" : ""
              }`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          {/* Town */}
          <div>
            <input
              type="text"
              placeholder="Town"
              value={userDetails.town}
              onChange={(e) =>
                setUserDetails({ ...userDetails, town: e.target.value })
              }
              className={`border p-2 rounded w-full ${
                errors.town ? "border-red-500" : ""
              }`}
            />
            {errors.town && (
              <p className="text-red-500 text-sm mt-1">{errors.town}</p>
            )}
          </div>
        </div>

        <button
          onClick={handleConfirm}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default UserDetailsForm;