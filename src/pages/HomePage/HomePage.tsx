// src/pages/HomePage/HomePage.tsx

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';

import {
  fetchAllDamGroupsThunk,
  fetchDamGroupMembersByGroupNameThunk,
} from '../../features/damGroups/damGroupsSlice';

import { fetchAllDamsThunk } from '../../features/dams/damsSlice';
import { fetchAllLatestDataThunk } from '../../features/damResources/damResourcesSlice';

import DamGroupSelector from '../../components/DamGroupSelector/DamGroupSelector';
import TopDamsPieCharts from '../../graphs/TopDamsPieCharts/TopDamsPieCharts';
import SearchForDam from '../../components/SearchForDam/SearchForDam';
import OpenListOfDams from '../../components/OpenListOfDams/OpenListOfDams';

import './HomePage.scss';

const PREFERRED_DEFAULT = 'sydney_dams';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Slices
  const dams = useSelector((s: RootState) => s.dams.dams);
  const latestData = useSelector((s: RootState) => s.damResources.latestData);

  const {
    groups,
    groupMembers,
    status: groupsStatus,
    error: groupsError,
  } = useSelector((s: RootState) => s.damGroups);

  // Local UI state
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const lastFetchedGroupRef = useRef<string | null>(null);

  // ---------------------------------------------------------------------------
  // Preload global caches ONCE (so cards render without extra fetches)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (dams.length === 0) dispatch(fetchAllDamsThunk());
    if (latestData.length === 0) dispatch(fetchAllLatestDataThunk());
  }, [dispatch, dams.length, latestData.length]);

  // ---------------------------------------------------------------------------
  // Load list of groups ONCE (and retry if previous attempt failed)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (groups.length === 0 || groupsStatus === 'failed') {
      dispatch(fetchAllDamGroupsThunk());
    }
  }, [dispatch, groups.length, groupsStatus]);

  // ---------------------------------------------------------------------------
  // Resolve default group when groups arrive
  // ---------------------------------------------------------------------------
  const defaultGroup = useMemo(() => {
    if (!groups.length) return null;
    return (
      groups.find(g => g.group_name === PREFERRED_DEFAULT)?.group_name ??
      groups[0]?.group_name ??
      null
    );
  }, [groups]);

  // ---------------------------------------------------------------------------
  // Initialize selected group when default is known
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!selectedGroup && defaultGroup) {
      setSelectedGroup(defaultGroup);
    }
  }, [defaultGroup, selectedGroup]);

  // ---------------------------------------------------------------------------
  // Fetch members when selection changes (dedupe multiple identical requests)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!selectedGroup) return;
    if (lastFetchedGroupRef.current === selectedGroup) return;
    lastFetchedGroupRef.current = selectedGroup;
    dispatch(fetchDamGroupMembersByGroupNameThunk(selectedGroup));
  }, [dispatch, selectedGroup]);

  // Simple derived loading flags
  const loadingGroups = groupsStatus === 'loading' && groups.length === 0;
  const loadingMembers =
    groupsStatus === 'loading' && groups.length > 0 && !!selectedGroup;

  return (
    <div className="homepage">
      <div className="header">
        <h1>Water Dashboard NSW</h1>
        <p>Track live and historical data from dams across NSW, Australia</p>
      </div>

      <div className="controls">
        <OpenListOfDams />
        <SearchForDam />
        <DamGroupSelector
          groups={groups}
          value={selectedGroup}
          onChange={setSelectedGroup}
          disabled={loadingGroups}
        />
      </div>

      <div className="top-dams-pie-charts-container">
        {loadingGroups && <div>Loading groups…</div>}

        {groupsError && (
          <div>
            Error loading dam groups: {groupsError}{' '}
            <button type="button" onClick={() => dispatch(fetchAllDamGroupsThunk())}>
              Retry
            </button>
          </div>
        )}

        {!groupsError && !loadingGroups && groups.length === 0 && (
          <div>No dam groups available.</div>
        )}

        {!groupsError && !loadingMembers && selectedGroup && groupMembers.length === 0 && (
          <div>No data available for the selected group.</div>
        )}

        {groupMembers.length > 0 && <TopDamsPieCharts damData={groupMembers} />}
      </div>
    </div>
  );
};

export default HomePage;
