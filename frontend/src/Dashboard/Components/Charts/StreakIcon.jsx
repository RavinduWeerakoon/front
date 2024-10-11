import React from 'react';
import Typography  from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WhatshotIcon from 'src/assets/streak_icon.svg'

const StreakIcon = ({ streakCount }) => {
  return (
    <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <img src={WhatshotIcon} alt="Streak Icon" style={{ width: 24, height: 24 }} />
      <Typography variant="h6" style={{ marginLeft: 8 }}>
        {streakCount}
      </Typography>
    </Box>
  );
};

export default StreakIcon;