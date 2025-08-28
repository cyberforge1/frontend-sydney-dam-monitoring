// src/api/api.ts

import {
  Dam,
  DamGroup,
  DamGroupMember,
  DamResource,
  DamAnalysis,
  OverallDamAnalysis,
} from '../types/types';

/**
 * Resolve API base URL in this order:
 * 1) process.env.VITE_API_BASE_URL or process.env.API_BASE_URL  (Node/Jest, SSR)
 * 2) window.__API_BASE_URL__                                   (browser override for e2e/tests)
 * 3) '/api'                                                    (dev fallback / proxy)
 */
const RAW_BASE =
  (typeof process !== 'undefined' &&
    (process.env?.VITE_API_BASE_URL || process.env?.API_BASE_URL)) ||
  (typeof window !== 'undefined' && (window as any).__API_BASE_URL__) ||
  '/api';

const API_BASE = String(RAW_BASE).replace(/\/+$/, ''); // strip trailing slash(es)

/** join base + path segments, ensuring single slashes */
const url = (...parts: string[]) =>
  `${API_BASE}/${parts.map(encodeURIComponent).join('/')}`.replace(
    /([^:]\/)\/+/g,
    '$1'
  );

/** minimal fetch wrapper with better error messages */
const fetchData = async <T>(endpoint: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(endpoint, init);
  if (!response.ok) {
    // try to surface response body for easier debugging
    let body = '';
    try {
      body = await response.text();
    } catch {
      /* ignore */
    }
    throw new Error(
      `Error fetching ${endpoint}: ${response.status} ${response.statusText}${
        body ? ` - ${body}` : ''
      }`
    );
  }
  return response.json() as Promise<T>;
};

// ---- Endpoints --------------------------------------------------------------

export const fetchAllDams = (): Promise<Dam[]> =>
  fetchData<Dam[]>(url('dams'));

export const fetchDamById = (damId: string): Promise<Dam> =>
  fetchData<Dam>(url('dams', damId));

export const fetchAllLatestData = (): Promise<DamResource[]> =>
  fetchData<DamResource[]>(url('latest_data'));

export const fetchLatestDataById = (damId: string): Promise<DamResource> =>
  fetchData<DamResource>(url('latest_data', damId));

export const fetchSpecificDamAnalysisById = (
  damId: string
): Promise<DamAnalysis[]> =>
  fetchData<DamAnalysis[]>(url('specific_dam_analysis', damId));

export const fetchAllDamGroups = (): Promise<DamGroup[]> =>
  fetchData<DamGroup[]>(url('dam_groups'));

export const fetchDamGroupByName = (groupName: string): Promise<DamGroup> =>
  fetchData<DamGroup>(url('dam_groups', groupName));

export const fetchDamGroupMembersByGroupName = (
  groupName: string
): Promise<DamGroupMember[]> =>
  fetchData<DamGroupMember[]>(url('dam_group_members', groupName));

export const fetchAllOverallDamAnalyses = (): Promise<OverallDamAnalysis[]> =>
  fetchData<OverallDamAnalysis[]>(url('overall_dam_analysis'));

export const fetchOverallDamAnalysisByDate = (
  analysisDate: string
): Promise<OverallDamAnalysis> =>
  fetchData<OverallDamAnalysis>(url('overall_dam_analysis', analysisDate));
