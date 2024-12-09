// src/__tests__/features/damResources/damResourcesSlice.test.ts

import reducer, {
  fetchAllLatestDataThunk,
  fetchSpecificDamAnalysisByIdThunk,
  fetchAllOverallDamAnalysesThunk,
} from '../../../features/damResources/damResourcesSlice';
import { configureStore } from '@reduxjs/toolkit';

describe('damResourcesSlice', () => {
  const mockFetch = (mockResponse: unknown, status = 200) => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: status >= 200 && status < 300,
        status,
        statusText: status >= 200 && status < 300 ? 'OK' : 'Error',
        json: () => Promise.resolve(mockResponse),
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      })
    ) as jest.Mock;
  };

  afterEach(() => {
    jest.clearAllMocks(); // Clear fetch mock after each test
  });

  it('should handle initial state', () => {
    const initialState = reducer(undefined, { type: '' });
    expect(initialState).toEqual({
      latestData: [],
      specificDamAnalyses: [],
      overallDamAnalysis: [],
      status: 'idle',
      error: null,
    });
  });

  it('should handle fetchAllLatestDataThunk fulfilled', async () => {
    const store = configureStore({ reducer });
    const mockResponse = [
      { dam_id: '1', name: 'Dam A' },
      { dam_id: '2', name: 'Dam B' },
    ];
    mockFetch(mockResponse);

    await store.dispatch(fetchAllLatestDataThunk());
    const state = store.getState();
    expect(state.latestData).toEqual(mockResponse);
    expect(state.status).toBe('succeeded');
    expect(global.fetch).toHaveBeenCalledWith('/api/latest_data');
  });

  it('should handle fetchAllLatestDataThunk rejected', async () => {
    const store = configureStore({ reducer });
    mockFetch({ message: 'Failed to fetch' }, 500);

    await store.dispatch(fetchAllLatestDataThunk());
    const state = store.getState();
    expect(state.latestData).toEqual([]);
    expect(state.status).toBe('failed');
    expect(state.error).toBe(
      'Error fetching /api/latest_data: 500 Error - {"message":"Failed to fetch"}'
    );
  });

  it('should handle fetchAllOverallDamAnalysesThunk fulfilled', async () => {
    const store = configureStore({ reducer });
    const mockResponse = [
      { analysisId: '1', analysisName: 'Analysis A' },
    ];
    mockFetch(mockResponse);

    await store.dispatch(fetchAllOverallDamAnalysesThunk());
    const state = store.getState();
    expect(state.overallDamAnalysis).toEqual(mockResponse);
    expect(state.status).toBe('succeeded');
    expect(global.fetch).toHaveBeenCalledWith('/api/overall_dam_analysis');
  });

  it('should handle fetchAllOverallDamAnalysesThunk rejected', async () => {
    const store = configureStore({ reducer });
    mockFetch({ message: 'Not Found' }, 404);

    await store.dispatch(fetchAllOverallDamAnalysesThunk());
    const state = store.getState();
    expect(state.overallDamAnalysis).toEqual([]);
    expect(state.status).toBe('failed');
    expect(state.error).toBe(
      'Error fetching /api/overall_dam_analysis: 404 Error - {"message":"Not Found"}'
    );
  });

  it('should handle fetchSpecificDamAnalysisByIdThunk fulfilled', async () => {
    const store = configureStore({ reducer });
    const mockResponse = [
      { analysisId: '1', analysisName: 'Analysis A' },
    ];
    mockFetch(mockResponse);

    await store.dispatch(fetchSpecificDamAnalysisByIdThunk('1'));
    const state = store.getState();
    expect(state.specificDamAnalyses).toEqual(mockResponse);
    expect(state.status).toBe('succeeded');
    expect(global.fetch).toHaveBeenCalledWith('/api/specific_dam_analysis/1');
  });

  it('should handle fetchSpecificDamAnalysisByIdThunk rejected', async () => {
    const store = configureStore({ reducer });
    mockFetch({ message: 'Not Found' }, 404);

    await store.dispatch(fetchSpecificDamAnalysisByIdThunk('1'));
    const state = store.getState();
    expect(state.specificDamAnalyses).toEqual([]);
    expect(state.status).toBe('failed');
    expect(state.error).toBe(
      'Error fetching /api/specific_dam_analysis/1: 404 Error - {"message":"Not Found"}'
    );
  });
});
