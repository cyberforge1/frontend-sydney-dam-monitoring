// src/__tests__/api/api.test.ts

import {
  fetchAllDams,
  fetchDamById,
  fetchAllLatestData,
  fetchLatestDataById,
  fetchSpecificDamAnalysisById,
  fetchAllDamGroups,
  fetchDamGroupByName,
  fetchDamGroupMembersByGroupName,
  fetchAllOverallDamAnalyses,
  fetchOverallDamAnalysisByDate,
} from '../../api/api';

const mockData = {
  dams: [
    {
      dam_id: '203042',
      dam_name: 'Toonumbar Dam',
      full_volume: 10814,
      latitude: -28.602383,
      longitude: 152.763769,
    },
  ],
  damGroups: [
    { group_name: 'small_dams' },
    { group_name: 'large_dams' },
  ],
  damGroupMembers: [
    { group_name: 'small_dams', dam_id: '203042' },
    { group_name: 'large_dams', dam_id: '210097' },
  ],
  latestData: [
    {
      dam_id: '203042',
      dam_name: 'Toonumbar Dam',
      date: '2024-11-25',
      storage_volume: 10500.0,
      percentage_full: 97.0,
      storage_inflow: 500.5,
      storage_release: 300.3,
    },
  ],
  specificDamAnalysis: [
    {
      dam_id: '203042',
      analysis_date: '2024-11-01',
      avg_storage_volume_12_months: 10500.0,
    },
  ],
  overallDamAnalysis: [
    {
      analysis_date: '2023-01-01',
      avg_storage_volume_12_months: 10500.0,
    },
  ],
};

describe('API methods', () => {
  const mockFetch = (mockResponse: unknown, status = 200) => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: status >= 200 && status < 300,
        status,
        statusText: 'OK',
        json: () => Promise.resolve(mockResponse),
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      })
    ) as jest.Mock;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAllDams', () => {
    it('should return all dams', async () => {
      mockFetch(mockData.dams);
      const result = await fetchAllDams();
      expect(result).toEqual(mockData.dams);
      expect(global.fetch).toHaveBeenCalledWith('/api/dams');
    });
  });

  describe('fetchDamById', () => {
    it('should return a dam by ID', async () => {
      mockFetch(mockData.dams[0]);
      const result = await fetchDamById('203042');
      expect(result).toEqual(mockData.dams[0]);
      expect(global.fetch).toHaveBeenCalledWith('/api/dams/203042');
    });
  });

  describe('fetchAllLatestData', () => {
    it('should return all latest dam data', async () => {
      mockFetch(mockData.latestData);
      const result = await fetchAllLatestData();
      expect(result).toEqual(mockData.latestData);
      expect(global.fetch).toHaveBeenCalledWith('/api/latest_data');
    });
  });

  describe('fetchLatestDataById', () => {
    it('should return latest data for a specific dam', async () => {
      mockFetch(mockData.latestData[0]);
      const result = await fetchLatestDataById('203042');
      expect(result).toEqual(mockData.latestData[0]);
      expect(global.fetch).toHaveBeenCalledWith('/api/latest_data/203042');
    });
  });

  describe('fetchSpecificDamAnalysisById', () => {
    it('should return specific dam analysis by dam ID', async () => {
      mockFetch(mockData.specificDamAnalysis);
      const result = await fetchSpecificDamAnalysisById('203042');
      expect(result).toEqual(mockData.specificDamAnalysis);
      expect(global.fetch).toHaveBeenCalledWith('/api/specific_dam_analysis/203042');
    });
  });

  describe('fetchAllDamGroups', () => {
    it('should return all dam groups', async () => {
      mockFetch(mockData.damGroups);
      const result = await fetchAllDamGroups();
      expect(result).toEqual(mockData.damGroups);
      expect(global.fetch).toHaveBeenCalledWith('/api/dam_groups');
    });
  });

  describe('fetchDamGroupByName', () => {
    it('should return a dam group by name', async () => {
      mockFetch(mockData.damGroups[0]);
      const result = await fetchDamGroupByName('small_dams');
      expect(result).toEqual(mockData.damGroups[0]);
      expect(global.fetch).toHaveBeenCalledWith('/api/dam_groups/small_dams');
    });
  });

  describe('fetchDamGroupMembersByGroupName', () => {
    it('should return members of a dam group', async () => {
      mockFetch(mockData.damGroupMembers);
      const result = await fetchDamGroupMembersByGroupName('small_dams');
      expect(result).toEqual(mockData.damGroupMembers);
      expect(global.fetch).toHaveBeenCalledWith('/api/dam_group_members/small_dams');
    });
  });

  describe('fetchAllOverallDamAnalyses', () => {
    it('should return overall dam analyses', async () => {
      mockFetch(mockData.overallDamAnalysis);
      const result = await fetchAllOverallDamAnalyses();
      expect(result).toEqual(mockData.overallDamAnalysis);
      expect(global.fetch).toHaveBeenCalledWith('/api/overall_dam_analysis');
    });
  });

  describe('fetchOverallDamAnalysisByDate', () => {
    it('should return overall dam analysis by date', async () => {
      mockFetch(mockData.overallDamAnalysis[0]);
      const result = await fetchOverallDamAnalysisByDate('2023-01-01');
      expect(result).toEqual(mockData.overallDamAnalysis[0]);
      expect(global.fetch).toHaveBeenCalledWith('/api/overall_dam_analysis/2023-01-01');
    });
  });
});
