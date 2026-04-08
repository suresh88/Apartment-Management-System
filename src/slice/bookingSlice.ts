import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: JSON.parse(sessionStorage.getItem("bookings")) || [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
      sessionStorage.setItem("bookings", JSON.stringify(state.bookings));
    },
  },
});

export const { addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;