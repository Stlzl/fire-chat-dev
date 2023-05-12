import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFgm-pvqPa5ZWYKoXglHE2LwWeN7Gtf1k",
  authDomain: "firechat-10f21.firebaseapp.com",
  projectId: "firechat-10f21",
  storageBucket: "firechat-10f21.appspot.com",
  messagingSenderId: "936904755901",
  appId: "1:936904755901:web:d501cecb097fb067b1c5d4",
  measurementId: "G-6WTVSHS4HY"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);