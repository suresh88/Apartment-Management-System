import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apartments: JSON.parse(sessionStorage.getItem("apartments")) || [],
  bookings: JSON.parse(sessionStorage.getItem("bookings")) || [], // ✅ Booking data
};

const apartmentSlice = createSlice({
  name: "apartment",
  initialState,
  reducers: {
    addApartment: (state, action) => {
      state.apartments.push(action.payload);
      sessionStorage.setItem("apartments", JSON.stringify(state.apartments));
    },

    updateApartment: (state, action) => {
      const idx = state.apartments.findIndex(a => a.id === action.payload.id);
      if (idx !== -1) state.apartments[idx] = action.payload;
      sessionStorage.setItem("apartments", JSON.stringify(state.apartments));
    },

    deleteApartment: (state, action) => {
      state.apartments = state.apartments.filter(a => a.id !== action.payload.id);
      sessionStorage.setItem("apartments", JSON.stringify(state.apartments));
    },

    // ✅ Booking add பண்ண
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
      sessionStorage.setItem("bookings", JSON.stringify(state.bookings));
    },
  },
});

export const { addApartment, updateApartment, deleteApartment, addBooking } = apartmentSlice.actions;
export default apartmentSlice.reducer;