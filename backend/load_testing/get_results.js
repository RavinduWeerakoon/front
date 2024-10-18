import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, 
  duration: '30s',
};

export default function () {
  const url = 'http://localhost:5173/get-result';
  const payload = JSON.stringify({
    data: 'This is a test text',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'is status 200': (r) => r.status === 200,
    'contains text key': (r) => r.json().hasOwnProperty('text'),
    'contains emotion key': (r) => r.json().hasOwnProperty('emotion'),
  });

  sleep(10); 
}