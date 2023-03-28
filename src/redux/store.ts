import { configureStore } from '@reduxjs/toolkit';
import converter from './slices/converterSlice';
import currencies from './slices/currenciesSlice';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';

export const store = configureStore({
  reducer: {
    converter,
    currencies
  },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
