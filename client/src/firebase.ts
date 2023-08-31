import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTNhySCziB1mx3-mMIraWmAsMXIU6tD54",
  authDomain: "simglobe-e6ce8.firebaseapp.com",
  projectId: "simglobe-e6ce8",
  storageBucket: "simglobe-e6ce8.appspot.com",
  messagingSenderId: "87237194652",
  appId: "1:87237194652:web:57a512261b96a4b426ce59",
  measurementId: "G-BQ8Z72YL60"
};
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
