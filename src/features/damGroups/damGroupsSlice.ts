// src/features/damGroups/damGroupsSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllDamGroups,
  fetchDamGroupMembersByGroupName,
} from '../../api/api';
import { DamGroup, DamGroupMember } from '../../types/types';

// Define the state interface
export interface DamGroupsState {
  groups: DamGroup[];
  groupMembers: DamGroupMember[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DamGroupsState = {
  groups: [],
  groupMembers: [],
  status: 'idle',
  error: null,
};

// Thunk to fetch all dam groups
export const fetchAllDamGroupsThunk = createAsyncThunk<DamGroup[], void>(
  'damGroups/fetchAllDamGroups',
  async () => {
    const response = await fetchAllDamGroups();
    return response;
  }
);

// Thunk to fetch dam group members by group name
export const fetchDamGroupMembersByGroupNameThunk = createAsyncThunk<
  DamGroupMember[],
  string
>('damGroups/fetchDamGroupMembersByGroupName', async (groupName: string) => {
  const response = await fetchDamGroupMembersByGroupName(groupName);
  return response;
});

const damGroupsSlice = createSlice({
  name: 'damGroups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
