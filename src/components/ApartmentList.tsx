import React, { useState } from "react";
import ApartmentCard from "./ApartmentCard";
import ApartmentModal from "./ApartmentModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ApartmentList = () => {
  const [selectedApartment, setSelectedApartment] = useState(null);
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.currentUser);

  // 🔥 Admin add பண்ணிய apartments-ஐ Redux store-லிருந்து எடுப்பது
  const apartments = useSelector((state) => state.apartment.apartments);

  const handleView = (apartment) => {
    if (!currentUser) {
      alert("Please login first to view apartment details!");
      navigate("/login");
    } else {
      setSelectedApartment(apartment);
    }
  };

  return (
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {apartments.length === 0 ? (
          <p className="text-gray-500 text-center col-span-3">
            No apartments available.
          </p>
        ) : (
          apartments.map((item, index) => (
            <ApartmentCard key={index} apartment={item} onView={handleView} />
          ))
        )}

      </div>

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