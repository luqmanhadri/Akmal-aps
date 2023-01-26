import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // store: undefined,
    items : undefined, 
    store : "", 
    quantity : 0,
    dates: [],
    // options: {
    //   adult: undefined,
    //   children: undefined,
    //   amount: undefined,
    // },
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    
    new_search: (state, action) => {
      // state.loading = false;
      state.items = action.payload;
      state.store = action.payload;
      state.quantity = action.payload;
      state.dates = action.payload;
    },
    reset_search: (state) => {
      // state.loading = false;
      // state.error = true;
      return initialState;
    },
    
  },
});

export const { new_search, reset_search } = bookingSlice.actions;

export default bookingSlice.reducer;
