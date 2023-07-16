import React from "react";
import Router from "./router";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB97bMKdxcMmG83F4PJmoriI_l1OEpqjTM",
    authDomain: "queueing-system-3b7a5.firebaseapp.com",
    projectId: "queueing-system-3b7a5",
    storageBucket: "queueing-system-3b7a5.appspot.com",
    messagingSenderId: "24299394320",
    appId: "1:24299394320:web:d6e20674a9381dce82c195",
    measurementId: "G-P8XFC14ZT4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth();
firebase.firestore();
export const storage = firebase.storage();

function App() {
    return (
        <>
            <Router />
        </>
    );
}

export default App;
