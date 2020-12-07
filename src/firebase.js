import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyAE6ZHgjiGWUc8PG85xZ8dSWs_OQGhSXtE",
        authDomain: "ann-web-f26ee.firebaseapp.com",
        projectId: "ann-web-f26ee",
        storageBucket: "ann-web-f26ee.appspot.com",
        messagingSenderId: "42914610012",
        appId: "1:42914610012:web:51f325e758cbb67fbedf99",
        measurementId: "G-BE6WXDG5LX"
});

const db = firebaseApp.firestore();

export default db;
