// # src/pages/TestingPage/TestingPage.tsx

import React from 'react';
import HomePage from '../../pages/HomePage/HomePage';
// import DamListPage from '../../pages/DamListPage/DamListPage';
// import DamStorageGraph from '../../graphs/DamStorageGraph/DamStorageGraph';
// import NetInflowReleaseGraph from '../../graphs/NetInflowReleaseGraph/NetInflowReleaseGraph';
// import DamCapacityPercentageGraph from '../../graphs/DamCapacityPercentageGraph/DamCapacityPercentageGraph';
// import DamCapacityGraph from '../../graphs/DamCapacityGraph/DamCapacityGraph';
// import TopDamsPieCharts from '../../containers/TopDamsPieCharts/TopDamsPieCharts';
// import TextBox from '../../components/TextBox/TextBox';
// import SearchForDam from '../../components/SearchForDam/SearchForDam';
// import OpenListOfDams from '../../components/OpenListOfDams/OpenListOfDams';
// import GoogleMapComponent from '../../components/GoogleMapComponent/GoogleMapComponent';
// import Footer from '../../components/Footer/Footer';
// import FigureBox from '../../components/FigureBox/FigureBox';
// import IndividualDamCard from '../../components/IndividualDamCard/IndividualDamCard';
// import DamContent from '../../components/DamContent/DamContent';
// import DamGroupSelector from '../../components/DamGroupSelector/DamGroupSelector';
// import PageFour from '../../pages/PageFour/PageFour';
import './TestingPage.scss';

const TestingPage: React.FC = () => {
    return (
        <div className="testing-page">
            {/* Testing the new PageFour component */}
            <HomePage />

            {/* <PageFour /> */}
            {/* Commented out older components for isolated testing */}
            {/* <DamListPage /> */}
            {/* <DamStorageGraph /> */}
            {/* <NetInflowReleaseGraph damId="210102" /> */}
            {/* <DamCapacityPercentageGraph /> */}
            {/* <DamCapacityGraph damId="210102" /> */}
            {/* <TopDamsPieCharts /> */}
            {/* <TextBox /> */}
            {/* <SearchForDam /> */}
            {/* <OpenListOfDams /> */}
            {/* <GoogleMapComponent lat={-33.8688} lng={151.2093} /> */}
            {/* <Footer /> */}
            {/* <FigureBox title="Storage Volume" damId="210102" dataKey="storage_volume" /> */}
            {/* <DamGroupSelector onSelectGroup={(group) => console.log(group)} /> */}
            {/* <IndividualDamCard damId="210102" /> */}
            {/* <DamContent damId="210102">
                <p>Additional information about the dam can be placed here.</p>
            </DamContent> */}
        </div>
    );
};

export default TestingPage;
