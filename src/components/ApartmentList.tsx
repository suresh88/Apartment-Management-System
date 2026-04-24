import React, { useState, useEffect } from "react";
import ApartmentCard from "./ApartmentCard";
import ApartmentModal from "./ApartmentModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { Apartment } from "../type/Apartment";
import { useDispatch } from "react-redux";
import { fetchApartments } from "../slice/apartmentSlice";
import type { User } from "../type/User";
import type { AppDispatch } from "../store/store";

interface ApartmentListProps {
  limit?: number;
}

const ApartmentList: React.FC<ApartmentListProps> = ({ limit }) => {
  const dispatch = useDispatch<AppDispatch>();
  //fatch apartment details
  useEffect(() => {
    dispatch(fetchApartments());
  }, []);

  //
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
    null,
  );
  const navigate = useNavigate();
  //store the redux data
  const currentUser = useSelector(
    (state: RootState) => state.auth.currentUser as User | null,
  );
  const apartments = useSelector(
    (state: RootState) => state.apartment.apartments as Apartment[],
  );

  // show 6 card login
  const displayedApartments = limit ? apartments.slice(0, limit) : apartments;
  // click the viwe button if login show the flat details but don't login go to login frist
  const handleView = (apartment: Apartment) => {
    if (!currentUser) {
      alert("Please login first!");
      navigate("/login");
    } else {
      setSelectedApartment(apartment);
    }
  };

  return (
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedApartments.length === 0 ? (
          <p className="text-gray-500 text-center col-span-3">
            No apartments available.
          </p>
        ) : (
          displayedApartments.map((item, index) => (
            <ApartmentCard key={index} apartment={item} onView={handleView} />
          ))
        )}
      </div>

      {limit && apartments.length > limit && (
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/apartment")}
            className="px-8 py-3 border border-blue-600 text-blue-600 rounded-full 
               hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            View More
          </button>
        </div>
      )}

      {selectedApartment && (
        <ApartmentModal
          apartment={selectedApartment}
          onClose={() => setSelectedApartment(null)}
        />
      )}
    </div>
  );
};

export default ApartmentList;
