import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Routes, Route} from 'react-router-dom'

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import SampleHome from '../../components/basic/sampleHome';
import Sidebar from './Sidebar';
import JournalEntryPage from '../../components/basic/JournalEntryPage';
import ProfileButton from '../../components/ProfileButton';
import FullWidthGrid from '../ProfileDetails';
import UserDetails from './UserDetails';
import NotificationIcon from '../../components/NotificationIcon';
import NotificationPane from '../../components/NotificationPane';

const drawerWidth = 240;

import TestComponent from '../test';

function UserDashboard(props) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [isNotificationPaneOpen, setNotificationPaneOpen] = React.useState(false);

  const toggleDrawer = (open) => () => {
    setNotificationPaneOpen(open);
  };

  // const handleDrawerClose = () => {
  //   setIsClosing(true);
  //   setMobileOpen(false);
  // };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  // const handleDrawerToggle = () => {
  //   if (!isClosing) {
  //     setMobileOpen(!mobileOpen);
  //   }
  // };



  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' , backgroundColor:"#EBF5FB",
      
     }} >
      <CssBaseline />
      <AppBar
      position="fixed"
      sx={{
        width: '100%',
        ml: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#fff',
        color: '#333333',
        
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        flexDirection:"row",
        alignItems: isLargeScreen ? 'center' : 'flex-start',
        justifyContent: isLargeScreen ? 'space-between' : 'space-between',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: "url(./backgroundImageGreenBlue.webp)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3, // Adjust this value for desired opacity
          zIndex: -1, // Ensure the background stays behind the content
        },
      }}
    >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={()=>setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <img src={"./logo-no-background.png"} alt="App Logo" style={{ height: 40, marginRight: 16 }} />
        </Toolbar>

        <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto', // Pushes this Box to the right
      gap: '16px', // Space between notification and profile button
    }}
  >
    <NotificationIcon onClick={toggleDrawer(true)} sx={{ fontSize: '60px' }}  />
    <NotificationPane isOpen={isNotificationPaneOpen} toggleDrawer={toggleDrawer} />
    <ProfileButton />
  </Box>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
         
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Sidebar/>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
        <Sidebar/>       
         </Drawer>
      </Box>
      <Box
        component="main"
        flexDirection='column'
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100%)` }, margin: 0, padding: 0, height:'auto' }}
      >
        <Toolbar />

            <Routes>
              <Route path="profile" element={<div>About</div>} />

              <Route path="/" element={<SampleHome/>} />
              <Route path="new" element={<JournalEntryPage/>} />
              <Route path="account" element={<UserDetails/>}/>
              
              <Route path="test" element={<TestComponent userId="ZKyPnZeijGPJKiLYxopseSFNJDo1"/>} />
              <Route path="prof" element={<FullWidthGrid userId="ZKyPnZeijGPJKiLYxopseSFNJDo1"/>} />
            </Routes>
          
      </Box>
    </Box>
  );
}



export default UserDashboard;
