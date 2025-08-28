// src/__tests__/api/api.test.ts

/* eslint-disable @typescript-eslint/no-explicit-any */

type ApiModule = typeof import('../../api/api');

const mockFetchOk = (payload: unknown) =>
  (global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => payload,
      text: async () => JSON.stringify(payload),
    } as any)
  ) as jest.Mock);

const mockFetchError = (status: number, statusText = 'Error', body = 'Not Found') =>
  (global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      status,
      statusText,
      json: async () => {
        throw new Error('no json for error');
      },
      text: async () => body,
    } as any)
  ) as jest.Mock);

/**
 * Helper to load the API module in a fresh module context
 * AFTER setting an env override. This is required because
 * the base URL is resolved at module import time.
 */
const loadApiWithEnv = async (baseUrl?: string): Promise<ApiModule> => {
  const oldEnv = { ...process.env };
  if (baseUrl === undefined) {
    delete process.env.VITE_API_BASE_URL;
    delete process.env.API_BASE_URL;
  } else {
    process.env.VITE_API_BASE_URL = baseUrl;
  }

  let mod: ApiModule;
  await jest.isolateModulesAsync(async () => {
    // dynamic import inside isolateModules to force re-evaluation
    mod = (await import('../../api/api')) as ApiModule;
  });

  // restore env for other tests
  process.env = oldEnv;
  return mod!;
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('api.ts – base URL resolution', () => {
  test('uses default "/api" when no env or window override', async () => {
    const api = await loadApiWithEnv(); // no env override
    mockFetchOk([{ dam_id: 'X' }]);

    const result = await api.fetchAllDams();
    expect(result).toEqual([{ dam_id: 'X' }]);
    expect(global.fetch).toHaveBeenCalledWith('/api/dams', undefined);
  });

  test('uses process.env.VITE_API_BASE_URL when provided', async () => {
    const api = await loadApiWithEnv('http://localhost:5000/api');
    mockFetchOk({ dam_id: '123' });

    const result = await api.fetchDamById('123');
    expect(result).toEqual({ dam_id: '123' });
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:5000/api/dams/123',
      undefined
    );
  });
});

describe('api.ts – endpoints', () => {
  let api: ApiModule;

  beforeAll(async () => {
    // import with default base
    api = await loadApiWithEnv();
  });

  test('fetchAllDams', async () => {
    const dams = [
      { dam_id: '203042', dam_name: 'Toonumbar Dam' },
      { dam_id: '210097', dam_name: 'Glenbawn Dam' },
    ];
    mockFetchOk(dams);

    const res = await api.fetchAllDams();
    expect(res).toEqual(dams);
    expect(global.fetch).toHaveBeenCalledWith('/api/dams', undefined);
  });

  test('fetchDamById', async () => {
    const dam = { dam_id: '203042', dam_name: 'Toonumbar Dam' };
    mockFetchOk(dam);

    const res = await api.fetchDamById('203042');
    expect(res).toEqual(dam);
    expect(global.fetch).toHaveBeenCalledWith('/api/dams/203042', undefined);
  });

  test('fetchAllLatestData', async () => {
    const latest = [
      {
        dam_id: '203042',
        date: '2024-11-25',
        percentage_full: 97,
        storage_volume: 10500,
        storage_inflow: 500.5,
        storage_release: 300.3,
      },
    ];
    mockFetchOk(latest);

    const res = await api.fetchAllLatestData();
    expect(res).toEqual(latest);
    expect(global.fetch).toHaveBeenCalledWith('/api/latest_data', undefined);
  });

  test('fetchLatestDataById', async () => {
    const latest = {
      dam_id: '203042',
      date: '2024-11-25',
      percentage_full: 97,
      storage_volume: 10500,
      storage_inflow: 500.5,
      storage_release: 300.3,
    };
    mockFetchOk(latest);

    const res = await api.fetchLatestDataById('203042');
    expect(res).toEqual(latest);
    expect(global.fetch).toHaveBeenCalledWith('/api/latest_data/203042', undefined);
  });

  test('fetchSpecificDamAnalysisById', async () => {
    const analysis = [
      { dam_id: '203042', analysis_date: '2024-11-01', avg_storage_volume_12_months: 10500 },
    ];
    mockFetchOk(analysis);

    const res = await api.fetchSpecificDamAnalysisById('203042');
    expect(res).toEqual(analysis);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/specific_dam_analysis/203042',
      undefined
    );
  });

  test('fetchAllDamGroups', async () => {
    const groups = [{ group_name: 'small_dams' }, { group_name: 'large_dams' }];
    mockFetchOk(groups);

    const res = await api.fetchAllDamGroups();
    expect(res).toEqual(groups);
    expect(global.fetch).toHaveBeenCalledWith('/api/dam_groups', undefined);
  });

  test('fetchDamGroupByName', async () => {
    const group = { group_name: 'small_dams' };
    mockFetchOk(group);

    const res = await api.fetchDamGroupByName('small_dams');
    expect(res).toEqual(group);
    expect(global.fetch).toHaveBeenCalledWith('/api/dam_groups/small_dams', undefined);
  });

  test('fetchDamGroupMembersByGroupName', async () => {
    const members = [
      { group_name: 'small_dams', dam_id: '203042' },
      { group_name: 'small_dams', dam_id: '210001' },
    ];
    mockFetchOk(members);

    const res = await api.fetchDamGroupMembersByGroupName('small_dams');
    expect(res).toEqual(members);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/dam_group_members/small_dams',
      undefined
    );
  });

  test('fetchAllOverallDamAnalyses', async () => {
    const overall = [
      { analysis_date: '2023-01-01', avg_storage_volume_12_months: 10500 },
    ];
    mockFetchOk(overall);

    const res = await api.fetchAllOverallDamAnalyses();
    expect(res).toEqual(overall);
    expect(global.fetch).toHaveBeenCalledWith('/api/overall_dam_analysis', undefined);
  });

  test('fetchOverallDamAnalysisByDate', async () => {
    const row = { analysis_date: '2023-01-01', avg_storage_volume_12_months: 10500 };
    mockFetchOk(row);

    const res = await api.fetchOverallDamAnalysisByDate('2023-01-01');
    expect(res).toEqual(row);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/overall_dam_analysis/2023-01-01',
      undefined
    );
  });
});

describe('api.ts – error surfaces body text', () => {
  test('returns a helpful error message when response is not ok', async () => {
    const api = await loadApiWithEnv();
    mockFetchError(404, 'Not Found', 'No such dam');

    await expect(api.fetchDamById('missing-one')).rejects.toThrow(
      /404 Not Found - No such dam/
    );
    expect(global.fetch).toHaveBeenCalledWith('/api/dams/missing-one', undefined);
  });
});
