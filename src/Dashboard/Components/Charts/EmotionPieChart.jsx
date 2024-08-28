import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

// Dummy data
const emotionData = [
  { date: "2024-08-01", text: "I felt overwhelmed at work today, so much to do and not enough time.", emotion: "anger" },
  { date: "2024-08-02", text: "Had a great day with family!", emotion: "joy" },
  { date: "2024-08-03", text: "Feeling a bit down today.", emotion: "sadness" },
  { date: "2024-08-04", text: "Excited about the new project!", emotion: "joy" },
  { date: "2024-08-05", text: "Work was stressful again.", emotion: "anger" },
  { date: "2024-08-06", text: "Feeling calm and relaxed.", emotion: "calm" },
  { date: "2024-08-07", text: "Had a productive day at work.", emotion: "joy" },
];

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

export default function EmotionPieChart() {
  const pieData = countEmotions(emotionData);

  return (
    <PieChart
      series={[
        {
          data: pieData,
        },
      ]}
      width={400}
      height={200}
    />
  );
}