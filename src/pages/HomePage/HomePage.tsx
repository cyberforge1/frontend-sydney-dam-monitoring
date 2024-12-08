// # src/pages/HomePage/HomePage.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchDamGroupMembersByGroupNameThunk } from '../../features/damGroups/damGroupsSlice';
import TopDamsPieCharts from '../../containers/TopDamsPieCharts/TopDamsPieCharts';
import DamGroupSelector from '../../components/DamGroupSelector/DamGroupSelector';
import SearchForDam from '../../components/SearchForDam/SearchForDam';
import OpenListOfDams from '../../components/OpenListOfDams/OpenListOfDams';
import './HomePage.scss';

const HomePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { groupMembers, status, error } = useSelector((state: RootState) => state.damGroups);
    const [selectedGroup, setSelectedGroup] = React.useState<string>('sydney_dams');

    useEffect(() => {
        dispatch(fetchDamGroupMembersByGroupNameThunk(selectedGroup));
    }, [dispatch, selectedGroup]);

    if (status === 'loading') {
        return <div>Loading data for {selectedGroup}...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="homepage">
            <div className="header">
                <h1>Sydney Dam Monitoring</h1>
                <p>This website tracks live and historic data from the dams across NSW, Australia</p>
            </div>
            <div className="controls">
                <OpenListOfDams />
                <SearchForDam />
                <DamGroupSelector onSelectGroup={setSelectedGroup} />
            </div>
            <div className="top-dams-pie-charts-container">
                <TopDamsPieCharts damData={groupMembers} />
            </div>
        </div>
    );
};

export default HomePage;
