import React from "react"; // <-- Add this line

import  { useState } from 'react';
import { useSelector } from 'react-redux';
import Menu from '@mui/material/Menu';

import MenuItem from '@mui/material/MenuItem';
import  Typography  from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';

import { logout } from '../store/authSlice';
import { signOutUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';


function ProfileButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {displayName, email} = useSelector((state) => state.auth);
    console.log(displayName);

  const generateInitials= (name)=>{
    console.log(name);
    if(!name) return "U";
    const nameParts = name.split(" ");
    console.log(nameParts);
    const initials  = nameParts.map((part)=>part[0]).join("");
    console.log(initials);
    return initials.toUpperCase();
    };
    // const generateRandomColor = () => {
    // const letters = '0123456789ABCDEF';
    // let color = '#';
    // for (let i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * 16)];
    // }
    // return color;
    // };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickLogout = async () => {
    try {
      const response = await signOutUser();  // Await the promise
      console.log(response);
      if (response.success) {
        dispatch(logout());
        navigate("/");
        setAnchorEl(null);
      }
    } catch (error) {
      console.error("Sign out failed:", error); // Handle errors
    }
  };
  

  return (
    <div className='profile-button'>
      <IconButton onClick={handleClick} size="small">
        <Avatar
        sx={{
            bgcolor: '#00897B'}}
        >{generateInitials(displayName|| email)}</Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ mr: 4 }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem disabled>
          <Typography variant="subtitle1">{displayName}</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <SettingsIcon fontSize="small" />
          <Typography variant="inherit" style={{ marginLeft: 10 }}>
            Settings
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClickLogout}>
          <LogoutIcon fontSize="small" />
          <Typography variant="inherit" 
          
          style={{ marginLeft: 10 }}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ProfileButton;
