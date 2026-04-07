const ViewPopup = ({ apartment, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4">{apartment.name}</h2>

        <p className="mb-2"><strong>Place:</strong> {apartment.city} / {apartment.town} / {apartment.village}</p>
        <p className="mb-2"><strong>BHK Prices:</strong> 1 BHK: {apartment.bhkPrices["1 BHK"]}, 2 BHK: {apartment.bhkPrices["2 BHK"]}, 3 BHK: {apartment.bhkPrices["3 BHK"]}</p>
        <p className="mb-2"><strong>Units:</strong> {apartment.units} | <strong>Blocks:</strong> {apartment.blocks} | <strong>Floors:</strong> {apartment.floors}</p>
        <p className="mb-2"><strong>About:</strong> {apartment.about}</p>
        <p className="mb-2"><strong>Owner:</strong> {apartment.ownerName} | {apartment.ownerMobile} | {apartment.ownerEmail}</p>

        {apartment.mainImage && (
          <img src={URL.createObjectURL(apartment.mainImage)} alt="Main" className="my-2 max-h-60 object-cover" />
        )}
        {apartment.subImages.length > 0 && (
          <div className="flex gap-2 my-2 overflow-x-auto">
            {apartment.subImages.map((img, idx) => (
              <img key={idx} src={URL.createObjectURL(img)} alt={`Sub ${idx}`} className="h-20 object-cover rounded" />
            ))}
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ViewPopup;