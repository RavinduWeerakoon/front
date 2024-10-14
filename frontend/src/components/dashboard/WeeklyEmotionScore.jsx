import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Typography from '@mui/material/Typography';

// Function to calculate weekly scores
const calculateWeeklyScores = (data) => {
    const weeks = [1, 2, 3, 4];
    const currentMonthScores = weeks.map(week => {
        const weekData = data.currentMonth?.[1] || [];
        return weekData.reduce((acc, entry) => {
            return acc + (entry.emotion === 'love' || entry.emotion === 'joy' ? 1 : 0);
        }, 0);
    });

    const previousMonthScores = weeks.map(week => {
        const weekData = data.previousMonth?.[week] || [];
        return weekData.reduce((acc, entry) => {
            return acc + (entry.emotion === 'love' || entry.emotion === 'joy' ? 1 : 0);
        }, 0);
    });

    return { currentMonthScores, previousMonthScores };
};

export default function WeeklyEmotions({ data }) {
console.log(data)
//   if (!data || !data.currentmonth || !data.previousmonth) {
//     return <Typography variant="h5">No data</Typography>;
//   }

  const { currentMonthScores, previousMonthScores } = calculateWeeklyScores(data);

  const xLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  return (
    <>
      <Typography variant="h3">Weekly Score</Typography>
      <BarChart
        series={[
          { data: currentMonthScores, label: 'This month', id: 'currentMonthId' },
          { data: previousMonthScores, label: 'Last Month', id: 'previousMonthId' },
        ]}
        xAxis={[{ data: xLabels, scaleType: 'band' }]}
      />
    </>
  );
}