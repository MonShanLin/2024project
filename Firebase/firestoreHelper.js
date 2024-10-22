import { collection, addDoc, doc, deleteDoc, getDocs, updateDoc } from "firebase/firestore"; 
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
    try {
        const docRef = await addDoc(collection(database, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (err) {
        console.log("Error writing to Firestore:", err);
    }
}

export async function deleteFromDB(id, collectionName) {
    try {
        const docRef = doc(database, collectionName, id);
        await deleteDoc(docRef);
        console.log(`Document with ID ${id} deleted successfully.`);
    } catch (err) {
        console.error("Error deleting document:", err);
    }
}

export async function deleteAllFromDB(collectionName) {
    try {
        const querySnapshot = await getDocs(collection(database, collectionName));

        const deletePromises = querySnapshot.docs.map((docSnapshot) =>
            deleteDoc(doc(database, collectionName, docSnapshot.id))
        );

        await Promise.all(deletePromises);
        console.log("All documents deleted successfully.");
    } catch (err) {
        console.error("Error deleting all documents:", err);
    }
}

export async function updateDB(id, data, collectionName) {
    try {
      const docRef = doc(database, collectionName, id);
      await updateDoc(docRef, data);
      console.log(`Document with ID ${id} updated successfully.`);
    } catch (err) {
      console.error('Error updating document: ', err);
    }
}