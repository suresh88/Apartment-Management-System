import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import ViewPopup from "./ViewPopup";

const AdminPage = () => {
  const [selectedApartment, setSelectedApartment] = useState(null);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <NavLink
          to="adminapartmentlist"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${
              isActive ? "bg-blue-500 text-white" : "bg-gray-300"
            }`
          }
        >
          Apartment List
        </NavLink>

        <NavLink
          to="bookingstatus"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${
              isActive ? "bg-blue-500 text-white" : "bg-gray-300"
            }`
          }
        >
          Booking Status
        </NavLink>

        <NavLink
          to="createapartment"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${
              isActive ? "bg-blue-500 text-white" : "bg-gray-300"
            }`
          }
        >
          Create Apartment
        </NavLink>
      </div>

      {/* Pass setSelectedApartment to nested routes */}
      <Outlet context={{ setSelectedApartment }} />

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