// src/pages/WelcomePage.js

import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@mui/material/styles';
import NavBar from './AppBar';
import Footer from './Footer';
import Grid from '@mui/material/Grid';

export default function WelcomPage() {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar />
      <Container component="main" sx={{ mt: 8, mb: 2, flexGrow: 1 }}>
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Welcome to EmoAI!
          </Typography>
          
          {/* Section with Image and Text */}
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Box component="img" src={"src/assets/logo-no-background.png"} alt="Our Team" sx={{ width: '100%', borderRadius: 2 }} />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box>
                <Typography variant="h4" component="h3" gutterBottom>
                  Who We Are
                </Typography>
                <Typography variant="body1" paragraph>
                  We are a team of passionate professionals dedicated to providing top-notch solutions
                  tailored to your needs. Our expertise spans various industries, and we take pride
                  in our ability to innovate and adapt to the ever-changing technological landscape.
                </Typography>
                <Typography variant="body1" paragraph>
                  Whether you're looking for software development, consulting, or design services,
                  we have the skills and experience to help you succeed. Let's work together to bring
                  your vision to life.
                </Typography>
              </Box>
            </Grid>
            
          </Grid>
        </Container>
      <Footer />
    </Box>
  );
}
