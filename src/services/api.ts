// src/services/api.ts

// Define the API base URL
const BASE_URL = 'http://localhost:5001/api';

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
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }
    return response.json();
};

// Fetch "Hello World" message from the API
export const fetchHelloWorld = async (): Promise<string> => {
    return apiFetch<string>('/');
};

// Fetch latest data for a specific dam by ID
export const fetchLatestDataById = async (damId: string): Promise<DamResource> => {
    return apiFetch<DamResource>(`/latest_data/${damId}`);
};

// Fetch dams data by group name
export const fetchDamsDataByGroup = async (groupName: string): Promise<Dam[]> => {
    return apiFetch<Dam[]>(`/dam_groups/${groupName}`);
};

// Fetch all dam names
export const fetchDamNames = async (): Promise<string[]> => {
    const data = await apiFetch<Dam[]>(`/dams/`);
    return data.map(dam => dam.dam_name);
};

// Fetch dam data by name
export const fetchDamDataByName = async (damName: string): Promise<Dam[]> => {
    return apiFetch<Dam[]>(`/dams?dam_name=${encodeURIComponent(damName)}`);
};

// Fetch dam resources by dam ID
export const fetchDamResources = async (damId: string): Promise<DamResource[]> => {
    return apiFetch<DamResource[]>(`/dam_resources/${damId}`);
};

// Fetch overall analysis: Average percentage full for 12 months
export const fetchAvgPercentageFull12Months = async (): Promise<number> => {
    const data = await apiFetch<{ avg_percentage_full_12_months: number }>(`/overall_dam_analysis`);
    return data.avg_percentage_full_12_months;
};

// Fetch overall analysis: Average percentage full for 5 years
export const fetchAvgPercentageFull5Years = async (): Promise<number> => {
    const data = await apiFetch<{ avg_percentage_full_5_years: number }>(`/overall_dam_analysis`);
    return data.avg_percentage_full_5_years;
};

// Fetch overall analysis: Average percentage full for 20 years
export const fetchAvgPercentageFull20Years = async (): Promise<number> => {
    const data = await apiFetch<{ avg_percentage_full_20_years: number }>(`/overall_dam_analysis`);
    return data.avg_percentage_full_20_years;
};

// Fetch specific dam analysis for 12 months by dam ID
export const fetchAvgPercentageFull12MonthsById = async (damId: string): Promise<number> => {
    const data = await apiFetch<{ avg_percentage_full_12_months: number }>(`/specific_dam_analysis/${damId}`);
    return data.avg_percentage_full_12_months;
};

// Fetch specific dam analysis for 5 years by dam ID
export const fetchAvgPercentageFull5YearsById = async (damId: string): Promise<number> => {
    const data = await apiFetch<{ avg_percentage_full_5_years: number }>(`/specific_dam_analysis/${damId}`);
    return data.avg_percentage_full_5_years;
};

// Fetch specific dam analysis for 20 years by dam ID
export const fetchAvgPercentageFull20YearsById = async (damId: string): Promise<number> => {
    const data = await apiFetch<{ avg_percentage_full_20_years: number }>(`/specific_dam_analysis/${damId}`);
    return data.avg_percentage_full_20_years;
};

// Fetch dam data for 12 months by group name
export const fetchDamData12Months = async (groupName: string): Promise<DamAnalysis[]> => {
    return apiFetch<DamAnalysis[]>(`/overall_dam_analysis/12_months/${groupName}`);
};
