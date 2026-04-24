import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Home";
import Hero from "./components/Hero";
import Info from "./components/Info";

import Footer from "./components/Footer";
import AdminPage from "./admin/AdminPage";
import BookingStatus from "./admin/BookingStatus";
import CreateApartment from "./admin/CreateApartment";
import Login from "./components/Login";
import UserPage from "./components/UserPage";
import AdminApartmentList from "./admin/AdminApartmentList";

import About from "./components/About";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API } from "./services/api"
import { login, logout } from "./slice/authSlice"
import ApartmentPage from "./components/ApartmentPage";



function App() {
   const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get("/auth/me");
        dispatch(login(res.data.data));
      } catch {
        dispatch(logout());
      }
    };

    loadUser();
  }, []);
  

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hero" element={<Hero />} />
      
        <Route path="/info" element={<Info />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/userpage" element={<UserPage/>} />
        <Route path="/apartment" element={<ApartmentPage/>} />
        <Route path="/about" element={<About/>}/>
        <Route path="/admin" element={<AdminPage />}>
           <Route index element={<div className="p-4">Select an option</div>} />
           <Route path="adminapartmentlist" element={<AdminApartmentList/>} /> 
           <Route path="bookingstatus" element={<BookingStatus/>} /> 
           <Route path="createapartment" element={<CreateApartment />} />
        </Route>
         
      </Routes>
    </BrowserRouter>
  );
}

export default App;