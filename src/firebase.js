// compat packages are API compatible with namespaced code
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCf9_iBgfrOVTZO7wtKgL7XWrX4t-hVH1g",
  authDomain: "aclone-2c628.firebaseapp.com",
  projectId: "aclone-2c628",
  storageBucket: "aclone-2c628.appspot.com",
  messagingSenderId: "874239382847",
  appId: "1:874239382847:web:9b5398193d33046e0a6f8a",
  measurementId: "G-L3EP8KR60B"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// You can get Firebase services like this:
const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, db, storage };
