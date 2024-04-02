import { configureStore } from "@reduxjs/toolkit";
import selectedStocksSlice from "../slices/selectedStocksSlice";
import authReducer from '../slices/authslice';
import { AuthState } from "../slices/authslice";
import { SelectedStocksState } from "../slices/selectedStocksSlice";

export interface RootState {
  selectedStocks: SelectedStocksState;
  auth: AuthState;
}

export const store = configureStore({
  reducer: {
    selectedStocks: selectedStocksSlice,
    auth: authReducer,
  },

});
export default store;
