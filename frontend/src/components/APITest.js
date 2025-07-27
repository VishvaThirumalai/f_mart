// src/components/APITest.js - Add this temporarily to test your backend
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const APITest = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const testEndpoint = async (url, method = 'GET', data = null) => {
    try {
      console.log(`Testing ${method} ${url}`);
      
      const config = {
        method,
        url,
        timeout: 5000,
      };

      if (data) {
        config.data = data;
        config.headers = { 'Content-Type': 'application/json' };
      }

      const response = await axios(config);
      
      return {
        success: true,
        status: response.status,
        data: response.data,
        error: null
      };
    } catch (error) {
      console.error(`Error testing ${method} ${url}:`, error);
      return {
        success: false,
        status: error.response?.status || 'Network Error',
        data: error.response?.data || null,
        error: error.message
      };
    }
  };

  const runTests = async () => {
    setLoading(true);
    const testResults = {};

    // Test endpoints
    const tests = [
      { 
        name: 'Server Root',
        url: `${API_BASE_URL}/`,
        method: 'GET'
      },
      { 
        name: 'Health Check',
        url: `${API_BASE_URL}/api/health`,
        method: 'GET'
      },
      { 
        name: 'Register Test',
        url: `${API_BASE_URL}/api/register`,
        method: 'POST',
        data: {
          name: 'Test User',
          email: `test${Date.now()}@example.com`,
          password: 'testpass123'
        }
      }
    ];

    for (const test of tests) {
      testResults[test.name] = await testEndpoint(test.url, test.method, test.data);
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setResults(testResults);
    setLoading(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  const getStatusColor = (result) => {
    if (result.success) return 'text-success';
    if (result.status === 'Network Error') return 'text-danger';
    return 'text-warning';
  };

  const getStatusIcon = (result) => {
    if (result.success) return '✅';
    return '❌';
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3>Backend API Connection Test</h3>
        </div>
        <div className="card-body">
          <div className="alert alert-info">
            <strong>API Base URL:</strong> {API_BASE_URL}<br/>
            <strong>Environment:</strong> {process.env.NODE_ENV || 'development'}
          </div>

          <button 
            className="btn btn-primary mb-3" 
            onClick={runTests}
            disabled={loading}
          >
            {loading ? 'Testing...' : 'Run Tests Again'}
          </button>

          {Object.keys(results).length > 0 && (
            <div className="row">
              {Object.entries(results).map(([name, result]) => (
                <div key={name} className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <span className="fw-bold">{name}</span>
                      <span>
                        {getStatusIcon(result)} 
                        <span className={`ms-1 ${getStatusColor(result)}`}>
                          {result.success ? 'SUCCESS' : 'FAILED'}
                        </span>
                      </span>
                    </div>
                    <div className="card-body">
                      <p className="mb-1">
                        <strong>Status:</strong> {result.status}
                      </p>
                      
                      {result.error && (
                        <p className="text-danger mb-1">
                          <strong>Error:</strong> {result.error}
                        </p>
                      )}
                      
                      {result.data && (
                        <details>
                          <summary className="btn btn-sm btn-outline-secondary">
                            View Response Data
                          </summary>
                          <pre className="mt-2 p-2 bg-light border rounded small">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="alert alert-warning mt-3">
            <h6>Troubleshooting Steps:</h6>
            <ol className="mb-0">
              <li>Make sure your backend server is running: <code>npm start</code> in the backend folder</li>
              <li>Check that the server is listening on port 5000</li>
              <li>Verify your .env file has the correct settings</li>
              <li>Check browser console for CORS errors</li>
              <li>Try accessing <code>http://localhost:5000/api/health</code> directly in browser</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APITest;