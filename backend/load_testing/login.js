import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s', 
};

export default function () {
  const url = 'http://localhost:5000/api/login';
  const payload = JSON.stringify({
    username: 'testuser',
    password: 'testpassword',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'is status 200': (r) => r.status === 200,
    'is logged in': (r) => r.json().message === 'Login successful',
  });

  sleep(1); // Wait for 1 second between iterations
}