import React from 'react';
import Container from '@mui/material/Container';
import Typography  from '@mui/material/Typography';
import  Grid  from '@mui/material/Grid';

function JournalEntry() {
  return (
    <Grid
      sx={{ textAlign: 'left', mt: 2 }}
      justifyContent="start"
      style={{
        backgroundColor: '#E3EEF3', // Match the background color from the image
        padding: '16px',
        borderRadius: '8px', // Optional: add rounded corners if needed
        marginTop: '16px',
        textAlign:"left",
        justifyContent:"start",
        alignItems:"start"
        
      }}
    >
      <Typography
        variant="body1"
        component="p"
        style={{
          color: '#007B8F', // Date color from the image
          fontWeight: 'bold',
        }}
      >
        August 28, 2024 at 1:15 PM
      </Typography>
      <Typography
        variant="body2"
        component="p"
        style={{
          color: '#5A6F72', // Text color from the image
          marginTop: '8px',
        }}
      >
        This is the First day that I’m writing a journal
      </Typography>
    </Grid>
  );
}

export default JournalEntry;