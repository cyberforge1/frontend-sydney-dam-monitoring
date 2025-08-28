// src/types/types.ts

export interface Dam {
  dam_id: string;
  dam_name: string;
  full_volume?: number;
  latitude?: number;
  longitude?: number;
}

export interface DamGroup {
  group_name: string;
}

export interface DamGroupMember {
  group_name: string;
  dam_id: string;
}

export interface DamResource {
  dam_id: string;
  dam_name?: string;            // ← optional to match API payloads that include it
  date: string;                 // 'YYYY-MM-DD'
  percentage_full: number;
  storage_volume: number;
  storage_inflow: number;
  storage_release: number;
}

export interface DamAnalysis {
  dam_id: string;
  analysis_date: string;        // 'YYYY-MM-DD'
  avg_percentage_full_12_months?: number;
  avg_percentage_full_5_years?: number;
  avg_percentage_full_20_years?: number;
  avg_storage_volume_12_months?: number;
  avg_storage_volume_5_years?: number;
  avg_storage_volume_20_years?: number;
  avg_storage_inflow_12_months?: number;
  avg_storage_inflow_5_years?: number;
  avg_storage_inflow_20_years?: number;
  avg_storage_release_12_months?: number;
  avg_storage_release_5_years?: number;
  avg_storage_release_20_years?: number;
}

export interface OverallDamAnalysis {
  analysis_date: string;        // 'YYYY-MM-DD'
  avg_percentage_full_12_months: number;
  avg_percentage_full_5_years: number;
  avg_percentage_full_20_years: number;
  avg_storage_volume_12_months: number;
  avg_storage_volume_5_years: number;
  avg_storage_volume_20_years: number;
  avg_storage_inflow_12_months: number;
  avg_storage_inflow_5_years: number;
  avg_storage_inflow_20_years: number;
  avg_storage_release_12_months: number;
  avg_storage_release_5_years: number;
  avg_storage_release_20_years: number;
}
