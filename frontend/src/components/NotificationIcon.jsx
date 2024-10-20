import React from 'react'; // React
import Badge from '@mui/material/Badge'; // MUI badge to show notification count
import NotificationsIcon from '@mui/icons-material/Notifications'; // MUI notifications icon
import { useSelector } from 'react-redux'; // For accessing the Redux store
import { fetchNotifications } from '../services/authService'; // Service function to fetch notifications
import {useState, useEffect} from 'react'; // React hooks


const NotificationIcon = () => {
    const [notifications, setNotifications] = useState([]); // State to store notifications
    const userId = useSelector((state) => state.auth.uid); // Access the userId from the Redux store
    
    useEffect(() => {
        const fetchNotificationsData = async () => {
        try {
            const notificationsData = await fetchNotifications(userId); // Fetch notifications for the user
            setNotifications(notificationsData);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
        };
    
        fetchNotificationsData();
    }, [userId]);
    
    return (
        <Badge badgeContent={notifications.length} color="error">
        <NotificationsIcon />
        </Badge>
    );
    }
    

