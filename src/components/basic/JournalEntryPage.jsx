import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { db } from '../../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const emotions = [
  { value: 'joy', label: 'Joy' },
  { value: 'sadness', label: 'Sadness' },
  { value: 'anger', label: 'Anger' },
  { value: 'love', label: 'Love' },
];

const JournalEntryPage = () => {
  const [date, setDate] = useState('');
  const [text, setText] = useState('');
  const [emotion, setEmotion] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        await addDoc(collection(db, 'journalEntries'), {
          userId: user.uid,
          date,
          text,
          emotion,
          
        });
        console.log('Journal entry added successfully');
        // Clear the form
        setDate('');
        setText('');
        setEmotion('');
        // Show success notification
        setOpen(true);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    } else {
      console.error('No user is signed in');
    }
  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
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
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: 3,
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
      <TextField
        label="Emotion"
        select
        value={emotion}
        onChange={(e) => setEmotion(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      >
        {emotions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Emotion added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default JournalEntryPage;