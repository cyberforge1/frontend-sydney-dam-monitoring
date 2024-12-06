// # testApi.js
import fetch from 'node-fetch';

const BASE_URL = 'http://127.0.0.1:5001/api'; // Base URL for the Flask API

const testApiEndpoints = async () => {
    try {
        // Testing fetchHelloWorld
        console.log("Testing fetchHelloWorld...");
        const helloResponse = await fetch(`${BASE_URL}/`);
        console.log("fetchHelloWorld Response:", await helloResponse.text());

        // Valid identifiers from provided data
        const validDamId = '203042'; // Toonumbar Dam as an example
        const validResourceId = 1; // Resource ID for Toonumbar Dam
        const validGroupName = 'large_dams'; // Example group name
        const validDamName = 'Toonumbar Dam'; // Valid dam name

        // Helper function for testing endpoints
        const testEndpoint = async (description, url, parser = (res) => res.json()) => {
            console.log(`Testing ${description}...`);
            const response = await fetch(url);
            if (response.ok) {
                const data = await parser(response);
                console.log(`${description} Response:`, data);
            } else {
                console.error(`${description} Error:`, await response.text());
            }
        };

        // Test fetchLatestDataById
        await testEndpoint(
            "fetchLatestDataById",
            `${BASE_URL}/latest_data/${validDamId}`
        );

        // Test fetchDamsDataByGroup
        await testEndpoint(
            "fetchDamsDataByGroup",
            `${BASE_URL}/dam_groups/${validGroupName}`
        );

        // Test fetchDamNames
        await testEndpoint(
            "fetchDamNames",
            `${BASE_URL}/dams/`
        );

        // Test fetchDamDataByName
        await testEndpoint(
            "fetchDamDataByName",
            `${BASE_URL}/dams?dam_name=${encodeURIComponent(validDamName)}`
        );

        // Test fetchDamResources
        await testEndpoint(
            "fetchDamResources",
            `${BASE_URL}/dam_resources/${validResourceId}`
        );

        // Test fetchAvgPercentageFull12Months
        await testEndpoint(
            "fetchAvgPercentageFull12Months",
            `${BASE_URL}/specific_dam_analysis/${validDamId}`,
            async (res) => {
                const analysisData = await res.json();
                return { avg_percentage_full_12_months: analysisData[0]?.avg_percentage_full_12_months || "N/A" };
            }
        );

        // Test fetchDamData12Months
        await testEndpoint(
            "fetchDamData12Months",
            `${BASE_URL}/specific_dam_analysis/${validDamId}`
        );

        // Test fetchDamGroupMembers
        await testEndpoint(
            "fetchDamGroupMembers",
            `${BASE_URL}/dam_group_members/${validGroupName}`
        );

    } catch (error) {
        console.error("Error testing endpoints:", error);
    }
};

// Run the tests
testApiEndpoints();
