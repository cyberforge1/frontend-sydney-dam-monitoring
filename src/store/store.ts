// # src/store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import damsReducer from '../features/dams/damsSlice'; // Dams slice reducer
import damResourcesReducer from '../features/damResources/damResourcesSlice'; // Dam resources slice reducer
import damGroupsReducer from '../features/damGroups/damGroupsSlice'; // Dam groups slice reducer

// Configure the Redux store with reducers
const store = configureStore({
    reducer: {
        dams: damsReducer,
        damResources: damResourcesReducer,
        damGroups: damGroupsReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
