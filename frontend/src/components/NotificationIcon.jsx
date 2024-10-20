import React from 'react'; // React
import Badge from '@mui/material/Badge'; // MUI badge to show notification count
import NotificationsIcon from '@mui/icons-material/Notifications'; // MUI notifications icon
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux'; // For accessing the Redux store
import { fetchNotifications } from "../services/notificationService" // Service function to fetch notifications
import {useState, useEffect} from 'react'; // React hooks


const NotificationIcon = ({onClick}) => {
    const [notifications, setNotifications] = useState([]); // State to store notifications
    const userId = useSelector((state) => state.auth.uid); // Access the userId from the Redux store
    const [unseenCount, setUnseenCount] = useState(0); // State to store the count of unseen notifications
    useEffect(() => {
        const fetchNotificationsData = async () => {
        try {
            const notificationsData = await fetchNotifications(userId); // Fetch notifications for the user
            setNotifications(notificationsData);
            setUnseenCount(notifications.filter((n) => !n.seen).length); // Count unseen notifications
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
        };
    
        fetchNotificationsData();
    }, [userId]);
    
    return (
        <IconButton color='inherit' onClick={onClick}>
        <Badge badgeContent={unseenCount} color="error">
        <NotificationsIcon />
        </Badge>
        </IconButton>
    );
    }
export default NotificationIcon;

