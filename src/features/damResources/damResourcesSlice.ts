// src/features/damResources/damResourcesSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchLatestDataById,
  fetchAllLatestData,
  fetchSpecificDamAnalysisById,
} from '../../api/api';
import { DamResource, DamAnalysis } from '../../types/types';

// Define the state interface
export interface DamResourcesState {
  latestData: DamResource[];
  specificDamAnalyses: DamAnalysis[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DamResourcesState = {
  latestData: [],
  specificDamAnalyses: [],
  status: 'idle',
  error: null,
};

// Thunk to fetch all latest dam data
export const fetchAllLatestDataThunk = createAsyncThunk<DamResource[], void>(
  'damResources/fetchAllLatestData',
  async () => {
    const response = await fetchAllLatestData();
    return response;
  }
);

// Thunk to fetch latest data by dam ID
export const fetchLatestDataByIdThunk = createAsyncThunk<DamResource, string>(
  'damResources/fetchLatestDataById',
  async (damId: string) => {
    const response = await fetchLatestDataById(damId);
    return response;
  }
);

// Thunk to fetch specific dam analysis by dam ID
export const fetchSpecificDamAnalysisByIdThunk = createAsyncThunk<
  DamAnalysis[],
  string
>('damResources/fetchSpecificDamAnalysisById', async (damId: string) => {
  const response = await fetchSpecificDamAnalysisById(damId);
  return response;
});

const damResourcesSlice = createSlice({
  name: 'damResources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLatestDataThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllLatestDataThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.latestData = action.payload;
      })
      .addCase(fetchAllLatestDataThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch latest dam data';
      })
      .addCase(fetchLatestDataByIdThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLatestDataByIdThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.latestData.findIndex(
          (data) => data.dam_id === action.payload.dam_id
        );
        if (index !== -1) {
          state.latestData[index] = action.payload;
        } else {
          state.latestData.push(action.payload);
        }
      })
      .addCase(fetchLatestDataByIdThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch latest dam data by ID';
      })
      .addCase(fetchSpecificDamAnalysisByIdThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSpecificDamAnalysisByIdThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.specificDamAnalyses = action.payload;
      })
      .addCase(fetchSpecificDamAnalysisByIdThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch specific dam analysis';
      });
  },
});

export default damResourcesSlice.reducer;
