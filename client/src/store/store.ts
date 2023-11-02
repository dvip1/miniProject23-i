import { configureStore } from "@reduxjs/toolkit";
import selectedStocksSlice from "../slices/selectedStocksSlice";

export const store = configureStore({
  reducer: {
    selectedStocks: selectedStocksSlice,
  },
});

export default store;
