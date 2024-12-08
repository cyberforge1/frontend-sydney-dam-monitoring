// testApi.js

const axios = require('axios');

// Base URL of the Flask backend
const BASE_URL = 'http://localhost:5001/api';

// List of endpoints to test
const endpoints = [
  '/dams',
  '/damGroups',
  '/damGroups/sydney_dams/dams',
  '/damResources/avgPercentageFull/12Months',
  '/damResources/avgPercentageFull/5Years',
  '/damResources/avgPercentageFull/20Years',
  '/damGroups/sydney_dams/members', // Assuming this endpoint exists
  '/damGroups/sydney_dams/dams',     // Repeated as per errors
  '/dams/1/analysis',                 // Example dam_id
  '/dams/2/analysis',                 // Another example dam_id
  '/dams/1/latestData',               // Example dam_id
  '/dams/2/latestData',               // Another example dam_id
];

// Function to test a single endpoint
const testEndpoint = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    console.log(`[SUCCESS] GET ${endpoint}`);
    console.log('Response:', response.data);
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error(`[FAILURE] GET ${endpoint}`);
      console.error(`Status: ${error.response.status}`);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error(`[NO RESPONSE] GET ${endpoint}`);
      console.error('No response received:', error.request);
    } else {
      // Something else happened
      console.error(`[ERROR] GET ${endpoint}`);
      console.error('Error:', error.message);
    }
  }
  console.log('-----------------------------------');
};

// Function to run all tests sequentially
const runTests = async () => {
  console.log('Starting API Endpoint Tests...\n');
  for (const endpoint of endpoints) {
    await testEndpoint(endpoint);
  }
  console.log('API Endpoint Tests Completed.');
};

// Execute the tests
runTests();
