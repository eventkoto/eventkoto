// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO : Move this into a .env file
const firebaseConfig = {
  apiKey: "AIzaSyDrb-HDyGb7GPY0majrYQyNYk250x1n6tE",
  authDomain: "eventkotoweb.firebaseapp.com",
  projectId: "eventkotoweb",
  storageBucket: "eventkotoweb.appspot.com",
  messagingSenderId: "932854485285",
  appId: "1:932854485285:web:1acbe43ba5cea3d7cb8acc"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app }
