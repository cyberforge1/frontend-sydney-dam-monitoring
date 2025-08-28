// src/features/damGroups/damGroupsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllDamGroups, fetchDamGroupMembersByGroupName } from '../../api/api';
import { DamGroup, DamGroupMember } from '../../types/types';

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

export const fetchAllDamGroupsThunk = createAsyncThunk<
  DamGroup[],
  void,
  { rejectValue: string }
>('damGroups/fetchAllDamGroups', async (_, { rejectWithValue }) => {
  try {
    return await fetchAllDamGroups();
  } catch (e: any) {
    return rejectWithValue(e?.message ?? 'Failed to fetch dam groups');
  }
});

export const fetchDamGroupMembersByGroupNameThunk = createAsyncThunk<
  DamGroupMember[],
  string,
  { rejectValue: string }
>('damGroups/fetchDamGroupMembersByGroupName', async (groupName, { rejectWithValue }) => {
  try {
    return await fetchDamGroupMembersByGroupName(groupName);
  } catch (e: any) {
    return rejectWithValue(e?.message ?? `Failed to fetch members for ${groupName}`);
  }
});

const damGroupsSlice = createSlice({
  name: 'damGroups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // groups
      .addCase(fetchAllDamGroupsThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllDamGroupsThunk.fulfilled, (state, action: PayloadAction<DamGroup[]>) => {
        state.status = 'succeeded';
        state.groups = action.payload;
      })
      .addCase(fetchAllDamGroupsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Failed to fetch dam groups';
      })
      // members
      .addCase(fetchDamGroupMembersByGroupNameThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.groupMembers = []; // clear on new selection
      })
      .addCase(fetchDamGroupMembersByGroupNameThunk.fulfilled, (state, action: PayloadAction<DamGroupMember[]>) => {
        state.status = 'succeeded';
        state.groupMembers = action.payload;
      })
      .addCase(fetchDamGroupMembersByGroupNameThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Failed to fetch dam group members';
      });
  },
});

export default damGroupsSlice.reducer;
