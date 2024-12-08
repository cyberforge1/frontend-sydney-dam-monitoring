// src/app/store.ts

import { configureStore } from '@reduxjs/toolkit';
import damsReducer from '../features/dams/damsSlice';
import damResourcesReducer from '../features/damResources/damResourcesSlice';
import damGroupsReducer from '../features/damGroups/damGroupsSlice';
// Import additional reducers as needed

export const store = configureStore({
  reducer: {
    dams: damsReducer,
    damResources: damResourcesReducer,
    damGroups: damGroupsReducer,
    // Add additional reducers here
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
