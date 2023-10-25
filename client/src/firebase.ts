import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUT4xYxZ26dtrUobrmRkggoQUkpYeTa4c",
  authDomain: "simglobe-1.firebaseapp.com",
  projectId: "simglobe-1",
  storageBucket: "simglobe-1.appspot.com",
  messagingSenderId: "938688247662",
  appId: "1:938688247662:web:61a4b014e699ccbb6d337f",
  measurementId: "G-84CN4528YW"
};

  

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
