const { app, auth, db} = require('../frontend/components/firebase.js')
const express = require('express')
const application = express()
const port = 3000

application.get('/', (req, res) => {
    res.status(200).send("Hello World")
})

application.listen(port, () => {
    console.log('Hello')
})

