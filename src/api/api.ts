// src/api/api.ts

import {
  Dam,
  DamGroup,
  DamGroupMember,
  DamResource,
  DamAnalysis,
  OverallDamAnalysis,
} from '../types/types';

// Base API URL (useful if environment-specific or configurable)
const API_BASE_URL = '/api';

// Utility function to fetch data
const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching ${url}: ${response.status} ${response.statusText} - ${errorText}`);
  }
  return response.json();
};

// Fetch all dams
export const fetchAllDams = async (): Promise<Dam[]> => {
  return fetchData<Dam[]>(`${API_BASE_URL}/dams`);
};

// Fetch dam by ID
export const fetchDamById = async (damId: string): Promise<Dam> => {
  return fetchData<Dam>(`${API_BASE_URL}/dams/${damId}`);
};

// Fetch all latest dam data
export const fetchAllLatestData = async (): Promise<DamResource[]> => {
  return fetchData<DamResource[]>(`${API_BASE_URL}/latest_data`);
};

// Fetch latest data by dam ID
export const fetchLatestDataById = async (damId: string): Promise<DamResource> => {
  return fetchData<DamResource>(`${API_BASE_URL}/latest_data/${damId}`);
};

// Fetch specific dam analysis by dam ID
export const fetchSpecificDamAnalysisById = async (damId: string): Promise<DamAnalysis[]> => {
  return fetchData<DamAnalysis[]>(`${API_BASE_URL}/specific_dam_analysis/${damId}`);
};

// Fetch all dam groups
export const fetchAllDamGroups = async (): Promise<DamGroup[]> => {
  return fetchData<DamGroup[]>(`${API_BASE_URL}/dam_groups`);
};

// Fetch dam group by name
export const fetchDamGroupByName = async (groupName: string): Promise<DamGroup> => {
  return fetchData<DamGroup>(`${API_BASE_URL}/dam_groups/${groupName}`);
};

// Fetch dam group members by group name
export const fetchDamGroupMembersByGroupName = async (groupName: string): Promise<DamGroupMember[]> => {
  return fetchData<DamGroupMember[]>(`${API_BASE_URL}/dam_group_members/${groupName}`);
};

// Fetch all overall dam analyses
export const fetchAllOverallDamAnalyses = async (): Promise<OverallDamAnalysis[]> => {
  return fetchData<OverallDamAnalysis[]>(`${API_BASE_URL}/overall_dam_analysis`);
};

// Fetch overall dam analysis by date
export const fetchOverallDamAnalysisByDate = async (analysisDate: string): Promise<OverallDamAnalysis> => {
  return fetchData<OverallDamAnalysis>(`${API_BASE_URL}/overall_dam_analysis/${analysisDate}`);
};
