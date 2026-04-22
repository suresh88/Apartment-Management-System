import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface Booking {
  user?: {
    name?: string;
    email?: string;
    mobile?: string;
    city?: string;
    town?: string;
  };
  apartmentName?: string;
  price?: number;
  date?: string | number | Date;
}

const BookingStatus: React.FC = () => {
  const bookings = useSelector((state: RootState) => state.booking.bookings as Booking[]);

  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Booking Status</h2>

      {bookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200 shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                <th className="border px-4 py-3">No</th>
                <th className="border px-4 py-3">User Name</th>
                <th className="border px-4 py-3">Email</th>
                <th className="border px-4 py-3">Mobile</th>
                <th className="border px-4 py-3">City</th>
                <th className="border px-4 py-3">Town</th>
                <th className="border px-4 py-3">Apartment</th>
                <th className="border px-4 py-3">Price</th>
                <th className="border px-4 py-3">Booking Date</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b, index) => (
                <tr
                  key={index}
                  className="text-center hover:bg-gray-50 transition"
                >
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2 font-medium text-gray-800">{b.user?.name || "N/A"}</td>
                  <td className="border px-4 py-2 text-gray-600">{b.user?.email || "N/A"}</td>
                  <td className="border px-4 py-2 text-gray-600">{b.user?.mobile || "N/A"}</td>
                  <td className="border px-4 py-2 text-gray-600">{b.user?.city || "N/A"}</td>
                  <td className="border px-4 py-2 text-gray-600">{b.user?.town || "N/A"}</td>
                  <td className="border px-4 py-2 text-gray-600">{b.apartmentName || "N/A"}</td>
                  <td className="border px-4 py-2 text-gray-600">{b.price || "N/A"}</td>
                  <td className="border px-4 py-2 text-gray-600">
                    {b.date ? new Date(b.date).toLocaleString() : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No bookings yet.</p>
      )}
    </div>
  );
};

export default BookingStatus;