import { useCallback,useState, useEffect } from "react";
import ApartmentCard from "./ApartmentCard";
import ApartmentModal from "./ApartmentModal";
import type { Apartment } from "../type/Apartment";
import { API } from "../services/api";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const ApartmentPage = () => {
 const navigate = useNavigate();

  const [apartments, setApartments] = useState <Apartment[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Filters
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");


  const [page, setPage] = useState(1);
  const perPage = 6;

  const [selectedApartment, setSelectedApartment] = useState <Apartment | null>(null);
const currentUser = useSelector(
  (state: RootState) => state.auth.currentUser
);
 
  const fetchApartments =useCallback( async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

if (city) params.append("city", city.trim());
if (area) params.append("area", area.trim());
if (minPrice) params.append("minPrice", minPrice);
if (maxPrice) params.append("maxPrice", maxPrice);

      params.append("page", page.toString());
      params.append("limit", perPage.toString());
  

      const res = await API.get(`/apartments?${params.toString()}`);
     

      setApartments(res.data.data.data);
      setTotalPages(res.data.data.totalPages);
    } catch (err) {
      console.error("Error fetching apartments:", err);
    } finally {
      setLoading(false);
    }
  }, [city, area, minPrice, maxPrice, page]); 

  // Filters  Page change → API call
useEffect(() => {
  const timer = setTimeout(() => {
    fetchApartments();
  }, 400);

  return () => clearTimeout(timer);
}, [fetchApartments]);


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Available Apartments
      </h1>

      {/* Filters */}
      <div className="grid md:grid-cols-5 gap-4 mb-6">
        <input
          className="p-2 border rounded"
          placeholder="City"
          value={city}
          onChange={(e) => {
            
            setPage(1);
            setCity(e.target.value);
          }}
        />

        <input
          className="p-2 border rounded"
          placeholder="Area"
          value={area}
          onChange={(e) => {
            setPage(1);
            setArea(e.target.value);
          }}
        />

        <input
          type="number"
          className="p-2 border rounded"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => {
            setPage(1);
            setMinPrice(e.target.value);
          }}
        />

        <input
          type="number"
          className="p-2 border rounded"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => {
            setPage(1);
            setMaxPrice(e.target.value);
          }}
        />
      </div>

      {/* Loading */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {!loading && apartments.length === 0 && (
          <p className="text-center text-xl col-span-3">No Apartments Found</p>
        )}

        {apartments.map((apt) => (
          <ApartmentCard
            key={apt.id}
            apartment={apt}
             onView={() => {
      if (!currentUser) {
        alert("Please login first!");
        navigate("/login");
        return;
      }

      setSelectedApartment(apt);
    }}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-3 py-1">Page {page}</span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedApartment && (
        <ApartmentModal
          apartment={selectedApartment}
          onClose={() => setSelectedApartment(null)}
        />
      )}
    </div>
  );
};

export default ApartmentPage;