// slices/dashboardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DashboardState {
  selectedPeriod: string | null;
  selectedCompany: string | null;
  Data: any;
}

const initialState: DashboardState = {
  selectedPeriod: null,
  selectedCompany: null,
  Data: null,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSelectedPeriod: (state, action: PayloadAction<string>) => {
      state.selectedPeriod = action.payload;
    },
    setSelectedCompany: (state, action: PayloadAction<string>) => {
      state.selectedCompany = action.payload;
    },
    setData: (state, action: PayloadAction<any>) => {
      state.Data = action.payload;
    },
  },
});

export const { setSelectedPeriod, setSelectedCompany, setData } = dashboardSlice.actions;

export default dashboardSlice.reducer;