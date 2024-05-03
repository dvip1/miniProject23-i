import { configureStore } from "@reduxjs/toolkit";
import selectedStocksSlice from "../slices/selectedStocksSlice";
import authReducer from '../slices/authslice';
import totalCreditSlice from "../slices/totalCreditSlice";
import { AuthState } from "../slices/authslice";
import { SelectedStocksState } from "../slices/selectedStocksSlice";
import { totalCreditState } from "../slices/totalCreditSlice";
import dashReducer from '../slices/dashboardSlice'
import { DashboardState } from '../slices/dashboardSlice'
export interface RootState {
  selectedStocks: SelectedStocksState;
  auth: AuthState;
  credit: totalCreditState
  dashboard: DashboardState
}

export const store = configureStore({
  reducer: {
    selectedStocks: selectedStocksSlice,
    auth: authReducer,
    credit: totalCreditSlice,
    dashboard: dashReducer
  },

});
export default store;
