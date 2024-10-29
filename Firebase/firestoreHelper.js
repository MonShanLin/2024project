import { collection, addDoc, doc, deleteDoc, getDocs,  QuerySnapshot } from "firebase/firestore"; 
import { auth, database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
    try {
        const goal = { ...data, owner: auth.currentUser.uid }; // Ensure `owner` field is added
        const docRef = await addDoc(collection(database, collectionName), goal);
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


export async function writeUsersToSubcollection(goalId, usersData) {
    try {
        const usersCollectionRef = collection(database, `goals/${goalId}/users`);
        for (const user of usersData) {
            await addDoc(usersCollectionRef, user);
        }
        console.log('Users added to subcollection successfully.');
    } catch (err) {
        console.error('Error writing users to subcollection:', err);
    }
}


export async function getUsersFromSubcollection(goalId) {
    try {
        const usersCollectionRef = collection(database, `goals/${goalId}/users`);
        const usersSnapshot = await getDocs(usersCollectionRef);
        const users = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return users;
    } catch (err) {
        console.error('Error fetching users from subcollection:', err);
        return [];
    }
}

export async function getAllDocuments(collectionName) {
    try {
        const querySnapshot = await getDocs(collection(database, collectionName));
        const data = [];
        if (querySnapshot.empty) {
            console.log("No documents found in ", collectionName);
            return data;
        }
        querySnapshot.forEach((docSnapshot) => {
            data.push(docSnapshot.data());
        });
        return data;
    }
    catch (err) {
        console.log("get all documents error", err);
    }
}

