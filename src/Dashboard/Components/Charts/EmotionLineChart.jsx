import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const emotionData = [
  { date: "2024-08-01", text: "I felt overwhelmed at work today, so much to do and not enough time.", emotion: "anger" },
  { date: "2024-08-02", text: "Had a great day with family!", emotion: "joy" },
  { date: "2024-08-03", text: "Feeling a bit down today.", emotion: "sadness" },
  { date: "2024-08-04", text: "Excited about the new project!", emotion: "joy" },
  { date: "2024-08-05", text: "Work was stressful again.", emotion: "anger" },
  { date: "2024-08-06", text: "Feeling calm and relaxed.", emotion: "calm" },
  { date: "2024-08-07", text: "Had a productive day at work.", emotion: "joy" },
];

const mapEmotions =(data) => {
  const EmotionScore = [];
  data.forEach(item => {
    if (item.emotion === "anger") {
      EmotionScore.push({ date: item.date, emotion: 1 });
    } else if (item.emotion === "sadness") {
      EmotionScore.push({ date: item.date, emotion: 2 });
    } else if (item.emotion === "calm") {
      EmotionScore.push({ date: item.date, emotion: 3 });
    } else if (item.emotion === "joy") {
      EmotionScore.push({ date: item.date, emotion: 4 });
    }
  });
  console.log(EmotionScore);
  return EmotionScore;
  
}

export default function EmotionLineChart() {
return(
    <LineChart
  dataset={mapEmotions(emotionData)}
  xAxis={[{ scaleType: 'point',dataKey: "date" }]}
  series={[
    {
      dataKey: "emotion",
      area: { visible: true },
      
    },
  ]}
  width={500}
  height={300}
/> 
)
}