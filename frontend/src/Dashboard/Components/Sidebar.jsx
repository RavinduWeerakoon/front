
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

import GroupIcon from '@mui/icons-material/Group';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';

const links = [
    
    {
        name: 'Dashboard',
        icon: DashboardIcon,
        path: ""
    },
    {
        name: 'Users',
        icon: GroupIcon,
        path: "users"
    },
    ]


const Sidebar = (

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

                            <ListItemButton component={Link} to={path}>
                                <ListItemIcon>
                                    <Icon />
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

export default Sidebar;