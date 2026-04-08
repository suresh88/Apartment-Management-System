import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateApartment, deleteApartment } from "../slice/apartmentSlice";

const ViewPopup = ({ apartment, onClose }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...apartment });

  // Main Image URL
  const mainImageUrl =
    formData.mainImage instanceof File
      ? URL.createObjectURL(formData.mainImage)
      : formData.mainImage || formData.image;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    dispatch(updateApartment(formData));
    setEditMode(false);
    alert("Apartment updated!");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this apartment?")) {
      dispatch(deleteApartment({ id: apartment.id }));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center overflow-auto z-50 py-6">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-4/5 lg:w-2/3 p-4 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl font-bold text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>

        {/* Apartment Name */}
        <h2 className="text-2xl font-bold mb-4">{formData.title}</h2>

        {/* Main Image */}
        {mainImageUrl && (
          <img
            src={mainImageUrl}
            alt={formData.title}
            className="w-full h-48 object-cover rounded mb-4"
          />
        )}

        {/* description */}
        {editMode ? (
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-4"
          />
        ) : (
          <p className="text-sm mb-4">
            <strong>Description:</strong> {formData.description || "N/A"}
          </p>
        )}

        {/* Info Table */}
        <div>
          {["description","city","town","noOfFlats","ownerName","ownerMobile","ownerEmail"].map((key) => (
            <Info
              key={key}
              label={key}
              value={editMode ? (
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="border p-1 rounded w-full"
                />
              ) : (
                formData[key]
              )}
            />
          ))}

          {/* BHK Prices */}
         {/* BHK Prices */}
{Object.entries(formData.bhkPrices).map(([bhk, price]) => (
  <Info
    key={bhk}
    label={bhk}
    value={
      editMode ? (
        <input
          type="text"
          value={price}
          onChange={(e) =>
            setFormData({
              ...formData,
              bhkPrices: { ...formData.bhkPrices, [bhk]: e.target.value },
            })
          }
          className="border p-1 rounded w-full"
        />
      ) : (
        price || "N/A"
      )
    }
  />
))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          {editMode ? (
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
            >
              Edit
            </button>
          )}

          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
          >
            Delete
          </button>

          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-3 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Info component
const Info = ({ label, value }) => (
  <div className="flex justify-between border-b py-1">
    <span className="font-semibold text-gray-700">{label}:</span>
    <span className="text-gray-600">{value}</span>
  </div>
);

export default ViewPopup;