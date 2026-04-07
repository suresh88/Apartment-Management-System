import { useState } from "react";
import CreateApartment from "./CreateApartment";
import ViewPopup from "./ViewPopup";

const AdminPage = () => {
  const [apartments, setApartments] = useState([]);
  const [viewApartment, setViewApartment] = useState(null);
  const [activeTab, setActiveTab] = useState("list"); // 'list' | 'create' | 'booking'

  const addApartment = (apartment) => {
    setApartments([...apartments, apartment]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs / Buttons */}
      <div className="flex gap-4 mb-6">
         <button
          className={`px-4 py-2 rounded ${activeTab === "list" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
           onClick={() => setActiveTab("list")}
        >
          Apartment List
        </button>
          <button
          className={`px-4 py-2 rounded ${activeTab === "booking" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
         onClick={() => setActiveTab("booking")}
        >
          Booking Status
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "create" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
         onClick={() => setActiveTab("create")}
        >
          Create Apartment
        </button>
       
      
      </div>

      {/* Conditional Rendering */}
      {activeTab === "create" && (
        <CreateApartment onAdd={addApartment} />
      )}

      {activeTab === "list" && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Apartment List</h2>
          <table className="w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Apartment Name</th>
                <th className="border px-4 py-2">Place</th>
                <th className="border px-4 py-2">View</th>
              </tr>
            </thead>
            <tbody>
              {apartments.map((apt, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{apt.name}</td>
                  <td className="border px-4 py-2">{apt.city} / {apt.town}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => setViewApartment(apt)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {apartments.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-gray-500">No apartments added</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "booking" && (
        <div className="bg-white p-6 rounded shadow text-gray-500 text-center">
          <h2 className="text-xl font-bold mb-4">Booking Status</h2>
          <p>Booking Status Table / Info will come here</p>
        </div>
      )}

      {/* View Popup */}
      {viewApartment && (
        <ViewPopup apartment={viewApartment} onClose={() => setViewApartment(null)} />
      )}
    </div>
  );
};

export default AdminPage;