// src/app/store.ts

import { configureStore } from '@reduxjs/toolkit';
import damsReducer from '../features/dams/damsSlice';
import damResourcesReducer from '../features/damResources/damResourcesSlice';
import damGroupsReducer from '../features/damGroups/damGroupsSlice';

export const store = configureStore({
  reducer: {
    dams: damsReducer,
    damResources: damResourcesReducer,
    damGroups: damGroupsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
