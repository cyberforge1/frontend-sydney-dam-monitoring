// src/api/api.ts

import {
  Dam,
  DamGroup,
  DamGroupMember,
  DamResource,
  DamAnalysis,
  OverallDamAnalysis,
} from '../types/types';

const RAW_BASE =
  (typeof process !== 'undefined' &&
    (process.env?.VITE_API_BASE_URL || process.env?.API_BASE_URL)) ||
  (typeof window !== 'undefined' && (window as any).__API_BASE_URL__) ||
  '/api';

const API_BASE = String(RAW_BASE).replace(/\/+$/, '');

const url = (...parts: string[]) =>
  `${API_BASE}/${parts.map(encodeURIComponent).join('/')}`.replace(
    /([^:]\/)\/+/g,
    '$1'
  );

const withQuery = (
  base: string,
  params: Record<string, string | number | undefined>
) => {
  const q = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');
  return q ? `${base}?${q}` : base;
};

const fetchData = async <T>(endpoint: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(endpoint, init);
  if (!response.ok) {
    let body = '';
    try {
      body = await response.text();
    } catch {
    }
    throw new Error(
      `Error fetching ${endpoint}: ${response.status} ${response.statusText}${
        body ? ` - ${body}` : ''
      }`
    );
  }
  return response.json() as Promise<T>;
};

const normalizeArray = <T>(payload: any): T[] => {
  if (Array.isArray(payload)) return payload as T[];
  if (payload && Array.isArray(payload.data)) return payload.data as T[];
  return [];
};

const normalizeObject = <T>(payload: any): T => {
  if (payload && payload.data && !Array.isArray(payload.data)) {
    return payload.data as T;
  }
  return payload as T;
};

export const fetchAllDams = async (): Promise<Dam[]> => {
  const endpoint = withQuery(url('dams'), { per_page: 1000, page: 1 });
  const payload = await fetchData<any>(endpoint);
  return normalizeArray<Dam>(payload);
};

export const fetchDamById = async (damId: string): Promise<Dam> => {
  const payload = await fetchData<any>(url('dams', damId));
  return normalizeObject<Dam>(payload);
};

export const fetchAllLatestData = async (): Promise<DamResource[]> => {
  const endpoint = withQuery(url('latest_data'), { per_page: 1000, page: 1 });
  const payload = await fetchData<any>(endpoint);
  return normalizeArray<DamResource>(payload);
};

export const fetchLatestDataById = async (damId: string): Promise<DamResource> => {
  const payload = await fetchData<any>(url('latest_data', damId));
  return normalizeObject<DamResource>(payload);
};

export const fetchSpecificDamAnalysisById = async (
  damId: string
): Promise<DamAnalysis[]> => {
  const endpoint = withQuery(url('specific_dam_analysis', damId), {
    per_page: 1000,
    page: 1,
  });
  const payload = await fetchData<any>(endpoint);
  return normalizeArray<DamAnalysis>(payload);
};

export const fetchAllDamGroups = async (): Promise<DamGroup[]> => {
  const endpoint = withQuery(url('dam_groups'), { per_page: 1000, page: 1 });
  const payload = await fetchData<any>(endpoint);
  return normalizeArray<DamGroup>(payload);
};

export const fetchDamGroupByName = async (groupName: string): Promise<DamGroup> => {
  const payload = await fetchData<any>(url('dam_groups', groupName));
  return normalizeObject<DamGroup>(payload);
};

export const fetchDamGroupMembersByGroupName = async (
  groupName: string
): Promise<DamGroupMember[]> => {
  const endpoint = withQuery(url('dam_group_members', groupName), {
    per_page: 1000,
    page: 1,
  });
  const payload = await fetchData<any>(endpoint);
  return normalizeArray<DamGroupMember>(payload);
};

export const fetchAllOverallDamAnalyses = async (): Promise<OverallDamAnalysis[]> => {
  const endpoint = withQuery(url('overall_dam_analysis'), {
    per_page: 1000,
    page: 1,
  });
  const payload = await fetchData<any>(endpoint);
  return normalizeArray<OverallDamAnalysis>(payload);
};

export const fetchOverallDamAnalysisByDate = async (
  analysisDate: string
): Promise<OverallDamAnalysis> => {
  const payload = await fetchData<any>(url('overall_dam_analysis', analysisDate));
  return normalizeObject<OverallDamAnalysis>(payload);
};
