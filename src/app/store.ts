// src/app/store.ts

import { configureStore } from '@reduxjs/toolkit';
import { damsApi } from '../services/damsApi';

export const store = configureStore({
  reducer: {
    [damsApi.reducerPath]: damsApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(damsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
