import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';

import { fetchRecords } from '../services/journalService';

import WeeklyEmotions from '../components/dashboard/WeeklyEmotionScore';
import EmotionPieChart from '../components/dashboard/EmotionPieChart';

import EmotionScore from '../components/dashboard/EmotionScore';

import StreakIcon from '../components/dashboard/StreakIcon';
import StatCard from "../components/dashboard/StatCard"


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

const { userId } = useParams();
    
    
const [records, setRecords] = useState({});
useEffect(() => {
    const fetchData = async () => {
      const records = await fetchRecords(userId);
      
      await setRecords(records);
      
    };

    fetchData();
  }, [userId]);

  return (

    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={8} md={4}>
          <Card sx={{justifyContent:'center', alignItems:"center", marginLeft:"auto", marginRight:"auto"}}>
            <CardContent justifyContent="center" allignItems="center" >
              <Typography gutterBottom variant="h5" component="div">

                This Weeks Score
              </Typography>

              <EmotionScore data={records} />
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={4} md={4}>

              <StatCard data = {records} />
         



        </Grid>
        <Grid item xs={6} md={4}>
          <Stack spacing={2}>

            <Card sx={{ maxWidth: 100 + "%", height: 50 + "%" }}>
              <CardContent>
                <StreakIcon streakCount={20} />
              </CardContent>
            </Card>

            <Card sx={{ maxWidth: 100 + "%", height: 50 + "%" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Emotion Pie Chart
                </Typography>
              </CardContent>
            </Card>



          </Stack>
        </Grid>

      </Grid>

      <Box height={20} sx={{ marginTop: 3, }}>

        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <Card sx={{ height: 60 + "vh" }}>
              <CardContent sx={{ height: "100%" }}>
                <WeeklyEmotions  data={records}/>
              </CardContent>
            </Card>

          </Grid>
          <Grid item xs={6} md={4}>

            <Card sx={{ height: 60 + "vh" }}>
              <CardContent sx={{ height: "100%" }}>
                <EmotionPieChart previousMonth={records.previousMonth}/>
              </CardContent>
            </Card>
          </Grid>

        </Grid>

      </Box>



    </Box>

  );
}