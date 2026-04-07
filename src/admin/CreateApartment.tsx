import { useState } from "react";
import { useDispatch } from "react-redux";
import { addApartment } from "../slice/apartmentSlice"

const CreateApartment = () => {
  const dispatch = useDispatch();

  const [apartment, setApartment] = useState({
    name: "",
    flattype: "",
    bhkPrices: {  "2 BHK": "", "3 BHK": "" },
    city: "",
    town: "",
    village: "",
    units: "",
    blocks: "",
    floors: "",
    mainImage: null,
    subImages: [],
    about: "",
    ownerName: "",
    ownerMobile: "",
    ownerEmail: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "mainImage") {
      setApartment({ ...apartment, mainImage: files[0] });
    } else if (name === "subImages") {
      setApartment({ ...apartment, subImages: Array.from(files) });
    } else {
      setApartment({ ...apartment, [name]: value });
    }
  };

  const handleBhkPriceChange = (bhk, value) => {
    setApartment({
      ...apartment,
      bhkPrices: { ...apartment.bhkPrices, [bhk]: value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 Redux store-க்கு data add பண்ண்றது
    dispatch(addApartment(apartment));

    alert("Apartment Created Successfully!");

    // Reset form
    setApartment({
      name: "",
       flattype: "",
      bhkPrices: {  "2 BHK": "", "3 BHK": "" },
      city: "",
      town: "",
      village: "",
      units: "",
      blocks: "",
      floors: "",
      mainImage: null,
      subImages: [],
      about: "",
      ownerName: "",
      ownerMobile: "",
      ownerEmail: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Create New Apartment</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          name="name"
          placeholder="Apartment Name"
          value={apartment.name}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
          required
        />
          <input
          type="text"
          name="flattype"
          placeholder="Flat Type"
          value={apartment.flattype}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
          required
        />

        <div className="flex gap-2">
          {["2 BHK", "3 BHK"].map((bhk) => (
            <input
              key={bhk}
              type="number"
              placeholder={`${bhk} Price`}
              value={apartment.bhkPrices[bhk]}
              onChange={(e) => handleBhkPriceChange(bhk, e.target.value)}
              className="border px-4 py-2 rounded flex-1"
              required
            />
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={apartment.city}
            onChange={handleChange}
            className="border px-4 py-2 rounded flex-1"
            required
          />
          <input
            type="text"
            name="town"
            placeholder="Town"
            value={apartment.town}
            onChange={handleChange}
            className="border px-4 py-2 rounded flex-1"
            required
          />
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            name="units"
            placeholder="Units"
            value={apartment.units}
            onChange={handleChange}
            className="border px-4 py-2 rounded flex-1"
          />
          <input
            type="number"
            name="blocks"
            placeholder="Blocks"
            value={apartment.blocks}
            onChange={handleChange}
            className="border px-4 py-2 rounded flex-1"
          />
          <input
            type="number"
            name="floors"
            placeholder="Floors"
            value={apartment.floors}
            onChange={handleChange}
            className="border px-4 py-2 rounded flex-1"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Main Image:</label>
          <input type="file" name="mainImage" accept="image/*" onChange={handleChange} />

          <label>Sub Images:</label>
          <input type="file" name="subImages" accept="image/*" multiple onChange={handleChange} />
        </div>

        <textarea
          name="about"
          placeholder="About Apartment"
          value={apartment.about}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
          rows={3}
        />

        <div className="flex gap-2">
          <input
            type="text"
            name="ownerName"
            placeholder="Owner Name"
            value={apartment.ownerName}
            onChange={handleChange}
            className="border px-4 py-2 rounded flex-1"
          />
          <input
            type="text"
            name="ownerMobile"
            placeholder="Owner Mobile"
            value={apartment.ownerMobile}
            onChange={handleChange}
            className="border px-4 py-2 rounded flex-1"
          />
          <input
            type="email"
            name="ownerEmail"
            placeholder="Owner Email"
            value={apartment.ownerEmail}
            onChange={handleChange}
            className="border px-4 py-2 rounded flex-1"
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="px-6 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Add Apartment
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateApartment;