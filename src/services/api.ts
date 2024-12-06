// # src/services/api.ts

export const fetchHelloWorld = async (): Promise<string> => {
    const response = await fetch('/api/');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.text();
    return data;
};

export const fetchLatestDataById = async (damId: string): Promise<unknown> => {
    const response = await fetch(`/api/latest_data/${damId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};

export const fetchDamsDataByGroup = async (groupName: string): Promise<unknown[]> => {
    const response = await fetch(`/api/dam_groups/${groupName}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};

export const fetchDamNames = async (): Promise<string[]> => {
    const response = await fetch('/api/dams/');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json() as unknown[];
    return data.map((dam) => {
        if (typeof dam === 'object' && dam !== null && 'dam_name' in dam) {
            return (dam as { dam_name: string }).dam_name;
        }
        throw new Error('Invalid dam data format');
    });
};

export const fetchDamDataByName = async (damName: string): Promise<unknown> => {
    const response = await fetch(`/api/dams?dam_name=${encodeURIComponent(damName)}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};

export const fetchDamResources = async (damId: string): Promise<unknown[]> => {
    const response = await fetch(`/api/dam_resources/${damId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};

export const fetchAvgPercentageFull12Months = async (): Promise<number> => {
    const response = await fetch('/api/overall_dam_analysis');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (typeof data.avg_percentage_full_12_months === 'number') {
        return data.avg_percentage_full_12_months;
    }
    throw new Error('Invalid data format');
};

export const fetchAvgPercentageFull5Years = async (): Promise<number> => {
    const response = await fetch('/api/overall_dam_analysis');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (typeof data.avg_percentage_full_5_years === 'number') {
        return data.avg_percentage_full_5_years;
    }
    throw new Error('Invalid data format');
};

export const fetchAvgPercentageFull20Years = async (): Promise<number> => {
    const response = await fetch('/api/overall_dam_analysis');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (typeof data.avg_percentage_full_20_years === 'number') {
        return data.avg_percentage_full_20_years;
    }
    throw new Error('Invalid data format');
};

export const fetchAvgPercentageFull12MonthsById = async (damId: string): Promise<number> => {
    const response = await fetch(`/api/specific_dam_analysis/${damId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (typeof data.avg_percentage_full_12_months === 'number') {
        return data.avg_percentage_full_12_months;
    }
    throw new Error('Invalid data format');
};

export const fetchAvgPercentageFull5YearsById = async (damId: string): Promise<number> => {
    const response = await fetch(`/api/specific_dam_analysis/${damId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (typeof data.avg_percentage_full_5_years === 'number') {
        return data.avg_percentage_full_5_years;
    }
    throw new Error('Invalid data format');
};

export const fetchAvgPercentageFull20YearsById = async (damId: string): Promise<number> => {
    const response = await fetch(`/api/specific_dam_analysis/${damId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (typeof data.avg_percentage_full_20_years === 'number') {
        return data.avg_percentage_full_20_years;
    }
    throw new Error('Invalid data format');
};

export const fetchDamData12Months = async (groupName: string): Promise<unknown[]> => {
    const response = await fetch(`/api/overall_dam_analysis/12_months/${groupName}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};
