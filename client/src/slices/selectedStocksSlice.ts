import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Stock {
  stockName: string;
  price: string;
  date: string;
  quantity: string
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
      quantity: "Quantity",
    },
  ],
};

const selectedStocksSlice = createSlice({
  name: 'selectedStocks',
  initialState,
  reducers: {
    setSelectedStocks: (state, action: PayloadAction<Stock>) => {
      const existingIndex = state.data.findIndex(stock => stock.stockName === action.payload.stockName);
      if ((existingIndex !== -1)) {
        state.data[existingIndex].quantity += action.payload.quantity;
        state.data[existingIndex].price += action.payload.price
      }
      else
        state.data.push(action.payload);
    },
    deleteSelectedStock: (state, action: PayloadAction<number>) => {
      state.data.splice(action.payload, 1);
    },
  },
});

export const { setSelectedStocks, deleteSelectedStock } = selectedStocksSlice.actions;
export default selectedStocksSlice.reducer;