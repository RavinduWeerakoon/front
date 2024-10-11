import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';


// const chartSetting = {
//     xAxis: [
//       {
//         label: 'rainfall (mm)',
//       },
//     ],
//     width: 500,
//     height: 400,
//   };
  
//   const valueFormatter = (value) => `${value}mm`;
  
//   export default function HorizontalBars() {
//     return (
//       <BarChart
//         dataset={dataset}
//         yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
//         series={[{ dataKey: 'seoul', label: 'Seoul rainfall', valueFormatter }]}
//         layout="horizontal"
//         {...chartSetting}
//       />
//     );
//   }

const chartSetting = {
    xAxis: [
      {
        label: 'emotion score',
      },
    ],
    width: 500,
    height: 400,
  };
  

export default function VerticleBar() {
  const data = [
    { country: 'Italy', thisYear: 44, lastYear: 53 },
    { country: 'Japan', thisYear: 55, lastYear: 32 },
    { country: 'China', thisYear: 41, lastYear: 33 },
    { country: 'Canada', thisYear: 64, lastYear: 52 },
    { country: 'France', thisYear: 22, lastYear: 13 },
  ];

  return (
    <div style={{ width: '100%', height: 400 }}>
      <BarChart
        xAxis={[
          {
            field: 'country',
            type: 'category',
          },
        ]}
        yAxis={[
          {
            field: 'value',
            min: 0,
            max: 70,
          },
        ]}
        series={[
          {
            type: 'bar',
            dataKey: 'thisYear',
            field: 'thisYear',
            label: 'This Year',
            color: '#2979ff',
          },
          {
            type: 'bar',
            dataKey: 'lastYear',
            field: 'lastYear',
            label: 'Last Year',
            color: '#90caf9',
          },
        ]}
        data={data.map(item => ({
          country: item.country,
          thisYear: item.thisYear,
          lastYear: item.lastYear,
        }))}
        layout="horizontal"
        stacked="false"
      />
    </div>
  );
}
