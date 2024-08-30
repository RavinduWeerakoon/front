import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';

import WeeklyEmotions from './Charts/WeeklyEmotionScore';
import EmototionPieChart from './Charts/EmotionPieChart';
import EmotionLineChart from './Charts/EmotionLineChart';
import EmotionScore from './Charts/EmotionScore';

import StatCard from './Charts/StatCard';

const data = 
  {
    title: 'Users',
    value: '14k',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
      360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  }

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function FullWidthGrid() {
  return (

    <Box sx={{ flexGrow: 1 ,m:2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
        <Stack spacing={2} direction="row">
        <Card sx={{maxWidth: 40+"%", minWidth:30+"%"}}>
          <CardContent>
          <Typography gutterBottom variant="h5" component="div">

          Mood Insights
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This section provides a quick overview of your dominant emotions detected from the past week's journal entries, 
          helping you reflect on your emotional journey.

          </Typography>
          <EmotionScore score={80} />
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 40+"%", minWidth:30+"%"}}>

          <CardContent>
        <StatCard {...data}/>
        </CardContent>
      </Card>
      </Stack>


        </Grid>
        <Grid item xs={6} md={4}>
            <Stack spacing={2}>
              
              <Card sx={{ maxWidth: 100+"%" }}>
              <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                LiMonthly Emotion Distributionzard
              </Typography>
              </CardContent>
              </Card>

              <Card sx={{ maxWidth: 100+"%" }}>
              <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              Emotion Pie Chart
              </Typography>
              </CardContent>
              </Card>
              
              
        
          </Stack>
        </Grid>

      </Grid>

      <Box height={20} sx={{marginTop:3,}}>
      
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
        <Card sx={{height:60+"vh"}}>
        <CardContent sx={{height:"100%"}}>
          <WeeklyEmotions />
        </CardContent>
        </Card>

        </Grid>
        <Grid item xs={6} md={4}>

        <Card sx={{height:60+"vh"}}>
        <CardContent sx={{height:"100%"}}>
          <EmototionPieChart />
        </CardContent>
        </Card>
        </Grid>

      </Grid>

      </Box>

      
      
    </Box>
    
  );
}