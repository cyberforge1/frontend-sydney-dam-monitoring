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
    routeDamId ||
    (location.state as any)?.damData?.dam_id ||
    (location.state as any)?.damId ||
    '';

  const {
    dams,
    selectedDam,
    status: damsStatus,
    error: damsError,
  } = useSelector((s: RootState) => s.dams);

  const {
    specificDamAnalyses,
    status: analysisStatus,
    error: analysisError,
  } = useSelector((s: RootState) => s.damResources);

  // Prefer cached dam record
  const damRecord = useMemo(() => {
    return (
      dams.find((d) => d.dam_id === damId) ||
      (selectedDam?.dam_id === damId ? selectedDam : null)
    );
  }, [dams, selectedDam, damId]);

  // Build series robustly whether slice is globally scoped or already filtered by damId
  const series = useMemo(() => {
    const arr = Array.isArray(specificDamAnalyses) ? specificDamAnalyses : [];
    if (arr.length === 0) return arr;
    const hasDamIdField = arr.some((r: any) => r && r.dam_id != null);
    if (!hasDamIdField) return arr; // backend returned only this dam's rows
    return arr.filter((r: any) => String(r.dam_id) === String(damId));
  }, [specificDamAnalyses, damId]);

  // Treat 404 for this dam's analysis as "no analysis yet", not a fatal page error
  const noAnalysisForThisDam =
    !!analysisError &&
    analysisError.includes(`/api/specific_dam_analysis/${damId}`) &&
    analysisError.includes('404');

  // Fetch only what we need
  useEffect(() => {
    if (!damId) return;
    if (!damRecord) dispatch(fetchDamByIdThunk(damId));
    // Always ensure we try once; if 404, we'll stop retrying because noAnalysisForThisDam will be true
    if (series.length === 0 && !noAnalysisForThisDam) {
      dispatch(fetchSpecificDamAnalysisByIdThunk(damId));
    }
  }, [dispatch, damId, damRecord, series.length, noAnalysisForThisDam]);

  // Guards
  if (!damId) return <div>No dam selected.</div>;
  if (!damRecord && (damsStatus === 'loading' || analysisStatus === 'loading'))
    return <div>Loading…</div>;
  if (!damRecord && (damsError || analysisError))
    return <div>Error: {damsError || analysisError}</div>;
  if (!damRecord) return <div>No dam data available.</div>;

  const { dam_name, latitude = 0, longitude = 0 } = damRecord;

  return (
    <div className="selected-dam-page">
      <button
        className="back-button"
        onClick={() => navigate('/')}
        type="button"
      >
        Back
      </button>

      <div className="dam-header">
        <h1>{dam_name} Insights</h1>
      </div>

      <div className="content-row">
        <div className="dam-content">
          {/* If there is no historical analysis, show a friendly placeholder instead of failing */}
          {noAnalysisForThisDam || series.length === 0 ? (
            <div>No historical analysis available for this dam (yet).</div>
          ) : (
            <DamCapacityGraph damName={dam_name} series={series as any} />
          )}
        </div>
        <div className="dam-content">
          {noAnalysisForThisDam || series.length === 0 ? (
            <div>No historical analysis available for this dam (yet).</div>
          ) : (
            <NetInflowReleaseGraph damName={dam_name} series={series as any} />
          )}
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
