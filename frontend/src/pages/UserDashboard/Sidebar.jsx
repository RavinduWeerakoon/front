import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';


import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NotificationsIcon from '@mui/icons-material/Notifications';
import  Logout  from '@mui/icons-material/Logout';


const links = [
    {
        name:"Home",
        icon: HomeIcon,
        path: ""
    },
    
    {
        name: 'Account Details',
        icon: ManageAccountsIcon,
        path: "account"
    },
    {
        name:"Notifications",
        icon: NotificationsIcon,
        path: "notifications"
    },
    {
        name:"Logout",
        icon: Logout,
        path: "logout"
    }]


const Sidebar = ()=> {
    return(

    <div>



        <Typography varient="h3" component="div" sx={{ p: 2 }}>
            EmoAI
        </Typography>
        <List>
            {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}

            {
                links.map((item, index) => {
                    const { name, icon, path } = item;
                    const Icon = icon;
                    return (
                        <ListItem key={index} disablePadding>

                            <ListItemButton  component={Link} to={path}>
                                <ListItemIcon>
                                    <Icon data-testid = {`${name}Icon`} />
                                </ListItemIcon>
                                <ListItemText primary={name} />
                            </ListItemButton>
                        </ListItem>
                    )
                })
            }

        </List>

    </div>
);
};

export default Sidebar;