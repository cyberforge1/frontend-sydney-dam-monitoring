// src/pages/PageTwo/PageTwo.tsx

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchDamsByGroupNameThunk } from '../../features/damGroups/damGroupsSlice';
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
  const { groupDams, status, error } = useAppSelector((state) => state.damGroups);
  const [selectedGroup, setSelectedGroup] = React.useState<string>('sydney_dams');

  useEffect(() => {
    dispatch(fetchDamsByGroupNameThunk(selectedGroup));
  }, [selectedGroup, dispatch]);

  // Transform data for DamStorageGraph
  const transformedData: GraphDam[] = groupDams
    .filter(dam => dam.full_volume !== undefined)
    .map(dam => ({
      dam_id: dam.dam_id,
      dam_name: dam.dam_name,
      storage_volume: dam.full_volume as number,
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
