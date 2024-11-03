
const express = require('express')
const application = express()
const port = 3000

const { initializeApp } = require('firebase/app')
const { getFirestore, collection, doc, updateDoc, setDoc, getDoc, getDocs, deleteDoc } = require('firebase/firestore');
const { getAuth } = require('firebase/auth')

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()
//const messaging = messaging();  

application.use(express.json())

application.get('/', (req, res) => {
    res.status(200).send("Hello World")
})

application.post('/add', async (req, res) => {
    const { category, expiration, image, title } = req.body
    const product = doc(db, 'Item', title)
    const productGet = await getDoc(product)
    if (!productGet.exists()){
        await setDoc(product, {
            Category : category,
            Expiration : expiration,
            Img : image,
            Title : title,
        })
    } else{
        await updateDoc(product, {
            Category : category,
            Expiration : expiration,
            Img : image,
            Title : title,
        })
    } 

    res.status(200).send("Add Complete")
})

application.delete('/delete', async (req, res) => {
    const { title } = req.body
    try{
        const product = doc(db, 'Item', title)
        await deleteDoc(product)
    } catch (error) {
        console.error("ERROR: ", error)
        res.status(500).send("ERROR")
    }

    res.status(200).send("Delete Complete")
})

application.get('/getItems', async (req, res) => {
    const items = collection(db, 'Item')
    const itemDocs = await getDocs(items)
    
    const itemsData = []
    itemDocs.forEach((itemDoc) => {
        itemsData.push(itemDoc.data())
    })

    res.status(200).send(itemsData)
})

application.get('/getItemTitles', async (req, res) => {
    const items = collection(db, 'Item')
    const itemDocs = await getDocs(items)

    const itemTitles = []
    itemDocs.forEach((itemDoc) => {
        itemTitles.push(itemDoc.id)
    })
    
    res.status(200).json(itemTitles)
})

application.listen(port, () => {
    console.log(`Successful Application on Port ${port}`)
})
