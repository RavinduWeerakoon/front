import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <AppBar position="static" sx={{bgcolor: 'rgba(255, 255, 255, 0.2)'}}>
      <Toolbar>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <img src={"src/assets/logo-no-background.png"} alt="App Logo" style={{ height: 40, marginRight: 16 }} />
          <Typography variant="h6" component="div">
            {/* Optional: You can keep or remove the text */}
          </Typography>
        </Box>
        <Button component={Link} to="/login" variant="contained" color='inherit' sx={{color: "black"}} >Login </Button>
        <Button component={Link} to="/register" variant="contained" color="inherit"  sx={{color: "black"}}>Register</Button>
        <Button  color="inherit" sx={{color: "black"}}>Contact</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;