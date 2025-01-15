// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlV8Ka_vEgzJEVLRkmvRKb-mCl1dO83zs",
  authDomain: "trip-planner-ai-47688.firebaseapp.com",
  projectId: "trip-planner-ai-47688",
  storageBucket: "trip-planner-ai-47688.firebasestorage.app",
  messagingSenderId: "360097383438",
  appId: "1:360097383438:web:b43714c9ffd97e642ee85f",
  measurementId: "G-2YCNT5WW2T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
// const analytics = getAnalytics(app);