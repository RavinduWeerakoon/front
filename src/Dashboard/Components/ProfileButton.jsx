import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/icons-material/MenuItem';
import  Typography  from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Settings, Logout } from '@mui/icons-material';

function ProfileButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick} size="small">
        <Avatar>RW</Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
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
          <Typography variant="subtitle1">John Doe</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Settings fontSize="small" />
          <Typography variant="inherit" style={{ marginLeft: 10 }}>
            Settings
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Logout fontSize="small" />
          <Typography variant="inherit" style={{ marginLeft: 10 }}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ProfileButton;
