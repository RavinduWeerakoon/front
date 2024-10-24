import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid  from '@mui/material/Grid';
import { getJournals } from '../../services/journalService';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import FormDialog from './FormDialog';
import JournalEntry from './ListEntry';


function NewButton() {
  return (
    
  <FormDialog/>
  );
}


function SampleHome() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [journals,setJournals] = useState([])
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {uid} = useSelector((state) => state.auth);
  
useEffect(()=> {
  const fetchJournals =async ()=>{
    try{
    const journalEntries = await getJournals(uid);
    setJournals(journalEntries)
    }
    catch(error){
      setError('Error fetching journal entries');
    }
    
  };
  fetchJournals();
},[uid]);
  return (
    <Container maxWidth="md" sx={{p:2}}>
    <Grid justifyContent="left" alignItems="left" maxWidth="md">
      <CssBaseline />
      <Grid container justifyContent="right" alignItems="end"><NewButton/></Grid>

<Typography variant="h3" component="h2" style={{ textAlign: 'left', marginBottom:3 }}>
  Stories
</Typography>


      
{error ? (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        ) : journals.length === 0 ? (
          <Typography variant="h6" component="p">
            No journal entries found
          </Typography>
        ) : (
          journals.map((journal) => (
            <JournalEntry key={journal.id} date={journal.date} text={journal.text} />
          ))
        )}
    </Grid>

</Container>

  );
}

export default SampleHome;
