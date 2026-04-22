// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import apartmentReducer from "../slice/apartmentSlice";
import bookingReducer from "../slice/bookingSlice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
     apartment: apartmentReducer,
         booking: bookingReducer,
     
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;