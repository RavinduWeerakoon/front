import React from 'react';
import { Box, Typography } from '@mui/material';

const UserDashboard = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography variant="h4"> User Home Page</Typography>
    </Box>
  );
};

export default UserDashboard;