import React, { useState, useEffect } from 'react';
import { Drawer, Box, List, ListItem, ListItemText, Typography, Button, Collapse } from '@mui/material';
import { markNotificationAsSeen, fetchNotifications } from '../services/notificationService'; // Example service function to mark notifications
import { useSelector } from 'react-redux'; // For accessing the Redux store

const NotificationPane = ({isOpen, toggleDrawer}) => {
   
    const [expandedNotification, setExpandedNotification] = useState(null); // Track which notification is expanded
    const [notifications, setNotifications] = useState([]); // State to store notifications
    const userId = useSelector((state) => state.auth.uid);
    useEffect(() => {
      const fetchNotificationsData = async () => {
      try {
          const notificationsData = await fetchNotifications(userId); // Fetch notifications for the user
          if(notificationsData){
          setNotifications(notificationsData);}
      } catch (error) {
          console.error('Error fetching notifications:', error);
      }
      };
  
      fetchNotificationsData();
  }, [userId]);
    // Toggle the notification pane
  
  
    // Handle expanding a notification
    const handleExpandNotification = async (index, notification) => {
      if (!notification.seen) {
        // Mark the notification as seen in Firestore if it hasn't been seen yet
        await markNotificationAsSeen(userId, index);
      }
      // Toggle the expanded state for the clicked notification
      setExpandedNotification(expandedNotification === index ? null : index);
    };
  
    return (
      <>
        
        {/* Notification Drawer */}
        <Drawer
          anchor="right"
          open={isOpen}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{ width: 350, padding: 2 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Notifications
            </Typography>
  
            <List>
              {notifications.length === 0 ? (
                <Typography variant="body1">No notifications</Typography>
              ) : (
                notifications.map((notification, index) => (
                  <div key={index}>
                    <ListItem
                      onClick={() => handleExpandNotification(index, notification)} // Expand on click
                      sx={{
                        backgroundColor: notification.seen ? 'white' : '#f0f0f0', // Different background for unseen
                        fontWeight: notification.seen ? 'normal' : 'bold', // Bold font for unseen notifications
                        cursor: 'pointer',
                        mb: 1,
                        borderRadius: 1
                      }}
                    >
                      <ListItemText
                        primary={notification.message.slice(0, 40) + (notification.message.length > 40 ? '...' : '')} // Show truncated message
                        secondary={new Date(notification.timestamp).toLocaleString()}
                      />
                    </ListItem>
  
                    {/* Collapse to show full message */}
                    <Collapse in={expandedNotification === index} timeout="auto" unmountOnExit>
                      <Box sx={{ p: 2 }}>
                        <Typography variant="body2">
                          {notification.message} {/* Full message shown when expanded */}
                        </Typography>
                      </Box>
                    </Collapse>
                  </div>
                ))
              )}
            </List>
          </Box>
        </Drawer>
      </>
    );
  };
  
export default NotificationPane;
