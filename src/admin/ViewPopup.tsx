import React, { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { updateApartment, deleteApartment } from "../slice/apartmentSlice";
import type { Apartment } from "../type/Apartment";
import { API } from "../services/api";
interface ViewPopupProps {
  apartment: Apartment;
  onClose: () => void;
}

const ViewPopup: React.FC<ViewPopupProps> = ({ apartment, onClose }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Apartment>({ ...apartment });
 const fields: (keyof Apartment)[] = [
    "title",
    "price",
    "city",
    "area",
    "noOfFlats",
    "ownerName",
    "contactNumber",
    "email",
  ];
  
  const mainImageUrl =
    formData.image instanceof File
      ? URL.createObjectURL(formData.image)      
       : typeof formData.image === "string"
    ? formData.image.replace("http://localhost:5000", "https://retinal-lark-phony.ngrok-free.dev") : "";

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 const handleSave = async () => {
  try {
    const id = formData.id || formData._id;
        const payload = {
      title: formData.title,
      price: formData.price,
      city: formData.city,
      area: formData.area,
      noOfFlats: formData.noOfFlats,
description: formData.description,
      ownerName: formData.ownerName,
      contactNumber: formData.contactNumber,
      email: formData.email,
    };

    const res = await API.put(
      `apartments/${id}`,
      payload
    );

    dispatch(updateApartment(res.data.data)); // Redux update
    setEditMode(false);

    alert("Apartment updated!");
  } catch (err) {
    console.log("Update error:", err);
  }
};

const handleDelete = async () => {
  if (!window.confirm("Are you sure?")) return;

  try {
    const id = apartment.id || apartment._id;

    await API.delete(`/apartments/remove/${id}`);

    dispatch(deleteApartment({ id })); // Redux remove
    onClose();

    alert("Deleted successfully!");
  } catch (err) {
    console.log("Delete error:", err);
  }
};

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-6 relative flex flex-col md:flex-row gap-6">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl font-bold text-gray-600 hover:text-red-500"
        >
          &times;
        </button>

        {/* Left: Image */}
        {mainImageUrl && (
          <div className="flex-shrink-0 w-full md:w-1/3 rounded-lg overflow-hidden shadow-sm">
            <img
              src={mainImageUrl}
              alt={formData.title}
              className="w-full h-56 object-cover"
            />
          </div>
        )}

        {/* Right: Info */}
        <div className="flex-1 flex flex-col justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{formData.title}</h2>
            <p className="text-gray-500 mb-2">{formData.city} / {formData.area}</p>
            <div className="mb-2"><p>Description: </p><p className=" text-gray-700"> {apartment.description}</p></div>
            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
             {fields.map((key) => (
  <Info
    key={key}
    label={key}
    value={
      editMode ? (
        <input
          type="text"
          name={key}
          value={
          typeof formData[key] === "string" ||
          typeof formData[key] === "number"
            ? formData[key]
            : ""
        }
          onChange={handleChange}
          className="border p-1 rounded w-full text-gray-700 text-sm"
        />
      ) : (
         typeof formData[key] === "string" ||
      typeof formData[key] === "number"
        ? formData[key]
        : "-"
      )
    }
  />
))}
            
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-2">
            {editMode ? (
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md"
              >
                Edit
              </button>
            )}

            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md"
            >
              Delete
            </button>

            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }: { label: string; value: string | number | null | undefined }) => (
  <div className="flex flex-col">
    <span className="font-semibold text-gray-700 capitalize text-sm">{label}</span>
    <span className="text-gray-600 text-sm">{value}</span>
  </div>
);

export default ViewPopup;