import http from 'k6/http';
import { sleep } from 'k6';
const params = {
    'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-GB,en;q=0.9',
  };
export const options = {
  vus: 10,
  duration: '30s',
};
export default function () {


  let responses = http.batch([
    ['GET', 'http://localhost:5000', params],
  ])

  sleep(2);


}