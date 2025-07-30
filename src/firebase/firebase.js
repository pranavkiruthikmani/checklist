// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8WYqonolhoZfnENog0f5LoR2cYb1sXzc",
  authDomain: "todolistapp-ee301.firebaseapp.com",
  projectId: "todolistapp-ee301",
  storageBucket: "todolistapp-ee301.firebasestorage.app",
  messagingSenderId: "458128323489",
  appId: "1:458128323489:web:961d55d7f1991869fa91e0",
  measurementId: "G-7YZRJWS97F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);