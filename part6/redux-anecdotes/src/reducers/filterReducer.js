import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    changeFilter(state, action) {
      const fitlerValue = action.payload;
      return fitlerValue;
    },
  },
});

export default filterSlice.reducer;
export const { changeFilter } = filterSlice.actions;
