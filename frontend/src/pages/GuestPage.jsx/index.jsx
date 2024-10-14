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
    <Box sx={{ display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: "url(src/assets/backgroundImageGreenBlue.webp)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.4, // Adjust this value for desired opacity
        zIndex: -1, // Ensure the background stays behind the content
      }
    
     }}>
      <CssBaseline />
      <NavBar />
      <Container component="main"
       sx={{mt: 8,
            mb: 2,
            flexGrow: 1,
           }}>
          
          
          {/* Section with Image and Text */}
          <Grid container spacing={12
          } sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Box component="img" src={"src/assets/logo-no-background.png"} alt="Our Team" sx={{ width: '100%', borderRadius: 2 }} />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box>
                <Typography variant="h4" component="h3" gutterBottom>
                Welcome to EmoAI!
                </Typography>
                <Typography variant="body1" paragraph>
                Your personal journey towards emotional well-being starts here. EmoAI is designed to help you reflect on your thoughts, 
                understand your emotions, and thrive with insights tailored just for you. Whether you're tracking your 
                emotional health or seeking professional support, EmoAI is your companion in nurturing a healthier mind.
                </Typography>
               
              </Box>
            </Grid>
            
          </Grid>
        </Container>
      <Footer />
    </Box>
  );
}


