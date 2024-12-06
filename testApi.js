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

        // Testing fetchLatestDataById
        console.log("Testing fetchLatestDataById...");
        const latestDataResponse = await fetch(`${BASE_URL}/latest_data/${validDamId}`);
        if (latestDataResponse.ok) {
            console.log("fetchLatestDataById Response:", await latestDataResponse.json());
        } else {
            console.log("fetchLatestDataById Error:", await latestDataResponse.text());
        }

        // Testing fetchDamsDataByGroup
        console.log("Testing fetchDamsDataByGroup...");
        const damsGroupResponse = await fetch(`${BASE_URL}/dam_groups/${validGroupName}`);
        if (damsGroupResponse.ok) {
            console.log("fetchDamsDataByGroup Response:", await damsGroupResponse.json());
        } else {
            console.log("fetchDamsDataByGroup Error:", await damsGroupResponse.text());
        }

        // Testing fetchDamNames
        console.log("Testing fetchDamNames...");
        const damNamesResponse = await fetch(`${BASE_URL}/dams/`);
        if (damNamesResponse.ok) {
            const damNames = await damNamesResponse.json();
            console.log("fetchDamNames Response:", damNames);
        } else {
            console.log("fetchDamNames Error:", await damNamesResponse.text());
        }

        // Testing fetchDamDataByName
        console.log("Testing fetchDamDataByName...");
        const damDataByNameResponse = await fetch(`${BASE_URL}/dams?dam_name=${encodeURIComponent(validDamName)}`);
        if (damDataByNameResponse.ok) {
            console.log("fetchDamDataByName Response:", await damDataByNameResponse.json());
        } else {
            console.log("fetchDamDataByName Error:", await damDataByNameResponse.text());
        }

        // Testing fetchDamResources
        console.log("Testing fetchDamResources...");
        const damResourcesResponse = await fetch(`${BASE_URL}/dam_resources/${validResourceId}`);
        if (damResourcesResponse.ok) {
            console.log("fetchDamResources Response:", await damResourcesResponse.json());
        } else {
            console.log("fetchDamResources Error:", await damResourcesResponse.text());
        }

        // Testing fetchAvgPercentageFull12Months
        console.log("Testing fetchAvgPercentageFull12Months...");
        const avg12MonthsResponse = await fetch(`${BASE_URL}/specific_dam_analysis/${validDamId}`);
        if (avg12MonthsResponse.ok) {
            const analysisData = await avg12MonthsResponse.json();
            console.log("fetchAvgPercentageFull12Months Response:", {
                avg_percentage_full_12_months: analysisData.avg_percentage_full_12_months,
            });
        } else {
            console.log("fetchAvgPercentageFull12Months Error:", await avg12MonthsResponse.text());
        }

        // Testing fetchDamData12Months
        console.log("Testing fetchDamData12Months...");
        const damData12MonthsResponse = await fetch(`${BASE_URL}/specific_dam_analysis/${validDamId}`);
        if (damData12MonthsResponse.ok) {
            const specificAnalysisData = await damData12MonthsResponse.json();
            console.log("fetchDamData12Months Response:", specificAnalysisData);
        } else {
            console.log("fetchDamData12Months Error:", await damData12MonthsResponse.text());
        }

        // Testing fetchDamGroupMembers
        console.log("Testing fetchDamGroupMembers...");
        const damGroupMembersResponse = await fetch(`${BASE_URL}/dam_group_members/${validGroupName}`);
        if (damGroupMembersResponse.ok) {
            console.log("fetchDamGroupMembers Response:", await damGroupMembersResponse.json());
        } else {
            console.log("fetchDamGroupMembers Error:", await damGroupMembersResponse.text());
        }
    } catch (error) {
        console.error("Error testing endpoints:", error);
    }
};

// Run the tests
testApiEndpoints();
