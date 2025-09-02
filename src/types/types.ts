// src/types/types.ts
export interface Dam {
  dam_id: string;
  dam_name: string;
  full_volume?: number | null;
  latitude?: number | null;
  longitude?: number | null;
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
  dam_name?: string;
  date: string; // ISO date
  percentage_full?: number | null;
  storage_volume?: number | null;
  storage_inflow?: number | null;
  storage_release?: number | null;
}

export interface DamAnalysis {
  dam_id: string;
  analysis_date: string; // ISO date
  avg_percentage_full_12_months?: number | null;
  avg_percentage_full_5_years?: number | null;
  avg_percentage_full_20_years?: number | null;
  avg_storage_volume_12_months?: number | null;
  avg_storage_volume_5_years?: number | null;
  avg_storage_volume_20_years?: number | null;
  avg_storage_inflow_12_months?: number | null;
  avg_storage_inflow_5_years?: number | null;
  avg_storage_inflow_20_years?: number | null;
  avg_storage_release_12_months?: number | null;
  avg_storage_release_5_years?: number | null;
  avg_storage_release_20_years?: number | null;
}

export interface OverallDamAnalysis {
  analysis_date: string; // ISO date
  avg_percentage_full_12_months?: number | null;
  avg_percentage_full_5_years?: number | null;
  avg_percentage_full_20_years?: number | null;
  avg_storage_volume_12_months?: number | null;
  avg_storage_volume_5_years?: number | null;
  avg_storage_volume_20_years?: number | null;
  avg_storage_inflow_12_months?: number | null;
  avg_storage_inflow_5_years?: number | null;
  avg_storage_inflow_20_years?: number | null;
  avg_storage_release_12_months?: number | null;
  avg_storage_release_5_years?: number | null;
  avg_storage_release_20_years?: number | null;
}
