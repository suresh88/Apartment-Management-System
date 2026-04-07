import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apartments: JSON.parse(sessionStorage.getItem("apartments")) || [],
};

const apartmentSlice = createSlice({
  name: "apartment",
  initialState,
  reducers: {
    addApartment: (state, action) => {
      state.apartments.push(action.payload);

      // 🔥 save to sessionStorage (NOT localStorage)
      sessionStorage.setItem("apartments", JSON.stringify(state.apartments));
    },
  },
});

export const { addApartment } = apartmentSlice.actions;
export default apartmentSlice.reducer;