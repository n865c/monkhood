import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBma7uT5ADO_mByTy8YbPhrdXLZH2qfZNE",
    authDomain: "monkhood-eacd1.firebaseapp.com",
    projectId: "monkhood-eacd1",
    storageBucket: "monkhood-eacd1.appspot.com",
    messagingSenderId: "715134006679",
    appId: "1:715134006679:web:a86128c7abd6897c70c0d2",
    measurementId: "G-3M1ZWL5D7Y"
};
firebase.initializeApp(firebaseConfig);
export const database = firebase.database();
export const storage = firebase.storage();