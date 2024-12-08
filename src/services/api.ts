// src/services/api.ts

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

// Define interfaces for better type safety
interface Dam {
    dam_id: string;
    dam_name: string;
    full_volume?: number;
    latitude?: number;
    longitude?: number;
}

interface DamResource {
    resource_id: number;
    dam_id: string;
    date: string;
    storage_volume?: number;
    percentage_full?: number;
    storage_inflow?: number;
    storage_release?: number;
}

interface DamAnalysis {
    dam_id: string;
    analysis_date: string;
    avg_storage_volume_12_months?: number;
    avg_storage_volume_5_years?: number;
    avg_storage_volume_20_years?: number;
    avg_percentage_full_12_months?: number;
    avg_percentage_full_5_years?: number;
    avg_percentage_full_20_years?: number;
    avg_storage_inflow_12_months?: number;
    avg_storage_inflow_5_years?: number;
    avg_storage_inflow_20_years?: number;
    avg_storage_release_12_months?: number;
    avg_storage_release_5_years?: number;
    avg_storage_release_20_years?: number;
}

// Helper function for making API calls
const apiFetch = async <T>(endpoint: string): Promise<T> => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};

// API Methods
export const fetchHelloWorld = async (): Promise<string> => apiFetch<string>('/');

export const fetchAllDams = async (): Promise<Dam[]> =>
    apiFetch<Dam[]>('/dams/');

export const fetchDamById = async (damId: string): Promise<Dam> =>
    apiFetch<Dam>(`/dams/${damId}`);

export const fetchAllLatestData = async (): Promise<DamResource[]> =>
    apiFetch<DamResource[]>('/latest_data/');

export const fetchLatestDataById = async (damId: string): Promise<DamResource> =>
    apiFetch<DamResource>(`/latest_data/${damId}`);

export const fetchAllDamResources = async (): Promise<DamResource[]> =>
    apiFetch<DamResource[]>('/dam_resources/');

export const fetchDamResourceById = async (resourceId: number): Promise<DamResource> =>
    apiFetch<DamResource>(`/dam_resources/${resourceId}`);

export const fetchAllSpecificDamAnalyses = async (): Promise<DamAnalysis[]> =>
    apiFetch<DamAnalysis[]>('/specific_dam_analysis/');

export const fetchSpecificDamAnalysisById = async (damId: string): Promise<DamAnalysis[]> =>
    apiFetch<DamAnalysis[]>(`/specific_dam_analysis/${damId}`);

export const fetchAllOverallDamAnalyses = async (): Promise<DamAnalysis[]> =>
    apiFetch<DamAnalysis[]>('/overall_dam_analysis/');

export const fetchOverallDamAnalysisByDate = async (date: string): Promise<DamAnalysis> =>
    apiFetch<DamAnalysis>(`/overall_dam_analysis/${date}`);

export const fetchAllDamGroups = async (): Promise<{ group_name: string }[]> =>
    apiFetch<{ group_name: string }[]>('/dam_groups/');

export const fetchDamsByGroupName = async (groupName: string): Promise<Dam[]> =>
    apiFetch<Dam[]>(`/dam_groups/${groupName}`);

export const fetchAllDamGroupMembers = async (): Promise<{ group_name: string; dam_id: string }[]> =>
    apiFetch<{ group_name: string; dam_id: string }[]>('/dam_group_members/');

export const fetchDamGroupMembersByGroupName = async (groupName: string): Promise<{ group_name: string; dam_id: string }[]> =>
    apiFetch<{ group_name: string; dam_id: string }[]>(`/dam_group_members/${groupName}`);

// Additional API Methods (Ensure these exist in your Flask backend)
export const fetchAvgPercentageFull12Months = async (): Promise<number> => {
    return apiFetch<number>('/overall_dam_analysis/12_months');
};

export const fetchAvgPercentageFull5Years = async (): Promise<number> => {
    return apiFetch<number>('/overall_dam_analysis/5_years');
};

export const fetchAvgPercentageFull20Years = async (): Promise<number> => {
    return apiFetch<number>('/overall_dam_analysis/20_years');
};

export const fetchAvgPercentageFull12MonthsById = async (damId: string): Promise<number> => {
    return apiFetch<number>(`/specific_dam_analysis/${damId}/avg_percentage_full/12_months`);
};

export const fetchAvgPercentageFull5YearsById = async (damId: string): Promise<number> => {
    return apiFetch<number>(`/specific_dam_analysis/${damId}/avg_percentage_full/5_years`);
};

export const fetchAvgPercentageFull20YearsById = async (damId: string): Promise<number> => {
    return apiFetch<number>(`/specific_dam_analysis/${damId}/avg_percentage_full/20_years`);
};
