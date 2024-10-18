import * as React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const settings = {
  width: 200,
  height: 200,
  value: 60,
};

// Function to calculate the mean suicide score
const calculateMeanSuicideScore = (currentMonthEntries) => {
  let totalEntries = 0;
  let totalScore = 0;

  Object.values(currentMonthEntries).forEach(weekEntries => {
    weekEntries.forEach(entry => {
      if (entry.suicide_score !== undefined) {
        totalEntries++;
        totalScore += entry.suicide_score;
      }
    });
  });

  const mean = totalEntries > 0 ? totalScore / totalEntries : 0;
  return mean.toFixed(4); // Return mean score with 2 decimal places
};

export default function SuicideScore({ data }) {
  const currentMonthEntries = data.currentMonth || {};
  const score = calculateMeanSuicideScore(currentMonthEntries);
  console.log("Mean Suicide Score", score);

  const getGaugeColor = (score) => {
    console.log("score", score)
    return score < 0.3 ? 'green' : 'red';
  };

  return (

    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Gauge
        {...settings}
        value={score*100}
        sx={(theme) => ({
            [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
            },
            [`& .${gaugeClasses.valueArc}`]: {
                fill: getGaugeColor(score),
            },
            [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
            },
        })}
    />
    </div>
  );
}