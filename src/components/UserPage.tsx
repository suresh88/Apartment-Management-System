import React from "react";
import { useSelector } from "react-redux";

const UserPage = () => {
  // Get logged-in user
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser")) || null;

  // Get all bookings
  const bookings = useSelector((state) => state.booking.bookings);

  // Filter bookings for this user
  const userBookings = bookings.filter(
    (b) => b.user?.email === currentUser?.email
  );

  return (
    <div>
      {/* User Info */}
      <div >
        <h1 >
          Welcome, {currentUser?.name || "User"}!
        </h1>
        <p>Email: {currentUser?.email || "N/A"}</p>
      </div>

      {/* User Bookings */}
      <h2 >Your Bookings</h2>

      {userBookings.length > 0 ? (
        <div >
          {userBookings.map((b, index) => (
            <div
              key={index}
              
            >
              <h3 >{b.apartmentName}</h3>
              <p>BHK: {b.bhk}</p>
              <p>Price: Rs. {b.price}</p>
              <p>
                Booking Date:{" "}
                {b.date ? new Date(b.date).toLocaleString() : "N/A"}
              </p>
             <p>Process</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You have no bookings yet.</p>
      )}
    </div>
  );
};

export default UserPage;