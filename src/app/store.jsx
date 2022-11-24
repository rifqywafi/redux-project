import { configureStore } from '@reduxjs/toolkit';
import pegawaiReducer from '../features/pegawai/pegawaiSlice';
import provinsiReducer from '../features/pegawai/provinsiSlice';

export const store = configureStore({
  reducer: {
    pegawai: pegawaiReducer,
    provinsi: provinsiReducer,
  },
});
