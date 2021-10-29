import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

// const app = firebase.initializeApp({
//   // apiKey: "AIzaSyB4J8tClnuMtBPgs72zlwt3Xi_V4ACkjV8",
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   // apiKey: "" + process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: "login-with-firebase-data-47923.firebaseapp.com",
//   databaseURL:
//     "https://login-with-firebase-data-47923-default-rtdb.firebaseio.com",
//   projectId: "login-with-firebase-data-47923",
//   storageBucket: "login-with-firebase-data-47923.appspot.com",
//   messagingSenderId: "1003150858595",
//   appId: "1:1003150858595:web:198432b9932ac8e9b15b56",
// });

export default app;
