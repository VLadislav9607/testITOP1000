import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CurrenciesSliseState {
  currencies: any[]
}

const initialState: CurrenciesSliseState = {
  currencies: []
}

export const currenciesSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    setCurrencies(state, action: PayloadAction<any>) {
      state.currencies = action.payload;
    }
  }
})

export const { setCurrencies } = currenciesSlice.actions

export default currenciesSlice.reducer
