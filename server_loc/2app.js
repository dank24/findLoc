const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const env = require('dotenv').config()

const userRoute = require('./routes/userRoutes')


app.use(express.json())

app.use('/user', userRoute)


const Port = 5378
const mongoUrl = process.env.mongoUrl

app.listen(Port, () =>{
    console.log(`Server Started On Port: ${Port}`)
})
