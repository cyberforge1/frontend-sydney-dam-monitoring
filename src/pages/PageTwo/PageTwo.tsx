// src/pages/PageTwo/PageTwo.tsx

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchDamGroupMembersByGroupNameThunk } from '../../features/damGroups/damGroupsSlice';
import DamStorageGraph from '../../graphs/DamStorageGraph/DamStorageGraph';
import DamGroupSelector from '../../components/DamGroupSelector/DamGroupSelector';
import './PageTwo.scss';

interface GraphDam {
  dam_id: string;
  dam_name: string;
  storage_volume: number;
}

const PageTwo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { groupMembers, status, error } = useAppSelector((state) => state.damGroups);
  const [selectedGroup, setSelectedGroup] = React.useState<string>('sydney_dams');

  useEffect(() => {
    if (selectedGroup) {
      dispatch(fetchDamGroupMembersByGroupNameThunk(selectedGroup));
    }
  }, [selectedGroup, dispatch]);

  // Transform groupMembers into data for DamStorageGraph
  const transformedData: GraphDam[] = groupMembers
    .map((member) => ({
      dam_id: member.dam_id,
      dam_name: member.group_name, // Assuming group_name corresponds to dam_name
      storage_volume: 0, // Placeholder since storage_volume is not part of groupMembers
    }));

  return (
    <div className="page-two">
      <div className="header">
        <DamGroupSelector onSelectGroup={setSelectedGroup} />
      </div>
      <div className="content">
        {status === 'loading' ? (
          <div>Loading dam storage data...</div>
        ) : status === 'failed' ? (
          <div className="error">{error}</div>
        ) : (
          <DamStorageGraph data={transformedData} />
        )}
      </div>
    </div>
  );
};

export default PageTwo;
