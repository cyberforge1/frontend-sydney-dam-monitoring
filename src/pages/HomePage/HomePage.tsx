// src/pages/HomePage/HomePage.tsx

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
  fetchAllDamGroupsThunk,
  fetchDamGroupMembersByGroupNameThunk,
} from '../../features/damGroups/damGroupsSlice';
import { fetchAllDamsThunk } from '../../features/dams/damsSlice';
import { fetchAllLatestDataThunk } from '../../features/damResources/damResourcesSlice';
import TopDamsPieCharts from '../../containers/TopDamsPieCharts/TopDamsPieCharts';
import DamGroupSelector from '../../components/DamGroupSelector/DamGroupSelector';
import SearchForDam from '../../components/SearchForDam/SearchForDam';
import OpenListOfDams from '../../components/OpenListOfDams/OpenListOfDams';
import './HomePage.scss';

const PREFERRED_DEFAULT = 'sydney_dams';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Groups & members
  const { groups, groupMembers, status: groupsStatus, error: groupsError } = useSelector(
    (s: RootState) => s.damGroups
  );

  // Global caches (fetched once here for all cards)
  const dams = useSelector((s: RootState) => s.dams.dams);
  const latestData = useSelector((s: RootState) => s.damResources.latestData);

  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const lastFetchedGroupRef = useRef<string | null>(null);

  // Fetch shared datasets ONCE so cards can render without dispatching
  useEffect(() => {
    if (dams.length === 0) dispatch(fetchAllDamsThunk());
    if (latestData.length === 0) dispatch(fetchAllLatestDataThunk());
  }, [dispatch, dams.length, latestData.length]);

  // Load groups once
  useEffect(() => {
    if (groupsStatus === 'idle' && groups.length === 0) {
      dispatch(fetchAllDamGroupsThunk());
    }
  }, [dispatch, groupsStatus, groups.length]);

  // Resolve default group as soon as groups are available
  const defaultGroup = useMemo(() => {
    if (!groups.length) return null;
    return (
      groups.find((g) => g.group_name === PREFERRED_DEFAULT)?.group_name ??
      groups[0]?.group_name ??
      null
    );
  }, [groups]);

  useEffect(() => {
    if (!selectedGroup && defaultGroup) {
      setSelectedGroup(defaultGroup);
    }
  }, [defaultGroup, selectedGroup]);

  // Fetch group members whenever selection changes (dedupe)
  useEffect(() => {
    if (!selectedGroup) return;
    if (lastFetchedGroupRef.current === selectedGroup) return;
    lastFetchedGroupRef.current = selectedGroup;
    dispatch(fetchDamGroupMembersByGroupNameThunk(selectedGroup));
  }, [dispatch, selectedGroup]);

  const loadingGroups = groupsStatus === 'loading' && groups.length === 0;
  const loadingMembers = groupsStatus === 'loading' && groups.length > 0;

  return (
    <div className="homepage">
      <div className="header">
        <h1>Sydney Dam Monitoring</h1>
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
        {groupsError && <div>Error: {groupsError}</div>}
        {!groupsError && !loadingGroups && selectedGroup && loadingMembers && (
          <div>Loading data for group: {selectedGroup}…</div>
        )}
        {!groupsError && !loadingMembers && groupMembers.length === 0 && selectedGroup && (
          <div>No data available for the selected group.</div>
        )}
        {groupMembers.length > 0 && <TopDamsPieCharts damData={groupMembers} />}
      </div>
    </div>
  );
};

export default HomePage;
