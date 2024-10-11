import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { entries } from '../../data';

export default function Bars() {
  // Step 2: Count the occurrences of each emotion
  const emotionCounts = entries.reduce((acc, entry) => {
    acc[entry.emotion] = (acc[entry.emotion] || 0) + 1;
    return acc;
  }, {});

  // Step 3: Prepare the data for the bar chart
  const emotions = Object.keys(emotionCounts);
  const counts = Object.values(emotionCounts);

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: emotions }]}
      series={[{ data: counts }]}
      width={500}
      height={300}
    />
  );
}
