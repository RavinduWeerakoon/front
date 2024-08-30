// src/components/Footer.js

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 2, mt: 'auto' }}>
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          &copy; {new Date().getFullYear()} My React App. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
