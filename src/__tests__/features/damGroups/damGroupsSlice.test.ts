// src/__tests__/features/damGroups/damGroupsSlice.test.ts

import reducer, {
  fetchAllDamGroupsThunk,
  fetchDamGroupMembersByGroupNameThunk,
} from '../../../features/damGroups/damGroupsSlice';
import { configureStore } from '@reduxjs/toolkit';

describe('damGroupsSlice', () => {
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
      groups: [],
      groupMembers: [],
      status: 'idle',
      error: null,
    });
  });

  it('should handle fetchAllDamGroupsThunk fulfilled', async () => {
    const store = configureStore({ reducer });
    const mockResponse = [{ group_name: 'Group 1' }, { group_name: 'Group 2' }];
    mockFetch(mockResponse);

    await store.dispatch(fetchAllDamGroupsThunk());
    const state = store.getState();
    expect(state.groups).toEqual(mockResponse);
    expect(state.status).toBe('succeeded');

    expect(global.fetch).toHaveBeenCalledWith('/api/dam_groups', undefined);
  });

  it('should handle fetchAllDamGroupsThunk rejected', async () => {
    const store = configureStore({ reducer });
    mockFetch({ message: 'Failed to fetch' }, 500);

    await store.dispatch(fetchAllDamGroupsThunk());
    const state = store.getState();
    expect(state.groups).toEqual([]);
    expect(state.status).toBe('failed');
    expect(state.error).toBe(
      'Error fetching /api/dam_groups: 500 Error - {"message":"Failed to fetch"}'
    );
  });

  it('should handle fetchDamGroupMembersByGroupNameThunk fulfilled', async () => {
    const store = configureStore({ reducer });
    const mockResponse = [{ dam_id: '123', dam_name: 'Dam 1' }];
    mockFetch(mockResponse);

    const groupName = 'Group 1';
    const encoded = encodeURIComponent(groupName);

    await store.dispatch(fetchDamGroupMembersByGroupNameThunk(groupName));
    const state = store.getState();
    expect(state.groupMembers).toEqual(mockResponse);
    expect(state.status).toBe('succeeded');

    expect(global.fetch).toHaveBeenCalledWith(`/api/dam_group_members/${encoded}`, undefined);
  });

  it('should handle fetchDamGroupMembersByGroupNameThunk rejected', async () => {
    const store = configureStore({ reducer });
    mockFetch({ message: 'Not Found' }, 404);

    const badGroup = 'Invalid Group';
    const encodedBadGroup = encodeURIComponent(badGroup);

    await store.dispatch(fetchDamGroupMembersByGroupNameThunk(badGroup));
    const state = store.getState();
    expect(state.groupMembers).toEqual([]);
    expect(state.status).toBe('failed');

    expect(state.error).toBe(
      `Error fetching /api/dam_group_members/${encodedBadGroup}: 404 Error - {"message":"Not Found"}`
    );
  });
});
