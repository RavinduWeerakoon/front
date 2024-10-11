import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Typography  from '@mui/material/Typography';


const uData = [40, 30, 20, 27];
const pData = [24, 13, 98, 39];
const xLabels = [
  'Week 1',
  'Week 2',
  'Week 3',
  'Week 4',

];

export default function WeeklyEmotions() {
  return (
    
    <>
    <Typography variant="h3" >Weekly Score </Typography>
    <BarChart

      series={[
        { data: pData, label: 'This month', id: 'pvId' },
        { data: uData, label: 'Last Month', id: 'uvId' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
    </>
   
  );
}

