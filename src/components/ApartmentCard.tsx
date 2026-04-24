import React, { useMemo,useEffect } from "react";
import type { Apartment } from "../type/Apartment";

interface ApartmentCardProps {
  apartment: Apartment;
  onView: (apartment: Apartment) => void;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment, onView }) => {
  //image preview
 
  const preview = useMemo(() => {
    if (!apartment.image) return "";

    if (apartment.image instanceof File) {
      return URL.createObjectURL(apartment.image);
    }

    if (typeof apartment.image === "string") {
      return apartment.image.replace(
        "http://localhost:5000",
        "https://retinal-lark-phony.ngrok-free.dev"
      );
    }

    return "";
  }, [apartment.image]);

  // 
  useEffect(() => {
    return () => {
      if (apartment.image instanceof File && preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, apartment.image]);

  // Location
  const fullLocation = [apartment.city, apartment.area]
    .filter(Boolean)
    .join(", ");
  return (
    <div className="bg-white border rounded-lg overflow-hidden w-full max-w-xs mx-auto shadow-md">
      
      {/* Image*/}
      {preview ? (
        <img
          src={preview}
          alt={apartment.title}
          className="h-44 w-full object-cover"
        />
      ) : (
        <div className="h-44 w-full bg-gray-200 flex items-center justify-center">
          No Image
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{apartment.title}</h2>
        <p className="text-gray-600 text-sm mt-1">{fullLocation}</p>

        <div className="flex justify-between text-xs mt-3">
          <div>
            <p className="text-gray-400">Flats</p>
            <p className="font-semibold">{apartment.noOfFlats}</p>
          </div>
          <div>
            <p className="text-gray-400">Price</p>
            <p className="font-semibold">₹ {apartment.price}</p>
          </div>
        </div>

        <button
          onClick={() => onView(apartment)}
          className="mt-3 w-full py-2 text-sm bg-blue-600 text-white rounded-md"
        >
          VIEW
        </button>
      </div>
    </div>
  );
};

export default ApartmentCard;