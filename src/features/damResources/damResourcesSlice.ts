// # src/features/damResources/damResourcesSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchLatestDataById,
    fetchAllLatestData,
    fetchSpecificDamAnalysisById,
    fetchAllOverallDamAnalyses,
} from '../../api/api';
import { DamResource, DamAnalysis, OverallDamAnalysis } from '../../types/types';

export interface DamResourcesState {
    latestData: DamResource[];
    specificDamAnalyses: DamAnalysis[];
    overallDamAnalysis: OverallDamAnalysis[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: DamResourcesState = {
    latestData: [],
    specificDamAnalyses: [],
    overallDamAnalysis: [],
    status: 'idle',
    error: null,
};

export const fetchAllOverallDamAnalysesThunk = createAsyncThunk<OverallDamAnalysis[], void>(
    'damResources/fetchAllOverallDamAnalyses',
    async () => {
        const response = await fetchAllOverallDamAnalyses();
        return response;
    }
);

export const fetchAllLatestDataThunk = createAsyncThunk<DamResource[], void>(
    'damResources/fetchAllLatestData',
    async () => {
        const response = await fetchAllLatestData();
        return response;
    }
);

export const fetchLatestDataByIdThunk = createAsyncThunk<DamResource, string>(
    'damResources/fetchLatestDataById',
    async (damId: string) => {
        const response = await fetchLatestDataById(damId);
        return response;
    }
);

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
            .addCase(fetchAllOverallDamAnalysesThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllOverallDamAnalysesThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.overallDamAnalysis = action.payload;
            })
            .addCase(fetchAllOverallDamAnalysesThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch overall dam analyses';
            })
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
