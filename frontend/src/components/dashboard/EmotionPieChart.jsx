import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// const emotionData = extractEmotionData(previousMonth);
// const pieData = countEmotions(emotionData);

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



const data = [
  { label: 'India', value: 50000 },
  { label: 'USA', value: 35000 },
  { label: 'Brazil', value: 10000 },
  { label: 'Other', value: 5000 },
];

const flags = {
  "joy": "😀️",
  "fear": "😨️",
  "surprise": "😲️",
  "anger": "😡️",
  "love": "😍️",
  "sadness": "😢️",
}

const countries = [
  {
    name: 'joy',
    value: 50,
    flag: "😀️",
    color: 'hsl(220, 25%, 65%)',
  },
  {
    name: 'fear',
    value: 35,
    flag: "😨️",
    color: 'hsl(220, 25%, 45%)',
  },
  {
    name: 'surprise',
    value: 10,
    flag: "😲️",
    color: 'hsl(220, 25%, 30%)',
  },
  {
    name: 'anger',
    value: 5,
    flag: "😡️",
    color: 'hsl(220, 25%, 20%)',
  },
];

const StyledText = styled('text', {
  shouldForwardProp: (prop) => prop !== 'variant',
})(({ theme }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: (theme.vars || theme).palette.text.secondary,
  variants: [
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontSize: theme.typography.body2.fontSize,
      },
    },
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontWeight: theme.typography.h5.fontWeight,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontWeight: theme.typography.body2.fontWeight,
      },
    },
  ],
}));

function PieCenterLabel({ primaryText, secondaryText }) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <React.Fragment>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </React.Fragment>
  );
}



const colors = [
  'hsl(220, 20%, 65%)',
  'hsl(220, 20%, 42%)',
  'hsl(220, 20%, 35%)',
  'hsl(220, 20%, 25%)',
  'hsl(220, 20%, 20%)',
  'hsl(220, 20%, 15%)',
];

export default function EmotionPieChart({records}) {
  // const dt = countEmotions(records.currentMonth);

  const currentMonth = records.currentMonth 
  const emotionData = extractEmotionData(currentMonth);
  const pieData = countEmotions(emotionData);
  const pieChartData = pieData.map(emotion => ({
    label: emotion.label,
    value: emotion.value,
  }));

  

  

  



  
  
  
  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
    >
      
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Entires By
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PieChart
            colors={colors}
            margin={{
              left: 80,
              right: 80,
              top: 80,
              bottom: 80,
            }}
            series={[
              {
                data: pieChartData.length ? pieChartData : data,
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { faded: 'global', highlighted: 'item' },
              },
            ]}
            height={260}
            width={260}
            slotProps={{
              legend: { hidden: true },
            }}
          >
            <PieCenterLabel primaryText="98.5K" secondaryText="Total" />
          </PieChart>
        </Box>
        {pieChartData.length ? pieChartData.map((emotion, index) => (
          <Stack
            key={index}
            direction="row"
            sx={{ alignItems: 'center', gap: 2, pb: 2 }}
          >
            {flags[emotion.label]}
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  {emotion.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {emotion.value}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                aria-label="Number of users by country"
                value={emotion.value}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: colors[index],
                  },
                }}
              />
            </Stack>
          </Stack>
        )): null}
      </CardContent>
    </Card>
  );
}