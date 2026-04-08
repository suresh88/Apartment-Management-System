import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./Home";
import Hero from "./components/Hero";
import Info from "./components/Info";
import SearchFilter from "./components/SearchFilter";
import Footer from "./components/Footer";

import AdminPage from "./admin/AdminPage";

 import BookingStatus from "./admin/BookingStatus";
import CreateApartment from "./admin/CreateApartment";
import Login from "./components/Login";
import UserPage from "./components/UserPage";
import AdminApartmentList from "./admin/AdminApartmentList";
import Appartment from "./components/Apartment";

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
               <Route path="/userpage" element={<UserPage/>} />

        {/* Admin Nested Routes */}
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<div className="p-4">Select an option</div>} />
           <Route path="adminapartmentlist" element={<AdminApartmentList/>} /> 
          <Route path="bookingstatus" element={<BookingStatus/>} /> 
          <Route path="createapartment" element={<CreateApartment />} />
        </Route>
         <Route path="apartment" element={<Appartment/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;