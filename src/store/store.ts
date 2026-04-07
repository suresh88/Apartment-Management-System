// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import apartmentReducer from "../slice/apartmentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
     apartment: apartmentReducer,
  },
});