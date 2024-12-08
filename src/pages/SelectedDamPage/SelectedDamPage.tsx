// src/pages/SelectedDamPage/SelectedDamPage.tsx

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    fetchAvgPercentageFull12MonthsById,
    fetchAvgPercentageFull5YearsById,
    fetchAvgPercentageFull20YearsById,
    fetchLatestDataById,
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

    // Refactored damData to a simple variable since setDamData is unused
    const damData: Dam | null = location.state?.damData || null;

    const [damResources, setDamResources] = useState<DamResource[]>([]);
    const [avgData, setAvgData] = useState<{ [key: string]: number | null }>({
        avg12Months: null,
        avg5Years: null,
        avg20Years: null,
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (damData) {
            const fetchData = async () => {
                try {
                    const [latestData, avg12, avg5, avg20] = await Promise.all([
                        fetchLatestDataById(damData.dam_id),
                        fetchAvgPercentageFull12MonthsById(damData.dam_id),
                        fetchAvgPercentageFull5YearsById(damData.dam_id),
                        fetchAvgPercentageFull20YearsById(damData.dam_id),
                    ]);

                    // Assuming latestData is a single entry. If it's an array, adjust accordingly.
                    setDamResources([{
                        date: latestData.date,
                        percentage_full: latestData.percentage_full ?? 0,
                        storage_volume: latestData.storage_volume ?? 0,
                        storage_inflow: latestData.storage_inflow ?? 0,
                        storage_release: latestData.storage_release ?? 0,
                    }]);

                    setAvgData({ avg12Months: avg12, avg5Years: avg5, avg20Years: avg20 });
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching dam details:', error);
                    setError('Failed to load dam details.');
                    setLoading(false);
                }
            };
            fetchData();
        } else {
            setLoading(false);
            setError('No dam data available.');
        }
    }, [damData]);

    if (loading) {
        return <div className="selected-dam-page">Loading dam details...</div>;
    }

    if (error) {
        return <div className="selected-dam-page error">{error}</div>;
    }

    if (!damData) {
        return <div className="selected-dam-page">No dam data available.</div>;
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
