import React from "react";
import { useSelector } from "react-redux";

const BookingStatus = () => {
  const bookings = useSelector((state) => state.booking.bookings);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Booking Status</h2>

      {bookings.length > 0 ? (
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">User Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Mobile</th>
              <th className="border px-4 py-2">City</th>
              <th className="border px-4 py-2">Town</th>
              <th className="border px-4 py-2">Apartment</th>
              <th className="border px-4 py-2">BHK</th>
              <th className="border px-4 py-2">Booking Date</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{b.user?.name || "N/A"}</td>
                <td className="border px-4 py-2">{b.user?.email || "N/A"}</td>
                <td className="border px-4 py-2">{b.user?.mobile || "N/A"}</td>
                <td className="border px-4 py-2">{b.user?.city || "N/A"}</td>
                <td className="border px-4 py-2">{b.user?.town || "N/A"}</td>
                <td className="border px-4 py-2">{b.apartmentName || "N/A"}</td>
                <td className="border px-4 py-2">{b.bhk || "N/A"}</td>
                <td className="border px-4 py-2">
                  {b.date ? new Date(b.date).toLocaleString() : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No bookings yet.</p>
      )}
    </div>
  );
};

export default BookingStatus;