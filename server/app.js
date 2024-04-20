
const express = require('express')
const application = express()
const port = 3000

const { getApp, getApps, initializeApp } = require('firebase/app')
const { getFirestore } = require('firebase/firestore')
const { getAuth } = require('firebase/auth')
const { collection, doc, setDoc, addDoc } = require('firebase/firestore')

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPW6O7B_NAZ9XGT3Q87rmVvtVww0rx29c",
  authDomain: "la-hacks-d7b07.firebaseapp.com",
  projectId: "la-hacks-d7b07",
  storageBucket: "la-hacks-d7b07.appspot.com",
  messagingSenderId: "600374351697",
  appId: "1:600374351697:web:61953058e4ff05d7282570"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()


application.use(express.json())

application.get('/', (req, res) => {
    res.status(200).send("Hello World")
})

application.post('/add', async (req, res) => {
    const { itemInfo } =  req.body
    try{
        const document = doc(db, 'User', 'Items')
        let dataUpload = await setDoc(document, {
            item : itemInfo
        })
    } catch (error) {
        console.error("ERROR: ", error)
        res.status(500).send("ERROR")
    }

    res.status(200).send("Add Complete")
})

application.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})