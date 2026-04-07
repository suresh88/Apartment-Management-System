import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./Home";
import Hero from "./components/Hero";
import Info from "./components/Info";
import SearchFilter from "./components/SearchFilter";
import Footer from "./components/Footer";

import AdminPage from "./admin/AdminPage";
import ApartmentList from "./components/ApartmentList";
/* import BookingStatus from "./components/BookingStatus"; */
import CreateApartment from "./admin/CreateApartment";
import Login from "./components/Login";
import UserPage from "./components/UserPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/searchfilter" element={<SearchFilter />} />
        <Route path="/info" element={<Info />} />
        <Route path="/footer" element={<Footer />} />
          <Route path="/login" element={<Login/>} />
               <Route path="/user" element={<UserPage/>} />

        {/* Admin Nested Routes */}
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<div className="p-4">Select an option</div>} />
       {/*    <Route path="apartment-list" element={<ApartmentList />} /> */}
          {/* <Route path="booking-status" element={<BookingStatus />} /> */}
          <Route path="create-apartment" element={<CreateApartment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;