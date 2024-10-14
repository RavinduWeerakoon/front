import { getDocs, query,collection,where} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { displayName } from "react-quill";

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


  export const getUsernamesAndIds = async () => {
    try {
      const q = collection(db, "users");
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