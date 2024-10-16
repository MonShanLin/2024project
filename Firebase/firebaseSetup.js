import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

//Your web app's Firebase configuration. 
//Copy this object from Firebase console
const firebaseConfig = {
    apiKey: "AIzaSyDGYTsGTABpu-Z6uV9ncxqJ-8tKG0F3ul0",
    authDomain: "cs5520-2cead.firebaseapp.com",
    projectId: "cs5520-2cead",
    storageBucket: "cs5520-2cead.appspot.com",
    messagingSenderId: "801980424038",
    appId: "1:801980424038:web:1af2938570b5b76dc032a7",
    measurementId: "G-671SFEG3TZ"
  };

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);