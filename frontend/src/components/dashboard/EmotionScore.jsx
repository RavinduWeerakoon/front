import * as React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const settings = {
  width: 200,
  height: 200,
  value: 60,
};


// Function to calculate the emotion score
const calculateEmotionScore = (currentMonthEntries) => {
    let totalEntries = 0;
    let positiveEntries = 0;
  
    Object.values(currentMonthEntries).forEach(weekEntries => {
      weekEntries.forEach(entry => {
        totalEntries++;
        if (entry.emotion === 'joy' || entry.emotion === 'love') {
          positiveEntries++;
        }
      });
    });
  
    const score = totalEntries > 0 ? (positiveEntries / totalEntries) * 100 : 0;
    return score.toFixed(2); // Return score as a percentage with 2 decimal places
  };



export default function EmotionScore({data}) {

const currentMonthEntries = data.currentMonth || {};
const score = calculateEmotionScore(currentMonthEntries);
console.log("Score", score)

const getGaugeColor = (score) => {
    if (score < 40) return '#ff0000'; // Red
    if (score >= 40 && score <= 70) return '#ffff00'; // Yellow
    return '#52b202'; // Green
};

return (
    <Gauge
        {...settings}
        value={score}
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
);
}
