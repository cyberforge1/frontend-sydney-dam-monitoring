// src/api/api.ts

import { Dam, DamGroup, DamGroupMember, DamResource, DamAnalysis } from '../types/types';

// Fetch all dams
export const fetchAllDams = async (): Promise<Dam[]> => {
  const response = await fetch('/api/dams');
  if (!response.ok) {
    throw new Error('Failed to fetch dams');
  }
  return response.json();
};

// Fetch dam by ID
export const fetchDamById = async (damId: string): Promise<Dam> => {
  const response = await fetch(`/api/dams/${damId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch dam with ID: ${damId}`);
  }
  return response.json();
};

// Fetch all dam groups
export const fetchAllDamGroups = async (): Promise<DamGroup[]> => {
  const response = await fetch('/api/damGroups');
  if (!response.ok) {
    throw new Error('Failed to fetch dam groups');
  }
  return response.json();
};

// Fetch dams by group name
export const fetchDamsByGroupName = async (groupName: string): Promise<Dam[]> => {
  const response = await fetch(`/api/damGroups/${groupName}/dams`);
  if (!response.ok) {
    throw new Error(`Failed to fetch dams for group: ${groupName}`);
  }
  return response.json();
};

// Fetch dam group members by group name
export const fetchDamGroupMembersByGroupName = async (groupName: string): Promise<DamGroupMember[]> => {
  const response = await fetch(`/api/damGroups/${groupName}/members`);
  if (!response.ok) {
    throw new Error(`Failed to fetch members for group: ${groupName}`);
  }
  return response.json();
};

// Fetch latest data by dam ID
export const fetchLatestDataById = async (damId: string): Promise<DamResource> => {
  const response = await fetch(`/api/dams/${damId}/latestData`);
  if (!response.ok) {
    throw new Error(`Failed to fetch latest data for dam ID: ${damId}`);
  }
  return response.json();
};

// Fetch all latest dam data
export const fetchAllLatestData = async (): Promise<DamResource[]> => {
  const response = await fetch('/api/damResources/latestData');
  if (!response.ok) {
    throw new Error('Failed to fetch all latest dam data');
  }
  return response.json();
};

// Fetch specific dam analysis by dam ID
export const fetchSpecificDamAnalysisById = async (damId: string): Promise<DamAnalysis[]> => {
  const response = await fetch(`/api/dams/${damId}/analysis`);
  if (!response.ok) {
    throw new Error(`Failed to fetch analysis for dam ID: ${damId}`);
  }
  return response.json();
};

// Fetch average percentage full for 12 months
export const fetchAvgPercentageFull12Months = async (): Promise<number> => {
  const response = await fetch('/api/damResources/avgPercentageFull/12Months');
  if (!response.ok) {
    throw new Error('Failed to fetch 12-month average percentage full');
  }
  const data = await response.json();
  return data.average;
};

// Fetch average percentage full for 5 years
export const fetchAvgPercentageFull5Years = async (): Promise<number> => {
  const response = await fetch('/api/damResources/avgPercentageFull/5Years');
  if (!response.ok) {
    throw new Error('Failed to fetch 5-year average percentage full');
  }
  const data = await response.json();
  return data.average;
};

// Fetch average percentage full for 20 years
export const fetchAvgPercentageFull20Years = async (): Promise<number> => {
  const response = await fetch('/api/damResources/avgPercentageFull/20Years');
  if (!response.ok) {
    throw new Error('Failed to fetch 20-year average percentage full');
  }
  const data = await response.json();
  return data.average;
};
