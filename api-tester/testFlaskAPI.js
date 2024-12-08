// api-tester/testFlaskAPI.js

import axios from 'axios';

// Base URL for Flask API
const BASE_URL = 'http://localhost:5001/api';

// Define the endpoints to test
const endpoints = [
  { method: 'GET', path: '/' }, // Welcome message
  { method: 'GET', path: '/dams/' }, // Get all dams
  { method: 'GET', path: '/dams/203042' }, // Get specific dam (Example: Toonumbar Dam)
  { method: 'GET', path: '/latest_data/' }, // Get all latest data entries
  { method: 'GET', path: '/latest_data/203042' }, // Get latest data for a specific dam
  { method: 'GET', path: '/dam_resources/' }, // Get all dam resources
  { method: 'GET', path: '/dam_resources/1' }, // Get specific dam resource (Example: resource_id = 1)
  { method: 'GET', path: '/specific_dam_analysis/' }, // Get all specific dam analyses
  { method: 'GET', path: '/specific_dam_analysis/203042' }, // Get specific dam analysis for a dam
  { method: 'GET', path: '/overall_dam_analysis/' }, // Get all overall dam analyses
  { method: 'GET', path: '/overall_dam_analysis/2023-01-01' }, // Get overall dam analysis for a specific date
  { method: 'GET', path: '/dam_groups/' }, // Get all dam groups
  { method: 'GET', path: '/dam_groups/small_dams' }, // Get a specific dam group
  { method: 'GET', path: '/dam_group_members/' }, // Get all dam group members
  { method: 'GET', path: '/dam_group_members/small_dams' }, // Get dam group members for a specific group
];

// Test each endpoint
const testEndpoints = async () => {
  console.log('Starting Flask API Endpoint Tests...\n');

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

  console.log('Flask API Endpoint Tests Completed.\n');
};

// Run the tests
testEndpoints();
