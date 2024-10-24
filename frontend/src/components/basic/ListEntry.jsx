import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function JournalEntry({ date, text, onReadMore }) {
  const formattedDate = date && date.seconds
    ? new Date(date.seconds * 1000).toLocaleDateString() // Converts seconds to milliseconds
    : 'Unknown date'; // Fallback for unexpected format

  // Trim the text for preview
  const trimmedText = text.length > 50 ? `${text.substring(0, 50)}...` : text;

  return (
    <Grid
      sx={{
        textAlign: 'left',
        mt: 2,
        cursor: 'pointer',
        backgroundColor: '#E3EEF3', // Initial background color
        padding: '16px',
        borderRadius: '8px', // Optional: add rounded corners
        marginTop: '16px',
        justifyContent: 'start',
        alignItems: 'start',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease', // Smooth transition
        '&:hover': {
          backgroundColor: '#D8EAF0', // Highlighted background color on hover
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Add shadow on hover
        },
      }}
      onClick={onReadMore} // Make the whole grid clickable
    >
      <Typography
        variant="body1"
        component="p"
        style={{
          color: '#007B8F', // Date color
          fontWeight: 'bold',
        }}
      >
        {formattedDate}
      </Typography>
      <Typography
        variant="body2"
        component="p"
        style={{
          color: '#5A6F72', // Text color
          marginTop: '8px',
        }}
      >
        {trimmedText}
      </Typography>
    </Grid>
  );
}

export default JournalEntry;
