// #src/components/TestingApiCalls/TestingApiCalls.tsx

import React, { useCallback, useState } from 'react';
import {
  fetchAllDams,
  fetchDamById,
  fetchAllLatestData,
  fetchLatestDataById,
  fetchSpecificDamAnalysisById,
  fetchAllDamGroups,
  fetchDamGroupByName,
  fetchDamGroupMembersByGroupName,
  fetchAllOverallDamAnalyses,
  fetchOverallDamAnalysisByDate,
} from '../../api/api';
import { Dam, DamGroup, OverallDamAnalysis } from '../../types/types';
import './TestingApiCalls.scss';

type TestRow = {
  name: string;
  status: 'waiting' | 'ok' | 'error' | 'skipped';
  ms?: number;
  note?: string;
  sample?: unknown;
};

const TestingApiCalls: React.FC = () => {
  const [rows, setRows] = useState<TestRow[]>([
    { name: 'GET /api/dams', status: 'waiting' },
    { name: 'GET /api/latest_data', status: 'waiting' },
    { name: 'GET /api/dam_groups', status: 'waiting' },
    { name: 'GET /api/overall_dam_analysis', status: 'waiting' },
    { name: 'GET /api/dams/:damId', status: 'waiting' },
    { name: 'GET /api/latest_data/:damId', status: 'waiting' },
    { name: 'GET /api/specific_dam_analysis/:damId', status: 'waiting' },
    { name: 'GET /api/dam_groups/:groupName', status: 'waiting' },
    { name: 'GET /api/dam_group_members/:groupName', status: 'waiting' },
    { name: 'GET /api/overall_dam_analysis/:analysisDate', status: 'waiting' },
  ]);

  const setResult = (name: string, patch: Partial<TestRow>) =>
    setRows(prev => prev.map(r => (r.name === name ? { ...r, ...patch } : r)));

  const run = useCallback(async () => {
    // reset
    setRows(r =>
      r.map(row => ({ ...row, status: 'waiting', ms: undefined, note: undefined, sample: undefined }))
    );

    let chosenDamId: string | undefined;
    let chosenGroupName: string | undefined;
    let chosenAnalysisDate: string | undefined;

    // 1) /dams
    try {
      const t0 = performance.now();
      const dams = await fetchAllDams();
      const t1 = performance.now();
      setResult('GET /api/dams', {
        status: 'ok',
        ms: Math.round(t1 - t0),
        sample: dams.slice(0, 3),
        note: dams.length ? `Found ${dams.length} dams` : 'No dams returned',
      });
      if (dams.length) chosenDamId = (dams[0] as Dam).dam_id;
    } catch (e: any) {
      setResult('GET /api/dams', { status: 'error', note: String(e) });
    }

    // 2) /latest_data
    try {
      const t0 = performance.now();
      const latest = await fetchAllLatestData();
      const t1 = performance.now();
      setResult('GET /api/latest_data', {
        status: 'ok',
        ms: Math.round(t1 - t0),
        sample: latest.slice(0, 3),
        note: latest.length ? `Found ${latest.length} latest records` : 'No latest data returned',
      });
      if (!chosenDamId && latest.length) chosenDamId = latest[0].dam_id;
    } catch (e: any) {
      setResult('GET /api/latest_data', { status: 'error', note: String(e) });
    }

    // 3) /dam_groups
    try {
      const t0 = performance.now();
      const groups = await fetchAllDamGroups();
      const t1 = performance.now();
      setResult('GET /api/dam_groups', {
        status: 'ok',
        ms: Math.round(t1 - t0),
        sample: groups.slice(0, 3),
        note: groups.length ? `Found ${groups.length} groups` : 'No groups returned',
      });
      if (groups.length) chosenGroupName = (groups[0] as DamGroup).group_name;
    } catch (e: any) {
      setResult('GET /api/dam_groups', { status: 'error', note: String(e) });
    }

    // 4) /overall_dam_analysis
    try {
      const t0 = performance.now();
      const overall = await fetchAllOverallDamAnalyses();
      const t1 = performance.now();
      setResult('GET /api/overall_dam_analysis', {
        status: 'ok',
        ms: Math.round(t1 - t0),
        sample: overall.slice(0, 2),
        note: overall.length ? `Found ${overall.length} analysis rows` : 'No analysis returned',
      });
      if (overall.length) chosenAnalysisDate = (overall[0] as OverallDamAnalysis).analysis_date;
    } catch (e: any) {
      setResult('GET /api/overall_dam_analysis', { status: 'error', note: String(e) });
    }

    // 5) /dams/:damId
    if (!chosenDamId) {
      setResult('GET /api/dams/:damId', { status: 'skipped', note: 'No dam_id available' });
    } else {
      try {
        const t0 = performance.now();
        const dam = await fetchDamById(chosenDamId);
        const t1 = performance.now();
        setResult('GET /api/dams/:damId', {
          status: 'ok',
          ms: Math.round(t1 - t0),
          sample: dam,
          note: `dam_id=${chosenDamId}`,
        });
      } catch (e: any) {
        setResult('GET /api/dams/:damId', { status: 'error', note: String(e) });
      }
    }

    // 6) /latest_data/:damId
    if (!chosenDamId) {
      setResult('GET /api/latest_data/:damId', { status: 'skipped', note: 'No dam_id available' });
    } else {
      try {
        const t0 = performance.now();
        const latestById = await fetchLatestDataById(chosenDamId);
        const t1 = performance.now();
        setResult('GET /api/latest_data/:damId', {
          status: 'ok',
          ms: Math.round(t1 - t0),
          sample: latestById,
          note: `dam_id=${chosenDamId}`,
        });
      } catch (e: any) {
        setResult('GET /api/latest_data/:damId', { status: 'error', note: String(e) });
      }
    }

    // 7) /specific_dam_analysis/:damId
    if (!chosenDamId) {
      setResult('GET /api/specific_dam_analysis/:damId', { status: 'skipped', note: 'No dam_id available' });
    } else {
      try {
        const t0 = performance.now();
        const specific = await fetchSpecificDamAnalysisById(chosenDamId);
        const t1 = performance.now();
        setResult('GET /api/specific_dam_analysis/:damId', {
          status: 'ok',
          ms: Math.round(t1 - t0),
          sample: specific.slice(0, 3),
          note: `dam_id=${chosenDamId}, rows=${specific.length}`,
        });
      } catch (e: any) {
        setResult('GET /api/specific_dam_analysis/:damId', { status: 'error', note: String(e) });
      }
    }

    // 8) /dam_groups/:groupName
    if (!chosenGroupName) {
      setResult('GET /api/dam_groups/:groupName', { status: 'skipped', note: 'No group_name available' });
    } else {
      try {
        const t0 = performance.now();
        const group = await fetchDamGroupByName(chosenGroupName);
        const t1 = performance.now();
        setResult('GET /api/dam_groups/:groupName', {
          status: 'ok',
          ms: Math.round(t1 - t0),
          sample: group,
          note: `group_name=${chosenGroupName}`,
        });
      } catch (e: any) {
        setResult('GET /api/dam_groups/:groupName', { status: 'error', note: String(e) });
      }
    }

    // 9) /dam_group_members/:groupName
    if (!chosenGroupName) {
      setResult('GET /api/dam_group_members/:groupName', { status: 'skipped', note: 'No group_name available' });
    } else {
      try {
        const t0 = performance.now();
        const members = await fetchDamGroupMembersByGroupName(chosenGroupName);
        const t1 = performance.now();
        setResult('GET /api/dam_group_members/:groupName', {
          status: 'ok',
          ms: Math.round(t1 - t0),
          sample: members.slice(0, 5),
          note: `group_name=${chosenGroupName}, members=${members.length}`,
        });
      } catch (e: any) {
        setResult('GET /api/dam_group_members/:groupName', { status: 'error', note: String(e) });
      }
    }

    // 10) /overall_dam_analysis/:analysisDate
    if (!chosenAnalysisDate) {
      setResult('GET /api/overall_dam_analysis/:analysisDate', { status: 'skipped', note: 'No analysis_date available' });
    } else {
      try {
        const t0 = performance.now();
        const overallByDate = await fetchOverallDamAnalysisByDate(chosenAnalysisDate);
        const t1 = performance.now();
        setResult('GET /api/overall_dam_analysis/:analysisDate', {
          status: 'ok',
          ms: Math.round(t1 - t0),
          sample: overallByDate,
          note: `analysis_date=${chosenAnalysisDate}`,
        });
      } catch (e: any) {
        setResult('GET /api/overall_dam_analysis/:analysisDate', { status: 'error', note: String(e) });
      }
    }
  }, []);

  return (
    <div className="testing-api-calls">
      <div className="header">
        <h2>API Endpoint Tester</h2>
        <button onClick={run}>Run all tests</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>Status</th>
            <th>Time (ms)</th>
            <th>Note</th>
            <th>Sample (truncated)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.name} data-status={r.status}>
              <td>{r.name}</td>
              <td className="status">{r.status}</td>
              <td>{r.ms ?? '-'}</td>
              <td className="note">{r.note ?? '-'}</td>
              <td className="sample">
                <pre>
                  {r.sample
                    ? JSON.stringify(r.sample, null, 2).slice(0, 500) +
                      (JSON.stringify(r.sample).length > 500 ? '…' : '')
                    : '-'}
                </pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="hint">Tip: open DevTools → Network to inspect responses & headers while tests run.</p>
    </div>
  );
};

export default TestingApiCalls;
