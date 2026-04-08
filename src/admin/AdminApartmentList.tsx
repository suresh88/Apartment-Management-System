import React from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const AdminApartmentList = () => {
  const apartments = useSelector((state) => state.apartment.apartments);
  const { setSelectedApartment } = useOutletContext();
  

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Apartment List</h2>

      <table className="w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Apartment Name</th>
            <th className="border px-4 py-2">Place</th>
            <th className="border px-4 py-2">View</th>
          </tr>
        </thead>

        <tbody>
          {apartments.length > 0 ? (
            apartments.map((apt, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{apt.name}</td>
                <td className="border px-4 py-2">
                  {apt.city} / {apt.town}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => setSelectedApartment(apt)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-4 text-gray-500">
                No apartments added
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminApartmentList;