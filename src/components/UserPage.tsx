import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { User } from "../type/User";
type Booking = {
  apartmentName: string;
  price: string | number;
  date: string;
  user: User;
};


const UserPage: React.FC = () => {


  const currentUser = useSelector(
    (state: RootState) => state.auth.currentUser
  );

  const bookings: Booking[]  = useSelector((state: RootState) => state.booking.bookings);

  const userBookings = bookings.filter(
    (b) => b.user?.email === currentUser?.email
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">

      {/*User Header*/}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Welcome, {currentUser?.name || "User"}!
        </h1>
        <p className="text-gray-500 mt-1">
          {currentUser?.email || "N/A"}
        </p>
      </div>

      {/*Booking Title*/}
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Your Bookings
      </h2>

      {/*Empty State*/}
      {userBookings.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-gray-500 text-center">
          You have no bookings yet
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {userBookings.map((b, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-5 border"
            >
              <h3 className="text-lg font-bold text-gray-800">
                {b.apartmentName}
              </h3>

              <div className="mt-3 space-y-2 text-sm text-gray-600">
               

                <p>
                  <span className="font-semibold text-gray-700">Price:</span>{" "}
                  ₹ {b.price}
                </p>

                <p>
                  <span className="font-semibold text-gray-700">Date:</span>{" "}
                  {b.date
                    ? new Date(b.date).toLocaleString()
                    : "N/A"}
                </p>
              </div>

              <div className="mt-4">
                <span className="px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">
                  In Process
                </span>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default UserPage;