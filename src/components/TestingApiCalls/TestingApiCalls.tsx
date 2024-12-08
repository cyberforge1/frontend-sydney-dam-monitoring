// #src/components/TestingApiCalls/TestingApiCalls.tsx

import React, { useState } from 'react';
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
import './TestingApiCalls.scss';

const TestingApiCalls: React.FC = () => {
  const [output, setOutput] = useState<string>('');
  const [inputValue, setInputValue] = useState<{ [key: string]: string }>({});

  const handleInputChange = (key: string, value: string) => {
    setInputValue((prev) => ({ ...prev, [key]: value }));
  };

  const handleApiCall = async (apiFn: (...args: string[]) => Promise<unknown>, params: string[] = []) => {
    try {
      const result = await apiFn(...params);
      setOutput(JSON.stringify(result, null, 2));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`);
      } else {
        setOutput('An unknown error occurred');
      }
    }
  };

  return (
    <div className="testing-api-calls">
      <div className="api-buttons">
        {/* Fetch All Dams */}
        <div className="api-call">
          <button onClick={() => handleApiCall(fetchAllDams)}>Fetch All Dams</button>
        </div>

        {/* Fetch Dam by ID */}
        <div className="api-call">
          <input
            type="text"
            placeholder="Dam ID"
            value={inputValue['fetchDamById'] || ''}
            onChange={(e) => handleInputChange('fetchDamById', e.target.value)}
          />
          <button
            onClick={() =>
              handleApiCall(fetchDamById, [inputValue['fetchDamById']])
            }
          >
            Fetch Dam by ID
          </button>
        </div>

        {/* Fetch All Latest Data */}
        <div className="api-call">
          <button onClick={() => handleApiCall(fetchAllLatestData)}>
            Fetch All Latest Data
          </button>
        </div>

        {/* Fetch Latest Data by Dam ID */}
        <div className="api-call">
          <input
            type="text"
            placeholder="Dam ID"
            value={inputValue['fetchLatestDataById'] || ''}
            onChange={(e) => handleInputChange('fetchLatestDataById', e.target.value)}
          />
          <button
            onClick={() =>
              handleApiCall(fetchLatestDataById, [inputValue['fetchLatestDataById']])
            }
          >
            Fetch Latest Data by Dam ID
          </button>
        </div>

        {/* Fetch Specific Dam Analysis by ID */}
        <div className="api-call">
          <input
            type="text"
            placeholder="Dam ID"
            value={inputValue['fetchSpecificDamAnalysisById'] || ''}
            onChange={(e) =>
              handleInputChange('fetchSpecificDamAnalysisById', e.target.value)
            }
          />
          <button
            onClick={() =>
              handleApiCall(fetchSpecificDamAnalysisById, [
                inputValue['fetchSpecificDamAnalysisById'],
              ])
            }
          >
            Fetch Specific Dam Analysis by ID
          </button>
        </div>

        {/* Fetch All Dam Groups */}
        <div className="api-call">
          <button onClick={() => handleApiCall(fetchAllDamGroups)}>
            Fetch All Dam Groups
          </button>
        </div>

        {/* Fetch Dam Group by Name */}
        <div className="api-call">
          <input
            type="text"
            placeholder="Group Name"
            value={inputValue['fetchDamGroupByName'] || ''}
            onChange={(e) =>
              handleInputChange('fetchDamGroupByName', e.target.value)
            }
          />
          <button
            onClick={() =>
              handleApiCall(fetchDamGroupByName, [
                inputValue['fetchDamGroupByName'],
              ])
            }
          >
            Fetch Dam Group by Name
          </button>
        </div>

        {/* Fetch Dam Group Members by Group Name */}
        <div className="api-call">
          <input
            type="text"
            placeholder="Group Name"
            value={inputValue['fetchDamGroupMembersByGroupName'] || ''}
            onChange={(e) =>
              handleInputChange('fetchDamGroupMembersByGroupName', e.target.value)
            }
          />
          <button
            onClick={() =>
              handleApiCall(fetchDamGroupMembersByGroupName, [
                inputValue['fetchDamGroupMembersByGroupName'],
              ])
            }
          >
            Fetch Dam Group Members by Group Name
          </button>
        </div>

        {/* Fetch All Overall Dam Analyses */}
        <div className="api-call">
          <button onClick={() => handleApiCall(fetchAllOverallDamAnalyses)}>
            Fetch All Overall Dam Analyses
          </button>
        </div>

        {/* Fetch Overall Dam Analysis by Date */}
        <div className="api-call">
          <input
            type="text"
            placeholder="Analysis Date"
            value={inputValue['fetchOverallDamAnalysisByDate'] || ''}
            onChange={(e) =>
              handleInputChange('fetchOverallDamAnalysisByDate', e.target.value)
            }
          />
          <button
            onClick={() =>
              handleApiCall(fetchOverallDamAnalysisByDate, [
                inputValue['fetchOverallDamAnalysisByDate'],
              ])
            }
          >
            Fetch Overall Dam Analysis by Date
          </button>
        </div>
      </div>

      {/* Display output */}
      <div className="api-output">
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default TestingApiCalls;
