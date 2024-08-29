import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


import EmotionPieChart from './Charts/EmotionPieChart';
import EmotionScore from './Charts/EmotionScore';
import DetailCards from './Charts/DetailCards';
import WeeklyEmotionScore from './Charts/WeeklyEmotionScore';
import  Typography  from '@mui/material/Typography';
import PostTimeline from './Charts/PostTimeLine';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function ProfileDetails() {
  return (

    <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h3" component="h2" style={{ textAlign: 'left' }}>
            Patient Details
          </Typography>
      {/* <DetailCards/> */}
      <Grid container spacing={1}>
        <Grid item lg={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{width:"100%", height:"400"}}>
            <EmotionPieChart/>
         </Box>
        </Grid>
        <Grid item xs={8}>
          <WeeklyEmotionScore/>
        </Grid>
        <Grid item xs={4}>
          <PostTimeline/>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
