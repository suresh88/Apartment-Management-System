import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import type { RootState } from "../store/store";
import type { Apartment } from "../type/Apartment";
import { fetchApartments } from "../slice/apartmentSlice";

interface OutletContextType {
  setSelectedApartment: React.Dispatch<
    React.SetStateAction<Apartment | null>
  >;
}

const AdminApartmentList: React.FC = () => {
  const dispatch = useDispatch();

  const { apartments, loading } = useSelector(
    (state: RootState) => state.apartment
  );

  const { setSelectedApartment } =
    useOutletContext<OutletContextType>();

  /*Fetch Data*/
  useEffect(() => {
    dispatch(fetchApartments() as any);
  }, [dispatch]);

  /*Loading*/
  if (loading) {
    return <p className="text-center mt-10">Loading apartments...</p>;
  }

  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Apartment List
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-200 shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
              <th className="border px-4 py-3">ID</th>
              <th className="border px-4 py-3">Apartment Name</th>
              <th className="border px-4 py-3">Place</th>
              <th className="border px-4 py-3">View</th>
            </tr>
          </thead>

          <tbody>
            {apartments && apartments.length > 0 ? (
              apartments.map((apt, index) => (
                <tr
                  key={apt.id || index}
                  className="text-center hover:bg-gray-50 transition"
                >
                  <td className="border px-4 py-2">
                    {index + 1}
                  </td>

                  <td className="border px-4 py-2 font-medium text-gray-800">
                    {apt.title}
                  </td>

                  <td className="border px-4 py-2 text-gray-600">
                    {apt.city} / {apt.area}
                  </td>

                  <td className="border px-4 py-2">
                    <button
                      onClick={() => setSelectedApartment(apt)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-6 text-gray-500 text-center"
                >
                  No apartments added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminApartmentList;