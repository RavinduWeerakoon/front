import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

// Function to count occurrences of each emotion
const countEmotions = (data) => {
  const emotionCounts = {};
  data.forEach(item => {
    if (emotionCounts[item.emotion]) {
      emotionCounts[item.emotion]++;
    } else {
      emotionCounts[item.emotion] = 1;
    }
  });
  return Object.keys(emotionCounts).map((key, index) => ({
    id: index,
    value: emotionCounts[key],
    label: key,
  }));
};

// Function to extract and flatten emotion data from previousMonth object
const extractEmotionData = (previousMonth) => {
  const flattenedData = [];
  if (previousMonth) {
    Object.values(previousMonth).forEach(monthData => {
      flattenedData.push(...monthData);
    });
  }
  return flattenedData;
};

export default function EmotionPieChart({ previousMonth }) {
  const emotionData = extractEmotionData(previousMonth);
  const pieData = countEmotions(emotionData);

  return (
    <PieChart
      series={[
        {
          data: pieData,
        },
      ]}
      width={400}
      height={400}
      slotProps={{
        legend: {
          direction: 'row',
        },
      }}
    />
  );
}