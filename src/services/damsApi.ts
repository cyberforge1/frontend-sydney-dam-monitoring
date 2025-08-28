// src/services/damsAPI.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../config/apiConfig';
import {
  Dam,
  DamGroup,
  DamGroupMember,
  DamResource,
  DamAnalysis,
  OverallDamAnalysis,
} from '../types/types';

const withQuery = (params?: Record<string, string | number | undefined>) => {
  if (!params) return '';
  const q = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');
  return q ? `?${q}` : '';
};

export const damsApi = createApi({
  reducerPath: 'damsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Dams', 'Latest', 'Groups', 'Analyses', 'Overall'],
  endpoints: (build) => ({
    // Dams
    getAllDams: build.query<Dam[], { per_page?: number; page?: number } | void>({
      query: (args) => `/dams${withQuery({ per_page: 1000, page: 1, ...(args ?? {}) })}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map((d) => ({ type: 'Dams' as const, id: d.dam_id })),
              { type: 'Dams', id: 'LIST' },
            ]
          : [{ type: 'Dams', id: 'LIST' }],
    }),
    getDamById: build.query<Dam, string>({
      query: (damId) => `/dams/${encodeURIComponent(damId)}`,
      providesTags: (_res, _err, id) => [{ type: 'Dams', id }],
    }),

    // Latest data
    getAllLatestData: build.query<
      DamResource[],
      { per_page?: number; page?: number } | void
    >({
      query: (args) => `/latest_data${withQuery({ per_page: 1000, page: 1, ...(args ?? {}) })}`,
      providesTags: () => [{ type: 'Latest', id: 'LIST' }],
    }),
    getLatestDataById: build.query<DamResource, string>({
      query: (damId) => `/latest_data/${encodeURIComponent(damId)}`,
      providesTags: (_res, _err, id) => [{ type: 'Latest', id }],
    }),

    // Specific dam analysis
    getSpecificDamAnalysisById: build.query<
      DamAnalysis[],
      { damId: string; per_page?: number; page?: number }
    >({
      query: ({ damId, per_page = 1000, page = 1 }) =>
        `/specific_dam_analysis/${encodeURIComponent(damId)}${withQuery({ per_page, page })}`,
      providesTags: (_res, _err, { damId }) => [{ type: 'Analyses', id: damId }],
    }),

    // Dam groups
    getAllDamGroups: build.query<
      DamGroup[],
      { per_page?: number; page?: number } | void
    >({
      query: (args) => `/dam_groups${withQuery({ per_page: 1000, page: 1, ...(args ?? {}) })}`,
      providesTags: () => [{ type: 'Groups', id: 'LIST' }],
    }),
    getDamGroupByName: build.query<DamGroup, string>({
      query: (name) => `/dam_groups/${encodeURIComponent(name)}`,
      providesTags: (_res, _err, name) => [{ type: 'Groups', id: name }],
    }),
    getDamGroupMembersByName: build.query<
      DamGroupMember[],
      { name: string; per_page?: number; page?: number }
    >({
      query: ({ name, per_page = 1000, page = 1 }) =>
        `/dam_group_members/${encodeURIComponent(name)}${withQuery({ per_page, page })}`,
      providesTags: (_res, _err, { name }) => [{ type: 'Groups', id: `${name}_members` }],
    }),

    // Overall analysis
    getAllOverallDamAnalyses: build.query<
      OverallDamAnalysis[],
      { per_page?: number; page?: number } | void
    >({
      query: (args) =>
        `/overall_dam_analysis${withQuery({ per_page: 1000, page: 1, ...(args ?? {}) })}`,
      providesTags: () => [{ type: 'Overall', id: 'LIST' }],
    }),
    getOverallDamAnalysisByDate: build.query<OverallDamAnalysis, string>({
      query: (date) => `/overall_dam_analysis/${encodeURIComponent(date)}`,
      providesTags: (_res, _err, date) => [{ type: 'Overall', id: date }],
    }),
  }),
});

export const {
  useGetAllDamsQuery,
  useGetDamByIdQuery,
  useGetAllLatestDataQuery,
  useGetLatestDataByIdQuery,
  useGetSpecificDamAnalysisByIdQuery,
  useGetAllDamGroupsQuery,
  useGetDamGroupByNameQuery,
  useGetDamGroupMembersByNameQuery,
  useGetAllOverallDamAnalysesQuery,
  useGetOverallDamAnalysisByDateQuery,
} = damsApi;
