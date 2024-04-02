import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Stock {
  stockName: string;
  price: string;
  date: string;
}

export interface SelectedStocksState {
  data: Stock[];
}

const initialState: SelectedStocksState = {
  data: [
    {
      stockName: "Company",
      price: "Purchase",
      date: "Date",
    },
  ],
};

const selectedStocksSlice = createSlice({
  name: 'selectedStocks',
  initialState,
  reducers: {
    setSelectedStocks: (state, action: PayloadAction<Stock>) => {
      state.data.push(action.payload);
    },
  },
});

export const { setSelectedStocks } = selectedStocksSlice.actions;
export default selectedStocksSlice.reducer;