import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import ViewPopup from "./ViewPopup";
import type { Apartment } from "../type/Apartment";

const AdminPage = () => {
  const [selectedApartment, setSelectedApartment] = useState < Apartment | null> (null);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:flex gap-3 sm:gap-4 mb-6">
        <NavLink
          to="adminapartmentlist"
          className={({ isActive }) =>
            `text-center px-4 py-2 rounded-lg transition ${
              isActive ? "bg-blue-600 text-white shadow-md" : "bg-gray-300 hover:bg-gray-400"
            }`
          }
        >
          Apartment List
        </NavLink>

        <NavLink
          to="bookingstatus"
          className={({ isActive }) =>
            `text-center px-4 py-2 rounded-lg transition  ${
              isActive ? "bg-blue-600 text-white shadow-md" : "bg-gray-300 hover:bg-gray-400"
            }`
          }
        >
          Booking Status
        </NavLink>

        <NavLink
          to="createapartment"
          className={({ isActive }) =>
            `text-center px-4 py-2 rounded-lg transition ${
              isActive ? "bg-blue-600 text-white shadow-md" : "bg-gray-300 hover:bg-gray-400"
            }`
          }
        >
          Create Apartment
        </NavLink>
      </div>

   
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">

      <Outlet context={{ setSelectedApartment }} />
       </div>

      {/* Popup Show */}
      {selectedApartment && (
        <ViewPopup
          apartment={selectedApartment}
          onClose={() => setSelectedApartment(null)}
        />
      )}
    </div>
  );
};

export default AdminPage;