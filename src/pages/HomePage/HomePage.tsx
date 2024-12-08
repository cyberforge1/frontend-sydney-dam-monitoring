// src/pages/HomePage/HomePage.tsx

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchDamsByGroupNameThunk } from '../../features/damGroups/damGroupsSlice';
import { fetchLatestDataByIdThunk } from '../../features/damResources/damResourcesSlice';
import TopDamsPieCharts from '../../containers/TopDamsPieCharts/TopDamsPieCharts';
import DamGroupSelector from '../../components/DamGroupSelector/DamGroupSelector';
import SearchForDam from '../../components/SearchForDam/SearchForDam';
import OpenListOfDams from '../../components/OpenListOfDams/OpenListOfDams';
import './HomePage.scss';
import { DamData } from '../../types/types';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  // Selectors from damGroupsSlice
  const { groupDams, status, error } = useAppSelector((state) => state.damGroups);
  
  // Selector from damResourcesSlice
  const { latestData } = useAppSelector((state) => state.damResources);
  
  const [selectedGroup, setSelectedGroup] = React.useState<string>('sydney_dams');

  // Fetch dams based on selected group
  useEffect(() => {
    if (selectedGroup) {
      dispatch(fetchDamsByGroupNameThunk(selectedGroup));
    }
  }, [selectedGroup, dispatch]);

  // Fetch latest data for each dam in the selected group
  useEffect(() => {
    if (groupDams.length > 0) {
      groupDams.forEach((dam) => {
        dispatch(fetchLatestDataByIdThunk(dam.dam_id));
      });
    }
  }, [groupDams, dispatch]);

  // Transform data for TopDamsPieCharts
  const damData: DamData[] = groupDams.map((dam) => {
    const latest = latestData.find((data) => data.dam_id === dam.dam_id);
    return {
      dam_id: dam.dam_id,
      dam_name: dam.dam_name,
      percentage_full: latest?.percentage_full ?? 0,
    };
  });

  return (
    <div className="homepage">
      {/* Header section */}
      <div className="header">
        <h1>Sydney Dam Monitoring</h1>
        <p>This website tracks live and historic data from the dams across NSW, Australia</p>
      </div>
      {/* Controls section */}
      <div className="controls">
        <OpenListOfDams />
        <SearchForDam />
        <DamGroupSelector onSelectGroup={setSelectedGroup} />
      </div>
      {/* Charts section */}
      <div className="top-dams-pie-charts-container">
        {status === 'loading' ? (
          <div>Loading top dams...</div>
        ) : status === 'failed' ? (
          <div className="error">{error}</div>
        ) : (
          /* Pass damData as a prop */
          <TopDamsPieCharts damData={damData} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
