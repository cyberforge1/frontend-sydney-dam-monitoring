// src/features/damGroups/damGroupsSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllDamGroups,
  fetchDamsByGroupName,
  fetchDamGroupMembersByGroupName,
} from '../../api/api';
import { Dam, DamGroup, DamGroupMember } from '../../types/types';

// **Export the DamGroupsState interface**
export interface DamGroupsState {
  groups: DamGroup[];
  groupDams: Dam[];
  groupMembers: DamGroupMember[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DamGroupsState = {
  groups: [],
  groupDams: [],
  groupMembers: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch all dam groups
export const fetchAllDamGroupsThunk = createAsyncThunk<DamGroup[], void>(
  'damGroups/fetchAllDamGroups',
  async () => {
    const response = await fetchAllDamGroups();
    return response;
  }
);

// Async thunk to fetch dams by group name
export const fetchDamsByGroupNameThunk = createAsyncThunk<Dam[], string>(
  'damGroups/fetchDamsByGroupName',
  async (groupName: string) => {
    const response = await fetchDamsByGroupName(groupName);
    return response;
  }
);

// Async thunk to fetch dam group members by group name
export const fetchDamGroupMembersByGroupNameThunk = createAsyncThunk<DamGroupMember[], string>(
  'damGroups/fetchDamGroupMembersByGroupName',
  async (groupName: string) => {
    const response = await fetchDamGroupMembersByGroupName(groupName);
    return response;
  }
);

const damGroupsSlice = createSlice({
  name: 'damGroups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchAllDamGroupsThunk
      .addCase(fetchAllDamGroupsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllDamGroupsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.groups = action.payload;
      })
      .addCase(fetchAllDamGroupsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch dam groups';
      })
      // Handle fetchDamsByGroupNameThunk
      .addCase(fetchDamsByGroupNameThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDamsByGroupNameThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.groupDams = action.payload;
      })
      .addCase(fetchDamsByGroupNameThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch dams by group name';
      })
      // Handle fetchDamGroupMembersByGroupNameThunk
      .addCase(fetchDamGroupMembersByGroupNameThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDamGroupMembersByGroupNameThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.groupMembers = action.payload;
      })
      .addCase(fetchDamGroupMembersByGroupNameThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch dam group members';
      });
  },
});

export default damGroupsSlice.reducer;
