// src/pages/PageThree/PageThree.tsx

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchDamGroupMembersByGroupNameThunk } from '../../features/damGroups/damGroupsSlice';
import { fetchSpecificDamAnalysisByIdThunk } from '../../features/damResources/damResourcesSlice';
import DamCapacityPercentageGraph from '../../graphs/DamCapacityPercentageGraph/DamCapacityPercentageGraph';
import DamGroupSelector from '../../components/DamGroupSelector/DamGroupSelector';
import './PageThree.scss';

interface TransformedDamAnalysis {
  dam_id: string;
  dam_name: string;
  date: string;
  percentage_full: number;
}

const PageThree: React.FC = () => {
  const dispatch = useAppDispatch();

  // State selectors
  const { groupMembers, status: groupStatus, error: groupError } = useAppSelector(
    (state) => state.damGroups
  );
  const { specificDamAnalyses } = useAppSelector((state) => state.damResources);

  const [selectedGroup, setSelectedGroup] = React.useState<string>('sydney_dams');

  // Fetch dam group members when the selected group changes
  useEffect(() => {
    if (selectedGroup) {
      dispatch(fetchDamGroupMembersByGroupNameThunk(selectedGroup));
    }
  }, [selectedGroup, dispatch]);

  // Fetch specific dam analyses for all dams in the selected group
  useEffect(() => {
    if (groupMembers.length > 0) {
      groupMembers.forEach((member) => {
        dispatch(fetchSpecificDamAnalysisByIdThunk(member.dam_id));
      });
    }
  }, [groupMembers, dispatch]);

  // Transform specificDamAnalyses to include required properties for the graph
  const transformedData: TransformedDamAnalysis[] = specificDamAnalyses.map((analysis) => {
    const dam = groupMembers.find((member) => member.dam_id === analysis.dam_id);
    return {
      dam_id: analysis.dam_id,
      dam_name: dam?.group_name || 'Unknown',
      date: analysis.analysis_date,
      percentage_full: analysis.avg_percentage_full_12_months ?? 0,
    };
  });

  // Render loading and error states
  if (groupStatus === 'loading') {
    return <div className="page-three">Loading dam analysis data...</div>;
  }

  if (groupStatus === 'failed') {
    return <div className="page-three error">{groupError}</div>;
  }

  return (
    <div className="page-three">
      <div className="header">
        <DamGroupSelector onSelectGroup={setSelectedGroup} />
      </div>
      <div className="content">
        {groupStatus === 'succeeded' && (
          <DamCapacityPercentageGraph data={transformedData} />
        )}
      </div>
    </div>
  );
};

export default PageThree;
