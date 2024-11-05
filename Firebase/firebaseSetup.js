import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Import AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage'; 
// Import initializeAuth and getReactNativePersistence
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'; 
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDGYTsGTABpu-Z6uV9ncxqJ-8tKG0F3ul0",
    authDomain: "cs5520-2cead.firebaseapp.com",
    projectId: "cs5520-2cead",
    storageBucket: "cs5520-2cead.firebasestorage.app",
    messagingSenderId: "801980424038",
    appId: "1:801980424038:web:1af2938570b5b76dc032a7",
    measurementId: "G-671SFEG3TZ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

// Initialize Firestore
export const database = getFirestore(app);

// Initialize Firebase Authentication with React Native AsyncStorage for persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
}); 