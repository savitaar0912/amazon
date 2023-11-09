// compat packages are API compatible with namespaced code
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA0bRs0w9QYPEpQGVAtXEk2DukZ6cMyK7w",
  authDomain: "fir-f4f2f.firebaseapp.com",
  projectId: "fir-f4f2f",
  storageBucket: "fir-f4f2f.appspot.com",
  messagingSenderId: "362720150222",
  appId: "1:362720150222:web:a59b4b881f87f20880c69f",
  measurementId: "G-1LKNELP7X3"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// You can get Firebase services like this:
const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, db, storage };
