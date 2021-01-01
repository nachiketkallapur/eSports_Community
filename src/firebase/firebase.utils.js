import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDnbqtRB9AOQkIl5BDf44d8sb6CbN0Z7EI",
    authDomain: "esports-community.firebaseapp.com",
    projectId: "esports-community",
    storageBucket: "esports-community.appspot.com",
    messagingSenderId: "572665658380",
    appId: "1:572665658380:web:71b88cb410a1f867c44229",
    measurementId: "G-TMC1TGBBYE"
};

firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;