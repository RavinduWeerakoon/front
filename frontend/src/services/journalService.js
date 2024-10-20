import { getDocs, query,collection,where ,doc, updateDoc, arrayUnion} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Timestamp } from "firebase/firestore";

export const getJournals = async (id) => {
    console.log(id)
    try {
        console.log(id)
        const q  = query(collection(db, "journalEntries"),where("userId", "==", id));
        console.log(q)

        const querySnapshot = await getDocs(q);
        console.log(querySnapshot)
        const journals  =[];
        querySnapshot.docs.map(doc=> {
            journals.push({
                text: doc.data().text,
                date:doc.data().date,
                emotion: doc.data().emotion,
            });
        });
        console.log(journals)
        return journals;

    
        
    } catch (error) {
        console.log(error);
        return error;
    }
}


export const fetchRecords = async (userId) => {
    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    console.log(startOfPreviousMonth)
    const endOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const q  = query(collection(db, "journalEntries"),       
                where('userId', '==', userId),
                where('date', '>=', startOfPreviousMonth),
                where('date', '<=', now));

    // const q = query(collection(db, "journalEntries"), where("userId", "==", userId));

    const querySnapshot = await getDocs(q);


    const categorizedRecords = {
      currentMonth: {},
      previousMonth: {}
    };

    querySnapshot.forEach(doc => {
      const data = doc.data();
      const recordDate = data.date.toDate();
      const month = recordDate.getMonth();
      const week = Math.ceil(recordDate.getDate() / 7);

      if (recordDate >= startOfCurrentMonth) {
        if (!categorizedRecords.currentMonth[week]) {
          categorizedRecords.currentMonth[week] = [];
        }
        categorizedRecords.currentMonth[week].push(data);
      } else if (recordDate >= startOfPreviousMonth && recordDate <= endOfPreviousMonth) {
        if (!categorizedRecords.previousMonth[week]) {
          categorizedRecords.previousMonth[week] = [];
        }
        categorizedRecords.previousMonth[week].push(data);
      }
    });

    return categorizedRecords

    

  };


  export const getUsernamesAndIds = async (selfName) => {
    try {
      const ref = collection(db, "users");
      const q = query(ref, where("role", "==", "user"), where("doctor", "==", selfName));
      const querySnapshot = await getDocs(q);
      const users = [];
      querySnapshot.forEach(doc => {
        users.push({
          userId: doc.id,
          username: doc.data().username,
          displayName: doc.data().displayName,
        });
      });
      return users;
    } catch (error) {
      console.log(error);
      return error;
    }
  };


  export const getPatientDetails = async (userId) => {
    try {
      const docRef = collection(db, "users", userId);
      const doc = await getDocs(docRef);
      return doc.data();
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  export const updatePatientDetails = async (userId, details) => {
    try {
      const docRef = collection(db, "users", userId);
      await docRef.update(details);
    } catch (error) {
      console.error('Error updating patient details:', error);
    }
  };

  export const addNewUser = async (username, doctorName) => {
    try {
      // Query Firestore to check if a user with the provided username and role "user" exists
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("displayName", "==", username), where("role", "==", "user"));
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // If a user is found, return the user data
        const user = querySnapshot.docs[0].data();
        const userData ={
          success:true,
          userId: querySnapshot.docs[0].id, // Assuming Firestore doc ID is the userId
          displayName: user.displayName,
          role: user.role

        }
        try{
        const userRef = doc(db, "users", userData.userId);
        await updateDoc(userRef, {
        doctor: doctorName ,// Add doctor's name to the user document
        notifications: arrayUnion({
          message: `You have been added by ${doctorName}`,
          timestamp: Timestamp.now(),
          seen: false
        })

      });
        return userData;}
        catch (error) {
          console.error("Error updating user:", error);
          const response = {
            success: false,
            message: "Error updating user"
            
          }
          return response;
        }
      } else {

        // No user found, handle the case here
        const response ={
          success:false,
          message: "User not found Try Again."
        }
        return response;
      }
    } catch (error) {
      console.error("Error finding or adding user:", error);
      const response ={
        success:false,
        message: "Error finding or adding user"
      }
      return response;
      

    }
  };