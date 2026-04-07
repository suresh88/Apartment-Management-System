import { useState } from "react";

 function SearchFilter () {
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState([0, 3000000]); // range
  const [bhk, setBhk] = useState("");

  const handleSearch = () => {
    console.log({ location, price, bhk });
  };

  const bhkOptions = ["1", "2", "3", "4"];

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
      {/* Location */}
      <input
        type="text"
        placeholder="Enter city"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Price Range */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Price (₹)</label>
        <input
          type="range"
          min="0"
          max="3000000"
          step="100000"
          value={price[1]}
          onChange={(e) => setPrice([0, Number(e.target.value)])}
          className="w-48"
        />
        <span className="text-sm text-gray-500">
          ₹{price[0].toLocaleString()} - ₹{price[1].toLocaleString()}
        </span>
      </div>

      {/* BHK Buttons */}
      <div className="flex gap-2">
        {bhkOptions.map((option) => (
          <button
            key={option}
            onClick={() => setBhk(option)}
            className={`px-4 py-2 rounded-2xl border ${
              bhk === option
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {option} BHK
          </button>
        ))}
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
      >
        Search
      </button>
    </div>
  );
}
export default SearchFilter