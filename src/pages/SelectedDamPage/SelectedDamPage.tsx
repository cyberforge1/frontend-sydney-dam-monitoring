// src/pages/SelectedDamPage/SelectedDamPage.tsx

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchDamByIdThunk,
  clearSelectedDam,
} from '../../features/dams/damsSlice';
import {
  fetchLatestDataByIdThunk,
  fetchSpecificDamAnalysisByIdThunk,
} from '../../features/damResources/damResourcesSlice';
import DamContent from '../../components/DamContent/DamContent';
import GoogleMapComponent from '../../components/GoogleMapComponent/GoogleMapComponent';
import DamCapacityGraph from '../../graphs/DamCapacityGraph/DamCapacityGraph';
import NetInflowReleaseGraph from '../../graphs/NetInflowReleaseGraph/NetInflowReleaseGraph';
import './SelectedDamPage.scss';
import { DamResource } from '../../types/types';

interface LocationState {
  damId: string;
}

const SelectedDamPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { selectedDam, status, error } = useAppSelector((state) => state.dams);
  const { latestData, specificDamAnalyses } = useAppSelector((state) => state.damResources);

  const state = location.state as LocationState;
  const damId = state?.damId;

  useEffect(() => {
    if (damId) {
      dispatch(fetchDamByIdThunk(damId));
      dispatch(fetchLatestDataByIdThunk(damId));
      dispatch(fetchSpecificDamAnalysisByIdThunk(damId));
    }

    return () => {
      dispatch(clearSelectedDam());
    };
  }, [damId, dispatch]);

  if (status === 'loading') {
    return <div className="selected-dam-page">Loading dam details...</div>;
  }

  if (status === 'failed') {
    return <div className="selected-dam-page error">{error}</div>;
  }

  if (!selectedDam) {
    return <div className="selected-dam-page">No dam data available.</div>;
  }

  const handleBackClick = () => {
    navigate('/');
  };

  const { dam_name: damName, latitude = 0, longitude = 0 } = selectedDam;

  // Find the latest dam resource data by dam_id and latest date
  const latestDamResource = latestData
    .filter((data) => data.dam_id === damId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  // Aggregate average data from specificDamAnalyses
  const avgData = specificDamAnalyses.reduce(
    (acc, curr) => {
      acc.avg12Months = curr.avg_percentage_full_12_months ?? acc.avg12Months;
      acc.avg5Years = curr.avg_percentage_full_5_years ?? acc.avg5Years;
      acc.avg20Years = curr.avg_percentage_full_20_years ?? acc.avg20Years;
      return acc;
    },
    { avg12Months: null, avg5Years: null, avg20Years: null } as { [key: string]: number | null }
  );

  const damResources: DamResource[] = latestDamResource
    ? [{
        dam_id: latestDamResource.dam_id,
        date: latestDamResource.date,
        percentage_full: latestDamResource.percentage_full,
        storage_volume: latestDamResource.storage_volume,
        storage_inflow: latestDamResource.storage_inflow,
        storage_release: latestDamResource.storage_release,
      }]
    : [];

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
