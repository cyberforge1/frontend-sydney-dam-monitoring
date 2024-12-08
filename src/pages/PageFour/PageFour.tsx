// src/pages/PageFour/PageFour.tsx

import React, { useEffect, useState } from 'react';
import FigureBox from '../../components/FigureBox/FigureBox';
import { fetchAvgPercentageFull12Months, fetchAvgPercentageFull5Years, fetchAvgPercentageFull20Years } from '../../services/api';
import './PageFour.scss';

const PageFour: React.FC = () => {
    const [avg12Months, setAvg12Months] = useState<string | null>(null);
    const [avg5Years, setAvg5Years] = useState<string | null>(null);
    const [avg20Years, setAvg20Years] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [data12Months, data5Years, data20Years] = await Promise.all([
                    fetchAvgPercentageFull12Months(),
                    fetchAvgPercentageFull5Years(),
                    fetchAvgPercentageFull20Years(),
                ]);
                setAvg12Months(`${data12Months.toFixed(2)}%`);
                setAvg5Years(`${data5Years.toFixed(2)}%`);
                setAvg20Years(`${data20Years.toFixed(2)}%`);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load average percentage full data.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="page-four">Loading average data...</div>;
    }

    if (error) {
        return <div className="page-four error">{error}</div>;
    }

    return (
        <div className="page-four">
            <div className="figure-box-container">
                <FigureBox title="All Dams Average Percentage Full (12 Months)" data={avg12Months} />
                <FigureBox title="All Dams Average Percentage Full (5 Years)" data={avg5Years} />
                <FigureBox title="All Dams Average Percentage Full (20 Years)" data={avg20Years} />
            </div>
        </div>
    );
};

export default PageFour;
