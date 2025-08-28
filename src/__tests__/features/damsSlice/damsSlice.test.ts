// src/__tests__/features/damsSlice/damsSlice.test.ts

import reducer, {
  fetchAllDamsThunk,
  fetchDamByIdThunk,
  clearSelectedDam,
} from '../../../features/dams/damsSlice';
import { configureStore } from '@reduxjs/toolkit';

describe('damsSlice', () => {
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
    jest.clearAllMocks();
  });

  it('should handle initial state', () => {
    const initialState = reducer(undefined, { type: '' });
    expect(initialState).toEqual({
      dams: [],
      selectedDam: null,
      status: 'idle',
      error: null,
    });
  });

  it('should handle fetchAllDamsThunk fulfilled', async () => {
    const store = configureStore({ reducer });
    const mockResponse = [{ dam_id: '1', dam_name: 'Dam A' }];
    mockFetch(mockResponse);

    await store.dispatch(fetchAllDamsThunk());
    const state = store.getState();
    expect(state.dams).toEqual(mockResponse);
    expect(state.status).toBe('succeeded');

    // API helper calls fetch(url, undefined)
    expect(global.fetch).toHaveBeenCalledWith('/api/dams', undefined);
    // (Alternative): expect(global.fetch).toHaveBeenCalledWith('/api/dams', expect.anything());
  });

  it('should handle fetchAllDamsThunk rejected', async () => {
    const store = configureStore({ reducer });
    mockFetch({ message: 'Failed to fetch dams' }, 500);

    await store.dispatch(fetchAllDamsThunk());
    const state = store.getState();
    expect(state.dams).toEqual([]);
    expect(state.status).toBe('failed');
    expect(state.error).toBe(
      'Error fetching /api/dams: 500 Error - {"message":"Failed to fetch dams"}'
    );
  });

  it('should handle fetchDamByIdThunk fulfilled', async () => {
    const store = configureStore({ reducer });
    const mockResponse = { dam_id: '1', dam_name: 'Dam A' };
    mockFetch(mockResponse);

    await store.dispatch(fetchDamByIdThunk('1'));
    const state = store.getState();
    expect(state.selectedDam).toEqual(mockResponse);
    expect(state.status).toBe('succeeded');

    // API helper calls fetch(url, undefined)
    expect(global.fetch).toHaveBeenCalledWith('/api/dams/1', undefined);
    // (Alternative): expect(global.fetch).toHaveBeenCalledWith('/api/dams/1', expect.anything());
  });

  it('should handle fetchDamByIdThunk rejected', async () => {
    const store = configureStore({ reducer });
    mockFetch({ message: 'Failed to fetch dam details' }, 404);

    await store.dispatch(fetchDamByIdThunk('invalid-id'));
    const state = store.getState();
    expect(state.selectedDam).toBe(null);
    expect(state.status).toBe('failed');
    expect(state.error).toBe(
      'Error fetching /api/dams/invalid-id: 404 Error - {"message":"Failed to fetch dam details"}'
    );
  });

  it('should handle clearSelectedDam', () => {
    const initialState = {
      dams: [],
      selectedDam: { dam_id: '1', dam_name: 'Dam A' },
      status: 'idle' as const,
      error: null,
    };

    const state = reducer(initialState, clearSelectedDam());
    expect(state.selectedDam).toBe(null);
  });
});
