import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      stockName: "Company",
      price: "Purchase",
      date: "Date",
    },
  ],
};

export const selectedStocksSlice = createSlice({
  name: "selectedStocks",
  initialState,
  reducers: {
    setSelectedStocks: (state, action: PayloadAction<any>) => {
      state.data.push(action.payload);
    },
  },
});

export const { setSelectedStocks } = selectedStocksSlice.actions;
export default selectedStocksSlice.reducer;
