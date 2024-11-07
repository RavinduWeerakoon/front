import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [alt, setAlt] = useState(false)
  const [emotion, setEmotion] = useState('');
  const [suicideScore, setSuicideScore] = useState(null);
  const [emotionData, setEmotionData] = useState(null);
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [emotionAlertOpen, setEmotionAlertOpen] = useState(false);



  const fetchEmotionAndScore = async (text) => {
    try {
      const response = await axios.post('https://emoai-b0cvdga3fpddaede.centralindia-01.azurewebsites.net/get-result', {text});
      const data = response.data;
      setEmotionData(data);
      setEmotionAlertOpen(true);
      return data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlt(false);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        const data = await fetchEmotionAndScore(text);
        await console.log(emotionData)
        await addDoc(collection(db, 'journalEntries'), {
          userId: user.uid,
          date: Timestamp.fromDate(new Date()),
          text: text,
          emotion: data.emotion,
          suicide_score: parseFloat(data.suicide_score)
        });
        console.log('Journal entry added successfully');
        // Clear the form
        setDate('');
        setText('');
        setEmotion('');
        // Show success notification
        setAlt(true);
        setOpen(false);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    } else {
      console.error('No user is signed in');
    }
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getEmoji = (emotion) => {
    const emojiMap = {
      joy: '😊',
      sadness: '😢',
      anger: '😠',
      surprised: '😲',
      love: '❤️',
      fear: '😨'
    };
    return emojiMap[emotion] || '';
  };

  return (
    <React.Fragment>
      <Button 
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
      variant='contained'
      onClick={handleClickOpen}>
        + Add Entry
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Tell us your thoughts</DialogTitle>
        <DialogContent sx={{
          minHeight: '200px',
        }}>
          <DialogContentText>
          </DialogContentText>
          <TextField
          required
          autoFocus
          id="outlined-multiline-flexible"
          label="what's on your mind?"
          onChange={(e) => setText(e.target.value)}
          multiline
          maxRows={4}
          fullWidth
          sx={{
            marginTop: '10px',
            minWidth: '400px',
            padding: '10px',
          }}
        />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>Add</Button> */}

          <Button
          onClick={handleClose}
          sx={{ mt: 2, backgroundColor: '#FF7A7A', color: 'white', '&:hover': { backgroundColor: '#EF7A7A' } }}
          variant="contained"
          >Cancel</Button>
          <Button
          type='submit'
          onClick={handleSubmit}
          sx={{ mt: 2, backgroundColor: '#007B8F', color: 'white', '&:hover': { backgroundColor: '#00677A' } }}
          variant="contained"
          >Add</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={alt} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Emotion added successfully!<br />
          Emotion : {emotionData ? emotionData.emotion : 'No emotion detected'}{getEmoji(emotionData ? emotionData.emotion : '')}
        </Alert>
      </Snackbar>
      {/* {emotionData && (
        <Snackbar open={emotionAlertOpen} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
            Detected Emotion: {emotionData.emotion}
          </Alert>
        </Snackbar>
      )} */}
    </React.Fragment>
    
  );
}
