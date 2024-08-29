import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Typography  from '@mui/material/Typography';


const uData = [40, 30, 20, 27.8, 18.9, 23.9, 34.9];
const pData = [24, 13.98, 98, 39.08, 48, 38, 43];
const xLabels = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function WeeklyEmotions() {
  return (
    
    <>
    <Typography variant="h3" >Weekly Score </Typography>
    <BarChart

      series={[
        { data: pData, label: 'This week', id: 'pvId' },
        { data: uData, label: 'LastWeek', id: 'uvId' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
    </>
   
  );
}

