import { getDocs, query,collection,where} from "firebase/firestore";
import { db } from "../../firebaseConfig";

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