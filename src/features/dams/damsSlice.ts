// src/features/dams/damsSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllDams, fetchDamById } from '../../api/api';
import { Dam } from '../../types/types';

// **Export the DamsState interface**
export interface DamsState {
  dams: Dam[];
  selectedDam: Dam | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DamsState = {
  dams: [],
  selectedDam: null,
  status: 'idle',
  error: null,
};

// Async thunk to fetch all dams
export const fetchAllDamsThunk = createAsyncThunk<Dam[], void>(
  'dams/fetchAllDams',
  async () => {
    const response = await fetchAllDams();
    return response;
  }
);

// Async thunk to fetch dam by ID
export const fetchDamByIdThunk = createAsyncThunk<Dam, string>(
  'dams/fetchDamById',
  async (damId: string) => {
    const response = await fetchDamById(damId);
    return response;
  }
);

const damsSlice = createSlice({
  name: 'dams',
  initialState,
  reducers: {
    clearSelectedDam(state) {
      state.selectedDam = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchAllDamsThunk
      .addCase(fetchAllDamsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllDamsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dams = action.payload;
      })
      .addCase(fetchAllDamsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch dams';
      })
      // Handle fetchDamByIdThunk
      .addCase(fetchDamByIdThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDamByIdThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedDam = action.payload;
      })
      .addCase(fetchDamByIdThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch dam details';
      });
  },
});

export const { clearSelectedDam } = damsSlice.actions;

export default damsSlice.reducer;
