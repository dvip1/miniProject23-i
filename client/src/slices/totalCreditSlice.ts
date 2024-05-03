import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface totalCreditState {
    credit: number
}

const initialState: totalCreditState = {
    credit: 10000
}

const totalCreditSlice = createSlice({
    name: 'credit',
    initialState,
    reducers: {
        setCredit: (state, action: PayloadAction<number>) => {
            state.credit = action.payload
        }
        ,
        increaseCredit: (state, action: PayloadAction<number>) => {
            state.credit += action.payload;
        },
        decreaseCredit: (state, action: PayloadAction<number>) => {
            state.credit -= action.payload;
        }
    }
})

export const { increaseCredit, decreaseCredit, setCredit } = totalCreditSlice.actions;
export default totalCreditSlice.reducer;