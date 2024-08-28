import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

const emotions = [
  { value: 'joy', label: 'Joy' },
  { value: 'sadness', label: 'Sadness' },
  { value: 'anger', label: 'Anger' },
  { value: 'calm', label: 'Calm' },
];

const JournalEntryPage = () => {
  const [date, setDate] = useState('');
  const [text, setText] = useState('');
  const [emotion, setEmotion] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ date, text, emotion });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      <Typography variant="h4" component="div" sx={{ mb: 2 }}>
        Journal Entry
      </Typography>
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Entry"
        multiline
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default JournalEntryPage;