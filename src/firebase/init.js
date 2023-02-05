// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore" ;

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEDIZUsMg3yah98fT6jL6G5QAP_GkUPIc",
    authDomain: "int305fb023-1f40d.firebaseapp.com",
    projectId: "int305fb023-1f40d",
    storageBucket: "int305fb023-1f40d.appspot.com",
    messagingSenderId: "8913237084",
    appId: "1:8913237084:web:99e91a009528b63b27e299",
    measurementId: "G-CCY7XD300V"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init firestore service
const db = getFirestore()

export default db 

