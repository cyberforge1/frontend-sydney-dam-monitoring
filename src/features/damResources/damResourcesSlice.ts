// src/features/damResources/damResourcesSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchLatestDataById,
  fetchAllLatestData,
  fetchSpecificDamAnalysisById,
  fetchAvgPercentageFull12Months as apiFetchAvgPercentageFull12Months,
  fetchAvgPercentageFull5Years as apiFetchAvgPercentageFull5Years,
  fetchAvgPercentageFull20Years as apiFetchAvgPercentageFull20Years,
} from '../../api/api';
import { DamResource, DamAnalysis } from '../../types/types';

// **Export the DamResourcesState interface**
export interface DamResourcesState {
  latestData: DamResource[];
  specificDamAnalyses: DamAnalysis[];
  avg12Months: number | null;
  avg5Years: number | null;
  avg20Years: number | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DamResourcesState = {
  latestData: [],
  specificDamAnalyses: [],
  avg12Months: null,
  avg5Years: null,
  avg20Years: null,
  status: 'idle',
  error: null,
};

// Async thunk to fetch all latest dam data
export const fetchAllLatestDataThunk = createAsyncThunk<DamResource[], void>(
  'damResources/fetchAllLatestData',
  async () => {
    const response = await fetchAllLatestData();
    return response;
  }
);

// Async thunk to fetch latest data by dam ID
export const fetchLatestDataByIdThunk = createAsyncThunk<DamResource, string>(
  'damResources/fetchLatestDataById',
  async (damId: string) => {
    const response = await fetchLatestDataById(damId);
    return response;
  }
);

// Async thunk to fetch specific dam analysis by dam ID
export const fetchSpecificDamAnalysisByIdThunk = createAsyncThunk<DamAnalysis[], string>(
  'damResources/fetchSpecificDamAnalysisById',
  async (damId: string) => {
    const response = await fetchSpecificDamAnalysisById(damId);
    return response;
  }
);

// Async thunk to fetch average percentage full for 12 months
export const fetchAvgPercentageFull12MonthsThunk = createAsyncThunk<number, void>(
  'damResources/fetchAvgPercentageFull12Months',
  async () => {
    const response = await apiFetchAvgPercentageFull12Months();
    return response;
  }
);

// Async thunk to fetch average percentage full for 5 years
export const fetchAvgPercentageFull5YearsThunk = createAsyncThunk<number, void>(
  'damResources/fetchAvgPercentageFull5Years',
  async () => {
    const response = await apiFetchAvgPercentageFull5Years();
    return response;
  }
);

// Async thunk to fetch average percentage full for 20 years
export const fetchAvgPercentageFull20YearsThunk = createAsyncThunk<number, void>(
  'damResources/fetchAvgPercentageFull20Years',
  async () => {
    const response = await apiFetchAvgPercentageFull20Years();
    return response;
  }
);

const damResourcesSlice = createSlice({
  name: 'damResources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchAllLatestDataThunk
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
      // Handle fetchLatestDataByIdThunk
      .addCase(fetchLatestDataByIdThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLatestDataByIdThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update or add the latest data
        const existingIndex = state.latestData.findIndex(
          (data) => data.date === action.payload.date
        );
        if (existingIndex !== -1) {
          state.latestData[existingIndex] = action.payload;
        } else {
          state.latestData.push(action.payload);
        }
      })
      .addCase(fetchLatestDataByIdThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch latest dam data by ID';
      })
      // Handle fetchSpecificDamAnalysisByIdThunk
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
      })
      // Handle fetchAvgPercentageFull12MonthsThunk
      .addCase(fetchAvgPercentageFull12MonthsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAvgPercentageFull12MonthsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.avg12Months = action.payload;
      })
      .addCase(fetchAvgPercentageFull12MonthsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch 12-month average percentage full';
      })
      // Handle fetchAvgPercentageFull5YearsThunk
      .addCase(fetchAvgPercentageFull5YearsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAvgPercentageFull5YearsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.avg5Years = action.payload;
      })
      .addCase(fetchAvgPercentageFull5YearsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch 5-year average percentage full';
      })
      // Handle fetchAvgPercentageFull20YearsThunk
      .addCase(fetchAvgPercentageFull20YearsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAvgPercentageFull20YearsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.avg20Years = action.payload;
      })
      .addCase(fetchAvgPercentageFull20YearsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch 20-year average percentage full';
      });
  },
});

export default damResourcesSlice.reducer;
