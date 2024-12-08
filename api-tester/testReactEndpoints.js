// api-tester/testReactEndpoints.js

import axios from 'axios';

// Base URL for React frontend (assumes API endpoints are proxied by the frontend)
const BASE_URL = 'http://localhost:5173/api';

// Define the API endpoints to test
const endpoints = [
  { method: 'GET', path: '/dams' }, // Fetch all dams
  { method: 'GET', path: '/dams/203042' }, // Fetch dam by ID (Example: Toonumbar Dam)
  { method: 'GET', path: '/damGroups' }, // Fetch all dam groups
  { method: 'GET', path: '/damGroups/small_dams/dams' }, // Fetch dams by group name
  { method: 'GET', path: '/damGroups/small_dams/members' }, // Fetch dam group members by group name
  { method: 'GET', path: '/dams/203042/latestData' }, // Fetch latest data by dam ID
  { method: 'GET', path: '/damResources/latestData' }, // Fetch all latest dam data
  { method: 'GET', path: '/dams/203042/analysis' }, // Fetch specific dam analysis by dam ID
  { method: 'GET', path: '/damResources/avgPercentageFull/12Months' }, // Fetch average percentage full for 12 months
  { method: 'GET', path: '/damResources/avgPercentageFull/5Years' }, // Fetch average percentage full for 5 years
  { method: 'GET', path: '/damResources/avgPercentageFull/20Years' }, // Fetch average percentage full for 20 years
];

// Test each endpoint
const testEndpoints = async () => {
  console.log('Starting React API Endpoint Tests...\n');

  for (const endpoint of endpoints) {
    const url = `${BASE_URL}${endpoint.path}`;
    console.log(`Testing: [${endpoint.method}] ${url}`);

    try {
      const response = await axios({
        method: endpoint.method,
        url,
      });
      console.log(`[SUCCESS] ${url}`);
      console.log('Response:', response.data);
    } catch (error) {
      if (error.response) {
        console.error(`[FAILURE] ${url}`);
        console.error(`Status: ${error.response.status}`);
        console.error('Data:', error.response.data);
      } else {
        console.error(`[ERROR] ${url}`);
        console.error('Error:', error.message);
      }
    }

    console.log('-----------------------------------');
  }

  console.log('React API Endpoint Tests Completed.\n');
};

// Run the tests
testEndpoints();
