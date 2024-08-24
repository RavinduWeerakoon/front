import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut , GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {doc, setDoc, getDoc} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const signUp = async (email, password,name, role = 'user') => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Signed in
        const user = userCredential.user;
        console.log(user);
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            name: name,
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
        return error;
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

export const getUserRole = async (uid) => {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().role;
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

