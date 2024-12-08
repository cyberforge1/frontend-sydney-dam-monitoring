// src/pages/PageThree/PageThree.tsx

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchDamsByGroupNameThunk,
} from '../../features/damGroups/damGroupsSlice';
import { fetchSpecificDamAnalysisByIdThunk } from '../../features/damResources/damResourcesSlice';
import DamCapacityPercentageGraph from '../../graphs/DamCapacityPercentageGraph/DamCapacityPercentageGraph';
import DamGroupSelector from '../../components/DamGroupSelector/DamGroupSelector';
import './PageThree.scss';

interface DamAnalysis {
  dam_id: string;
  dam_name: string;
  date: string;
  percentage_full: number;
}

const PageThree: React.FC = () => {
  const dispatch = useAppDispatch();
  const { groupDams, status, error } = useAppSelector((state) => state.damGroups);
  const { specificDamAnalyses } = useAppSelector((state) => state.damResources);

  const [selectedGroup, setSelectedGroup] = React.useState<string>('sydney_dams');

  useEffect(() => {
    dispatch(fetchDamsByGroupNameThunk(selectedGroup));
  }, [selectedGroup, dispatch]);

  useEffect(() => {
    if (groupDams.length > 0) {
      groupDams.forEach((dam) => {
        dispatch(fetchSpecificDamAnalysisByIdThunk(dam.dam_id));
      });
    }
  }, [groupDams, dispatch]);

  // Transform data for DamCapacityPercentageGraph
  const transformedData: DamAnalysis[] = specificDamAnalyses.map((analysis) => ({
    dam_id: analysis.dam_id,
    dam_name: groupDams.find(dam => dam.dam_id === analysis.dam_id)?.dam_name || 'Unknown',
    date: analysis.analysis_date,
    percentage_full: analysis.avg_percentage_full_12_months ?? 0,
  }));

  return (
    <div className="page-three">
      <div className="header">
        <DamGroupSelector onSelectGroup={setSelectedGroup} />
      </div>
      <div className="content">
        {status === 'loading' ? (
          <div>Loading dam analysis data...</div>
        ) : status === 'failed' ? (
          <div className="error">{error}</div>
        ) : (
          <DamCapacityPercentageGraph data={transformedData} />
        )}
      </div>
    </div>
  );
};

export default PageThree;
