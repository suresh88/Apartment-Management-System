import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


/* ---------------- Booking Type ---------------- */
interface Booking {
  user?: {
    name?: string;
    email?: string;
    mobile?: string;
    city?: string;
    town?: string;
  };
  apartmentName?: string;
  price?: number;
  date?: string | number | Date;
}

/* ---------------- Initial State ---------------- */
const initialState = {
  bookings: JSON.parse(sessionStorage.getItem("bookings") || "[]"),
};

/* ---------------- Slice ---------------- */
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);

      sessionStorage.setItem(
        "bookings",
        JSON.stringify(state.bookings)
      );
    },
  },
});

export const { addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;