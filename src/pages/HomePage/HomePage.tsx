// src/pages/HomePage/HomePage.tsx

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchDamGroupMembersByGroupNameThunk } from '../../features/damGroups/damGroupsSlice';
import { fetchLatestDataByIdThunk } from '../../features/damResources/damResourcesSlice';
import TopDamsPieCharts from '../../containers/TopDamsPieCharts/TopDamsPieCharts';
import DamGroupSelector from '../../components/DamGroupSelector/DamGroupSelector';
import SearchForDam from '../../components/SearchForDam/SearchForDam';
import OpenListOfDams from '../../components/OpenListOfDams/OpenListOfDams';
import './HomePage.scss';

interface TransformedDamData {
  dam_id: string;
  dam_name: string;
  percentage_full: number;
}

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { groupMembers, status: groupStatus, error: groupError } = useAppSelector(
    (state) => state.damGroups
  );
  const { latestData } = useAppSelector((state) => state.damResources);
  const [selectedGroup, setSelectedGroup] = React.useState<string>('sydney_dams');

  // Fetch group members when selectedGroup changes
  useEffect(() => {
    if (selectedGroup) {
      dispatch(fetchDamGroupMembersByGroupNameThunk(selectedGroup));
    }
  }, [selectedGroup, dispatch]);

  // Fetch latest data for each dam in the group
  useEffect(() => {
    if (groupMembers.length > 0) {
      groupMembers.forEach((member) => {
        dispatch(fetchLatestDataByIdThunk(member.dam_id));
      });
    }
  }, [groupMembers, dispatch]);

  // Transform groupMembers and latestData into damData
  const damData: TransformedDamData[] = groupMembers.map((member) => {
    const latest = latestData.find((data) => data.dam_id === member.dam_id);
    return {
      dam_id: member.dam_id,
      dam_name: member.group_name, // Assuming group_name corresponds to dam_name
      percentage_full: latest?.percentage_full ?? 0,
    };
  });

  return (
    <div className="homepage">
      <div className="header">
        <h1>Sydney Dam Monitoring</h1>
        <p>This website tracks live and historic data from dams across NSW, Australia.</p>
      </div>
      <div className="controls">
        <OpenListOfDams />
        <SearchForDam />
        <DamGroupSelector onSelectGroup={setSelectedGroup} />
      </div>
      <div className="top-dams-pie-charts-container">
        {groupStatus === 'loading' ? (
          <div>Loading top dams...</div>
        ) : groupStatus === 'failed' ? (
          <div className="error">{groupError}</div>
        ) : (
          <TopDamsPieCharts damData={damData} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
