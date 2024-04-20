
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDPW6O7B_NAZ9XGT3Q87rmVvtVww0rx29c",
    authDomain: "la-hacks-d7b07.firebaseapp.com",
    projectId: "la-hacks-d7b07",
    storageBucket: "la-hacks-d7b07.appspot.com",
    messagingSenderId: "600374351697",
    appId: "1:600374351697:web:61953058e4ff05d7282570"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
