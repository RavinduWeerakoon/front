import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#F9FAFB', 
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
  borderRadius: '8px', 
  p: 4,
};

function JournalModal({ open, handleClose, journal }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          sx={{ fontWeight: 'bold', color: '#007B8F' }} 
        >
          {journal.date.toDate().toDateString()}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2, color: '#5A6F72' }}>
          {journal.text}
        </Typography>
        <Button
          onClick={handleClose}
          sx={{ mt: 2, backgroundColor: '#007B8F', color: 'white', '&:hover': { backgroundColor: '#00677A' } }}
          variant="contained"
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default JournalModal;
