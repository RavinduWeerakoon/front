import { auth } from "../../firebaseConfig";

import {doc, setDoc, getDoc} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const fetchNotifications = async (userId) => {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data in fetchNotifications:", docSnap.data());
            return docSnap.data().notifications;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}
export const markNotificationAsSeen = async (userId, notificationId) => {
    try {
        const docRef = doc(db, "users", userId);
        await docRef.update({
            [`notifications.${notificationId}.seen`]: true
        });
    } catch (error) {
        console.error('Error marking notification as seen:', error);
    }
}
