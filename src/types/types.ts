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
    dam_id: string; // Associates resource with a dam
    date: string;
    percentage_full: number;
    storage_volume: number;
    storage_inflow: number;
    storage_release: number;
  }
  
  export interface DamAnalysis {
    dam_id: string;
    analysis_date: string;
    avg_percentage_full_12_months?: number;
    avg_percentage_full_5_years?: number;
    avg_percentage_full_20_years?: number;
    // Add other analysis fields as needed
  }
  
  export interface DamData {
    dam_id: string;
    dam_name: string;
    percentage_full: number;
  }
  