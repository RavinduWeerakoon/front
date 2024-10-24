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
import JournalModal from './JournalModal';
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
  const [error, setError] = useState(null);
  const theme = useTheme();
  const [selectedJournal, setSelectedJournal] = useState(null); // For modal
  const [open, setOpen] = useState(false); // Add this state to manage modal visibility
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {uid} = useSelector((state) => state.auth);
  console.log(uid)
  
useEffect(()=> {
  const fetchJournals =async ()=>{
    try{
    const journalEntries = await getJournals(uid);
    console.log(journalEntries)
    setJournals(journalEntries);
    }
    catch(error){
      setError('Error fetching journal entries');
    }
    
  };
  fetchJournals();
},[uid]);
const handleOpen = (journal) => {
  setSelectedJournal(journal); // Set the clicked journal
  setOpen(true); // Open the modal
};
const handleClose = () => setOpen(false); // Close modal
  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
  <Grid justifyContent="left" alignItems="left" maxWidth="md">
    <CssBaseline />
    
    <Typography variant="h3" component="h2" style={{ textAlign: 'left', marginBottom: 3 }}>
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
      <Grid container spacing={2}>
          {journals.map((journal, index) => (
            <Grid item xs={12} key={index}>
              <JournalEntry
                date={journal.date}
                text={journal.text}
                onReadMore={() => handleOpen(journal)} // Pass journal to modal
              />
            </Grid>
          ))}
        </Grid>
    )}
  </Grid>
  {/* Modal for showing full journal entry */}
  {selectedJournal && (
        <JournalModal open={open} handleClose={handleClose} journal={selectedJournal} />
      )}

  <Grid container justifyContent="right" alignItems="end">
    <NewButton />
  </Grid>
</Container>


  );
}

export default SampleHome;
