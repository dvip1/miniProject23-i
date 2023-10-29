import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

export const selectedStocksSlice = createSlice({
  name: "selectedStocks",
  initialState,
  reducers: {
    setSelectedStocks: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { setSelectedStocks } = selectedStocksSlice.actions;
export default selectedStocksSlice.reducer;
