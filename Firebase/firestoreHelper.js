import { collection, addDoc } from "firebase/firestore"; 
import { database } from "./firebaseSetup";
import { doc, deleteDoc } from "firebase/firestore"; 

export async function writeToDB(data, collectionName) {
    try {
        const docRef = await addDoc(collection(database, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
    }
    catch (err) {
        console.log("write to db error", err);
    }
}

export async function deleteFromDB(id, collectionName) {
    try {
      const docRef = doc(database, collectionName, id);
      await deleteDoc(docRef);
      console.log(`Document with ID ${id} deleted successfully.`);
    } catch (err) {
      console.error("Error deleting document: ", err);
    }
  }