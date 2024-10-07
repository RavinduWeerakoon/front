import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut , GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {doc, setDoc, getDoc} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const signUp = async (email, password,displayName, role = 'user') => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password, displayName);
        // Signed in
        const user = userCredential.user;
        console.log(user);
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            displayName: displayName,
            role: role
        });
        return user;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Signed in
        const user = userCredential.user;
        console.log(user);
        return user;
    } catch (error) {
        console.log(error);
        let errorMessage = 'Login failed';
        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address';
                break;
            case 'auth/user-disabled':
                errorMessage = 'User account is disabled';
                break;
            case 'auth/user-not-found':
                errorMessage = 'No user found with this email';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password';
                break;
            default:
                errorMessage = 'Login failed. Please try again';
        }
        return { success: false, message: errorMessage };
    }
}

export const signOutUser = async () => {
    try {
        await signOut(auth);
        console.log("signout");
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async (uid) => {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data in getUserRole:", docSnap.data());
            return docSnap.data();

        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}


export const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        // Signed in
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
            email: user.email,
            name: user.displayName,
            role: 'user'
        });
        
        console.log(user);
        return user;
    } catch (error) {
        console.log(error);
        return error;
    }
}

