import React from "react";
import ApartmentList from "./ApartmentList";

const Appartment = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Apartments</h1>
      <ApartmentList />
    </div>
  );
};

export default Appartment;