// api-tester/testReactEndpoints.js

import axios from 'axios';

// Base URL for React frontend (assumes API endpoints are proxied by the frontend)
const BASE_URL = 'http://localhost:5173/api';

// Define the API endpoints to test
const endpoints = [
  { method: 'GET', path: '/dams', description: 'Fetch all dams' },
  { method: 'GET', path: '/dams/203042', description: 'Fetch dam by ID (Example: Toonumbar Dam)' },
  { method: 'GET', path: '/dam_groups', description: 'Fetch all dam groups' },
  { method: 'GET', path: '/dam_groups/small_dams', description: 'Fetch dams by group name' },
  { method: 'GET', path: '/dam_group_members/small_dams', description: 'Fetch dam group members by group name' },
  { method: 'GET', path: '/latest_data/203042', description: 'Fetch latest data by dam ID' },
  { method: 'GET', path: '/latest_data', description: 'Fetch all latest dam data' },
  { method: 'GET', path: '/specific_dam_analysis/203042', description: 'Fetch specific dam analysis by dam ID' },
  { method: 'GET', path: '/overall_dam_analysis', description: 'Fetch all overall dam analyses' },
  { method: 'GET', path: '/overall_dam_analysis/2023-01-01', description: 'Fetch overall dam analysis by date (Example: 2023-01-01)' },
];

// Helper function to format and log responses
const logResponse = (url, response, isError = false, endpointDescription = '') => {
  if (isError) {
    console.error(`[FAILURE] ${url}`);
    console.error(`Description: ${endpointDescription}`);
    console.error(`Status: ${response?.status || 'No Status'}`);
    if (response?.status === 404) {
      console.error('Error: Endpoint not found or data does not exist.');
    }
    console.error('Data:', response?.data || response.message);
  } else {
    console.log(`[SUCCESS] ${url}`);
    console.log('Response:', response.data);
  }
  console.log('-----------------------------------');
};

// Test each endpoint
const testEndpoints = async () => {
  console.log('Starting React API Endpoint Tests...\n');

  for (const endpoint of endpoints) {
    const url = `${BASE_URL}${endpoint.path}`;
    console.log(`Testing: [${endpoint.method}] ${url} - ${endpoint.description}`);

    try {
      const response = await axios({
        method: endpoint.method,
        url,
      });
      logResponse(url, response, false, endpoint.description);
    } catch (error) {
      logResponse(url, error.response || error, true, endpoint.description);

      // Specific handling for 404 errors on specific_dam_analysis
      if (endpoint.path.includes('/specific_dam_analysis') && error.response?.status === 404) {
        console.error(
          `The specific dam analysis data for dam_id in the endpoint ${url} is likely missing in the backend database.`
        );
      }
    }
  }

  console.log('React API Endpoint Tests Completed.\n');
};

// Run the tests
testEndpoints();
