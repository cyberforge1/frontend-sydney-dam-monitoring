// src/pages/SelectedDamPage/SelectedDamPage.tsx

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    fetchDamDataByName,
    fetchDamResources,
    fetchAvgPercentageFull12MonthsById,
    fetchAvgPercentageFull5YearsById,
    fetchAvgPercentageFull20YearsById,
} from '../../services/api';
import DamContent from '../../components/DamContent/DamContent';
import GoogleMapComponent from '../../components/GoogleMapComponent/GoogleMapComponent';
import DamCapacityGraph from '../../graphs/DamCapacityGraph/DamCapacityGraph';
import NetInflowReleaseGraph from '../../graphs/NetInflowReleaseGraph/NetInflowReleaseGraph';
import './SelectedDamPage.scss';

interface Dam {
    dam_id: string;
    dam_name: string;
    full_volume?: number;
    latitude?: number;
    longitude?: number;
}

interface DamResource {
    date: string;
    percentage_full: number;
    storage_volume: number;
    storage_inflow: number;
    storage_release: number;
}

const SelectedDamPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [damData, setDamData] = useState<Dam | null>(location.state?.damData || null);
    const [damResources, setDamResources] = useState<DamResource[]>([]);
    const [avgData, setAvgData] = useState<{ [key: string]: number | null }>({
        avg12Months: null,
        avg5Years: null,
        avg20Years: null,
    });

    useEffect(() => {
        if (!damData && location.state?.damName) {
            fetchDamDataByName(location.state.damName)
                .then(data => setDamData(data[0]))
                .catch(error => console.error('Error fetching dam data:', error));
        }
    }, [damData, location.state?.damName]);

    useEffect(() => {
        if (damData) {
            const fetchData = async () => {
                try {
                    const [resources, avg12, avg5, avg20] = await Promise.all([
                        fetchDamResources(damData.dam_id).then(data =>
                            data.map(resource => ({
                                ...resource,
                                percentage_full: resource.percentage_full ?? 0, // Ensure percentage_full is a number
                                storage_volume: resource.storage_volume ?? 0,
                                storage_inflow: resource.storage_inflow ?? 0,
                                storage_release: resource.storage_release ?? 0,
                            }))
                        ),
                        fetchAvgPercentageFull12MonthsById(damData.dam_id),
                        fetchAvgPercentageFull5YearsById(damData.dam_id),
                        fetchAvgPercentageFull20YearsById(damData.dam_id),
                    ]);
                    setDamResources(resources);
                    setAvgData({ avg12Months: avg12, avg5Years: avg5, avg20Years: avg20 });
                } catch (error) {
                    console.error('Error fetching dam details:', error);
                }
            };
            fetchData();
        }
    }, [damData]);

    if (!damData) {
        return <div>Loading...</div>;
    }

    const handleBackClick = () => {
        navigate('/');
    };

    const { dam_name: damName, latitude = 0, longitude = 0 } = damData;

    return (
        <div className="selected-dam-page">
            <button className="back-button" onClick={handleBackClick}>
                Back
            </button>
            <h1>{damName} Insights</h1>
            <div className="content-row">
                <DamCapacityGraph data={damResources} damName={damName} />
                <NetInflowReleaseGraph data={damResources} damName={damName} />
            </div>
            <div className="content-row">
                <DamContent content="">
                    <p>
                        {damName} Average Percentage Full (12 Months):{' '}
                        {avgData.avg12Months !== null ? `${avgData.avg12Months.toFixed(2)}%` : 'Loading...'}
                    </p>
                    <p>
                        {damName} Average Percentage Full (5 Years):{' '}
                        {avgData.avg5Years !== null ? `${avgData.avg5Years.toFixed(2)}%` : 'Loading...'}
                    </p>
                    <p>
                        {damName} Average Percentage Full (20 Years):{' '}
                        {avgData.avg20Years !== null ? `${avgData.avg20Years.toFixed(2)}%` : 'Loading...'}
                    </p>
                </DamContent>
                <GoogleMapComponent lat={latitude} lng={longitude} />
            </div>
        </div>
    );
};

export default SelectedDamPage;
