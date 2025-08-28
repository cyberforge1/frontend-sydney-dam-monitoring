// # src/pages/SelectedDamPage/SelectedDamPage.tsx
// (only showing the changed core; keep your styles & buttons)

import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchDamByIdThunk } from '../../features/dams/damsSlice';
import { fetchSpecificDamAnalysisByIdThunk } from '../../features/damResources/damResourcesSlice';
import DamContent from '../../components/DamContent/DamContent';
import GoogleMapComponent from '../../components/GoogleMapComponent/GoogleMapComponent';
import DamCapacityGraph from '../../graphs/DamCapacityGraph/DamCapacityGraph';
import NetInflowReleaseGraph from '../../graphs/NetInflowReleaseGraph/NetInflowReleaseGraph';
import './SelectedDamPage.scss';

const SelectedDamPage: React.FC = () => {
  const { damId: routeDamId } = useParams<{ damId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const damId =
    routeDamId || location.state?.damData?.dam_id || location.state?.damId || '';

  const { dams, selectedDam, status: damsStatus, error: damsError } = useSelector((s: RootState) => s.dams);
  const { specificDamAnalyses, status: analysisStatus, error: analysisError } = useSelector((s: RootState) => s.damResources);

  // Prefer cached dam record
  const damRecord = useMemo(() => {
    return dams.find(d => d.dam_id === damId) || (selectedDam?.dam_id === damId ? selectedDam : null);
  }, [dams, selectedDam, damId]);

  // Filter analysis rows for this dam
  const series = useMemo(() => {
    return specificDamAnalyses.filter(a => a.dam_id === damId);
  }, [specificDamAnalyses, damId]);

  // Fetch only what we need
  useEffect(() => {
    if (!damId) return;
    if (!damRecord) dispatch(fetchDamByIdThunk(damId));
    // Always ensure we have analysis for this dam
    if (series.length === 0) dispatch(fetchSpecificDamAnalysisByIdThunk(damId));
  }, [dispatch, damId, damRecord, series.length]);

  // Guards
  if (!damId) return <div>No dam selected.</div>;
  if (!damRecord && (damsStatus === 'loading' || analysisStatus === 'loading')) return <div>Loading…</div>;
  if (!damRecord && (damsError || analysisError)) return <div>Error: {damsError || analysisError}</div>;
  if (!damRecord) return <div>No dam data available.</div>;

  const { dam_name, latitude = 0, longitude = 0 } = damRecord;

  return (
    <div className="selected-dam-page">
      <button className="back-button" onClick={() => navigate('/')} type="button">Back</button>

      <div className="dam-header"><h1>{dam_name} Insights</h1></div>

      <div className="content-row">
        <div className="dam-content">
          <DamCapacityGraph damName={dam_name} series={series} />
        </div>
        <div className="dam-content">
          <NetInflowReleaseGraph damName={dam_name} series={series} />
        </div>
      </div>

      <div className="content-row">
        <DamContent damId={damId}>
          {/* Optional: any summary boxes using series[0] averages */}
        </DamContent>
        <div className="dam-content">
          <GoogleMapComponent lat={Number(latitude)} lng={Number(longitude)} />
        </div>
      </div>
    </div>
  );
};

export default SelectedDamPage;
