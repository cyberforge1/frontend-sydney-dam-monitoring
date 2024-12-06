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

// Centralized data transformation and validation
const validateDamResources = (resources: DamResource[]): DamResource[] =>
    resources
        .filter(
            resource =>
                resource.percentage_full !== undefined &&
                resource.storage_volume !== undefined &&
                resource.storage_inflow !== undefined &&
                resource.storage_release !== undefined
        )
        .map(resource => ({
            ...resource,
            percentage_full: resource.percentage_full!,
            storage_volume: resource.storage_volume!,
            storage_inflow: resource.storage_inflow!,
            storage_release: resource.storage_release!,
        }));

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

export const fetchLatestDataById = async (damId: string): Promise<DamResource> =>
    apiFetch<DamResource>(`/latest_data/${damId}`);

export const fetchDamsDataByGroup = async (groupName: string): Promise<Dam[]> =>
    apiFetch<Dam[]>(`/dam_groups/${groupName}`);

export const fetchDamNames = async (): Promise<string[]> =>
    apiFetch<Dam[]>(`/dams/`).then(data => data.map(dam => dam.dam_name));

export const fetchDamDataByName = async (damName: string): Promise<Dam[]> =>
    apiFetch<Dam[]>(`/dams?dam_name=${encodeURIComponent(damName)}`);

export const fetchDamResources = async (damId: string): Promise<DamResource[]> =>
    apiFetch<DamResource[]>(`/dam_resources/${damId}`).then(validateDamResources);

export const fetchAvgPercentageFull12Months = async (): Promise<number> =>
    apiFetch<{ avg_percentage_full_12_months: number }>(`/overall_dam_analysis`).then(
        data => data.avg_percentage_full_12_months
    );

export const fetchAvgPercentageFull5Years = async (): Promise<number> =>
    apiFetch<{ avg_percentage_full_5_years: number }>(`/overall_dam_analysis`).then(
        data => data.avg_percentage_full_5_years
    );

export const fetchAvgPercentageFull20Years = async (): Promise<number> =>
    apiFetch<{ avg_percentage_full_20_years: number }>(`/overall_dam_analysis`).then(
        data => data.avg_percentage_full_20_years
    );

export const fetchAvgPercentageFull12MonthsById = async (damId: string): Promise<number> =>
    apiFetch<{ avg_percentage_full_12_months: number }>(`/specific_dam_analysis/${damId}`).then(
        data => data.avg_percentage_full_12_months
    );

export const fetchAvgPercentageFull5YearsById = async (damId: string): Promise<number> =>
    apiFetch<{ avg_percentage_full_5_years: number }>(`/specific_dam_analysis/${damId}`).then(
        data => data.avg_percentage_full_5_years
    );

export const fetchAvgPercentageFull20YearsById = async (damId: string): Promise<number> =>
    apiFetch<{ avg_percentage_full_20_years: number }>(`/specific_dam_analysis/${damId}`).then(
        data => data.avg_percentage_full_20_years
    );

export const fetchDamData12Months = async (groupName: string): Promise<DamAnalysis[]> =>
    apiFetch<DamAnalysis[]>(`/overall_dam_analysis/12_months/${groupName}`);
