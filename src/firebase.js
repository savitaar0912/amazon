// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);