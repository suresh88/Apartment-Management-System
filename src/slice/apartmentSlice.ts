import {  createSlice,  createAsyncThunk,  type PayloadAction,} from "@reduxjs/toolkit";
import { API } from "../services/api";
import type { Apartment } from "../type/Apartment";


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
  date?: string | Date;
}

interface ApartmentState {
  apartments: Apartment[];
  bookings: Booking[];
  loading: boolean;
}

/* Initial State */

const initialState: ApartmentState = {
  apartments: [],
  bookings: [],
  loading: false,
};

/* Async Thunk (API CALL) */

export const fetchApartments = createAsyncThunk(
  "apartments/fetchApartments",
  async () => {
    const res = await API.get("/apartments");
      console.log("API RESPONSE:", res.data);
   return res.data?.data?.data || [];
  }
);

/* Slice */

const apartmentSlice = createSlice({
  name: "apartment",
  initialState,
  reducers: {
    /*  Add Appartment in redux*/
    addApartment: (state, action: PayloadAction<Apartment>) => {
        console.log("ADD APARTMENT ACTION:", action.payload);
      state.apartments.push(action.payload);
    },

    /*  Update Appartment in redux  */
 updateApartment: (state, action) => {
  const updated = action.payload;

  const idx = state.apartments.findIndex(
    (a) => String(a.id) === String(updated.id)
  );

  if (idx !== -1) {
    state.apartments[idx] = updated;
  }
},

    /* Delete */
   deleteApartment: (state, action) => {
  state.apartments = state.apartments.filter(
    (a) => String(a.id) !== String(action.payload.id)
  );
},

   
   
  },

  /* Async Reducers manage Api logic  */
  extraReducers: (builder) => {
    builder
      .addCase(fetchApartments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApartments.fulfilled, (state, action) => {
        state.loading = false;
        state.apartments = action.payload;
      })
      .addCase(fetchApartments.rejected, (state) => {
        state.loading = false;
      });
  },
});

/* -------------------- Export -------------------- */

export const {
  addApartment,
  updateApartment,
  deleteApartment,
  
} = apartmentSlice.actions;

export default apartmentSlice.reducer;