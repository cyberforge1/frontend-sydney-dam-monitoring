// # src/pages/PageThree/PageThree.tsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAllLatestDataThunk } from '../../features/damResources/damResourcesSlice';
import DamCapacityPercentageGraph from '../../graphs/DamCapacityPercentageGraph/DamCapacityPercentageGraph';
import DamGroupSelector from '../../components/DamGroupSelector/DamGroupSelector';
import './PageThree.scss';

const PageThree: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { latestData, status, error } = useSelector((state: RootState) => state.damResources);
    const [selectedGroup, setSelectedGroup] = useState<string>('sydney_dams');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllLatestDataThunk());
        }
    }, [dispatch, status]);

    // Updated group filter with actual dam IDs
    const mockGroupFilter = (group: string) => {
        const mockGroups: Record<string, string[]> = {
            sydney_dams: ['203042', '210097'], // Toonumbar Dam, Glenbawn Dam
            large_dams: ['210102', '210117'], // Lostock Dam, Glennies Creek Dam
        };
        const groupDams = mockGroups[group] || [];
        return latestData.filter((dam) => groupDams.includes(dam.dam_id));
    };

    const groupDamData = mockGroupFilter(selectedGroup);

    if (status === 'loading') {
        return <div>Loading dam data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (groupDamData.length === 0) {
        return <div>No data available for the selected group.</div>;
    }

    return (
        <div className="page-three">
            <div className="header">
                <DamGroupSelector onSelectGroup={setSelectedGroup} />
            </div>
            <div className="content">
                {/* Explicitly pass the data prop to the component */}
                <DamCapacityPercentageGraph data={groupDamData as any} />
            </div>
        </div>
    );
};

export default PageThree;
