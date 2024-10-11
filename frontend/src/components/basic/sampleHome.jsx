import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid  from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import {Link} from 'react-router-dom';
import { getJournals } from '../../services/journalService';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';

import JournalEntry from './ListEntry';


function NewButton() {
  return (
    
    <Button
      component={Link}
      to="dashboard/new"
      variant="contained"
      startIcon={<AddIcon />}
      sx={{
        backgroundColor: '#A5E5FF',
        marginTop: '2rem',
        borderRadius: '30px',
        color: '#083347',
        textTransform: 'none',
        fontWeight: 'bold',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
        padding: '10px 20px',
        '&:hover': {
          backgroundColor: '#90d4f7',
        },
      }}
    >
      New
    </Button>
  );
}


function SampleHome() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [journals,setJournals] = useState([])
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {uid} = useSelector((state) => state.auth);
  console.log(uid)
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
useEffect(()=> {
  const fetchJournals =async ()=>{
    const journalEntries = await getJournals(uid);
    console.log(journalEntries)
    setJournals(journalEntries)
    
  };
  fetchJournals();
},[]);
  return (
    <Container maxWidth="md" sx={{p:2}}>
    <Grid justifyContent="left" alignItems="left" maxWidth="md">
      <CssBaseline />


<Typography variant="h3" component="h2" style={{ textAlign: 'left', marginBottom:3 }}>
  Stories
</Typography>
      
       {journals.map((journal) => (
          <JournalEntry key={journal.id} date={journal.date} text={journal.text} />
        ))}
    </Grid>

    <Grid container justifyContent="right" alignItems="end"><NewButton/></Grid>
</Container>

  );
}

export default SampleHome;
