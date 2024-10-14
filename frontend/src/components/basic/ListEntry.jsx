import React from 'react';
import Typography  from '@mui/material/Typography';
import  Grid  from '@mui/material/Grid';


function JournalEntry({date, text}) {

  const formattedDate = date && date.seconds 
  ? new Date(date.seconds * 1000).toLocaleDateString() // Converts seconds to milliseconds
  : 'Unknown date'; // Fallback for unexpected format

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
        {formattedDate}
      </Typography>
      <Typography
        variant="body2"
        component="p"
        style={{
          color: '#5A6F72', // Text color from the image
          marginTop: '8px',
        }}
      >
        {text}
      </Typography>
    </Grid>
  );
}

export default JournalEntry;