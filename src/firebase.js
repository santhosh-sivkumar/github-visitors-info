import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDOlK5XjjD1ClpjHL_Mq7iX2z8xijL-MBg",
  authDomain: "github-visitors-data.firebaseapp.com",
  projectId: "github-visitors-data",
  storageBucket: "github-visitors-data.appspot.com",
  messagingSenderId: "922243309730",
  appId: "1:922243309730:web:4106e90137131a2b3c77fb",
  measurementId: "G-CD0QW79ESM",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
