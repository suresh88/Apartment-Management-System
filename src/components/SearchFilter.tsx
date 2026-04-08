import { useState } from "react";

function SearchFilter() {
  const [location, setLocation] = useState("");
  const [selectedBHK, setSelectedBHK] = useState<string[]>([]); // array of selected BHKs
  const [priceRange, setPriceRange] = useState({ low: "", high: "" });

  const handleSearch = () => {
    console.log({
      location,
      bhk: selectedBHK.length > 0 ? selectedBHK : "Any",
      priceLow: priceRange.low,
      priceHigh: priceRange.high,
    });
  };

  const bhkOptions = ["2", "3"]; // Only 2 & 3 BHK

  const toggleBHK = (bhk: string) => {
    if (selectedBHK.includes(bhk)) {
      setSelectedBHK(selectedBHK.filter((b) => b !== bhk)); // deselect
    } else {
      setSelectedBHK([...selectedBHK, bhk]); // select
    }
  };

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

      {/* BHK Buttons */}
      <div className="flex gap-2">
        {bhkOptions.map((option) => (
          <button
            key={option}
            onClick={() => toggleBHK(option)}
            className={`px-4 py-2 rounded-2xl border flex items-center justify-center ${
              selectedBHK.includes(option)
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            <input
              type="checkbox"
              checked={selectedBHK.includes(option)}
              readOnly
              className="mr-2"
            />
            {option} BHK
          </button>
        ))}
      </div>

      {/* Price Inputs */}
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Low Price"
          value={priceRange.low}
          onChange={(e) =>
            setPriceRange({ ...priceRange, low: e.target.value })
          }
          className="border p-2 rounded w-24"
        />
        <input
          type="number"
          placeholder="High Price"
          value={priceRange.high}
          onChange={(e) =>
            setPriceRange({ ...priceRange, high: e.target.value })
          }
          className="border p-2 rounded w-24"
        />
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

export default SearchFilter;