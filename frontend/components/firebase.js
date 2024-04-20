// Import the functions you need from the SDKs you need
const { getApp, getApps, initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getAuth } = require('firebase/auth');
const firebase = require('firebase/compat/app')


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPW6O7B_NAZ9XGT3Q87rmVvtVww0rx29c",
  authDomain: "la-hacks-d7b07.firebaseapp.com",
  projectId: "la-hacks-d7b07",
  storageBucket: "la-hacks-d7b07.appspot.com",
  messagingSenderId: "600374351697",
  appId: "1:600374351697:web:61953058e4ff05d7282570"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

module.exports = {app, auth, db };