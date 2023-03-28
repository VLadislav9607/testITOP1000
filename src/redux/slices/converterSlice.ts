import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IConverterSliceState {
  valueInputFrom: any,
  valueInputTo: any,
  selectCurrencyFrom: string,
  selectCurrencyTo: string,
}

const initialState: IConverterSliceState = {
  valueInputFrom: '',
  valueInputTo: '',
  selectCurrencyFrom: 'UA',
  selectCurrencyTo: 'USD'
}

export const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    setValueInputFrom(state, action: PayloadAction<any>) {
      state.valueInputFrom = action.payload;
    },
    setValueInputTo(state, action: PayloadAction<any>) {
      state.valueInputTo = action.payload;
    },
    setSelectCurrencyFrom(state, action: PayloadAction<string>) {
      state.selectCurrencyFrom = action.payload;
    },
    setSelectCurrencyTo(state, action: PayloadAction<string>) {
      state.selectCurrencyTo = action.payload;
    }
  },
})

export const { setValueInputFrom, setValueInputTo, setSelectCurrencyFrom, setSelectCurrencyTo } = converterSlice.actions

export default converterSlice.reducer
