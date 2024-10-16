import { collection, addDoc } from "firebase/firestore"; 

export async function writeToDB(data, collectionName) {
    try {
        const docRef = await addDoc(collection(database, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
    }
    catch (err) {
        console.log("write to db error", err);
    }
}