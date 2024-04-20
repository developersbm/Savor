
const express = require('express')
const application = express()
const port = 3000

const { getApp, getApps, initializeApp } = require('firebase/app')
const { getFirestore, collection, doc, deleteField, addDoc, updateDoc, query, getDoc } = require('firebase/firestore')
const { getAuth } = require('firebase/auth')

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPW6O7B_NAZ9XGT3Q87rmVvtVww0rx29c",
  authDomain: "la-hacks-d7b07.firebaseapp.com",
  projectId: "la-hacks-d7b07",
  storageBucket: "la-hacks-d7b07.appspot.com",
  messagingSenderId: "600374351697",
  appId: "1:600374351697:web:61953058e4ff05d7282570",
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
    const { userID, itemTitle, itemInfo } =  req.body
    //const userID = auth.currentUser.uid
    const user = doc(db, 'Users', userID)

    try{
        let dataUpload = await updateDoc(user, {
            [itemTitle] : itemInfo
        })
    } catch (error) {
        console.error("ERROR: ", error)
        res.status(500).send("ERROR")
    }   

    res.status(200).send("Add Complete")
})

application.delete('/delete', async (req, res) => {
    const { userID, itemTitle } = req.body
    //const userID = auth.currentUser.uid
    try{
        const items = doc(db, 'Users', userID)
        let dataUpload = await updateDoc(items, {
            [itemTitle] : deleteField()
        })
    } catch (error) {
        console.error("ERROR: ", error)
        res.status(500).send("ERROR")
    }

    res.status(200).send("Delete Complete")
})

application.get('/getGemini', async (req, res) => {
    const items = doc(db, 'User', userID)
    const itemDoc = await getDoc(items)
    if (itemDoc.exists()){
        res.status(200).send(itemDoc.data())
    } else{
        res.status(200).send("ERROR")
    }
})

application.listen(port, () => {
    console.log(`Successful Application on Port ${port}`)
})