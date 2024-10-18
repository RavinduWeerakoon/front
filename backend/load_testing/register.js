import http from 'k6/http';
import { check, sleep } from 'k6';
import { get } from 'http';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const options = {
  vus: 10, // Number of virtual users
  duration: '30s', // Duration of the test
};

export default function () {
  const url = 'http://localhost:5173/register';
  const payload = JSON.stringify({
    username: `newuser${getRandomInt(1000)}`,
    password: 'newpassword',
    email: 'newuser@example.com',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'is status 200': (r) => r.status === 200,
    'is registered': (r) => r.json().message === 'Registration successful',
  });

  sleep(1); // Wait for 1 second between iterations
}