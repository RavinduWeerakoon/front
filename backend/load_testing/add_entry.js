import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // Number of virtual users
  duration: '30s', // Duration of the test
};

export default function () {
  // Step 1: Login
  const loginUrl = 'http://localhost:5173/login';
  const loginPayload = JSON.stringify({
    username: 'ravinduhiran26@gmail.com',
    password: 'rav2001',
  });

  const loginParams = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const loginRes = http.post(loginUrl, loginPayload, loginParams);

  check(loginRes, {
    'login is status 200': (r) => r.status === 200,
    'login is successful': (r) => r.json().message === 'Login successful',
  });

  // Extract token if needed (assuming the token is in the response)
  const authToken = loginRes.json().token;

  // Step 2: Add Entry
  const addEntryUrl = 'http://localhost:5173/add-entry';
  const addEntryPayload = JSON.stringify({
    data: 'This is a test entry',
  });

  const addEntryParams = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`, // Include the token in the headers if needed
    },
  };

  const addEntryRes = http.post(addEntryUrl, addEntryPayload, addEntryParams);

  check(addEntryRes, {
    'add-entry is status 200': (r) => r.status === 200,
    'add-entry contains data key': (r) => r.json().hasOwnProperty('data'),
  });

  sleep(1); // Wait for 1 second between iterations
}