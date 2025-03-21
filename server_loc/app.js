const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv').config()
const cors = require('cors')
const process = require('process')

const app = express()

  //  Routes 
const userRoute = require('./routes/userRoutes')

  // Use Middleware
app.use(express.json())
app.use(cors({
    origin: '*',
    method: ['PUT', "POST", 'GET']
}))

  // Use Routes
app.use('/user', userRoute)


const Port = 5378
const mongoUrl = process.env.mongoUrl


//  Create server
app.listen(Port, () =>{
    console.log(`Server Started On Port: ${Port}`)
})

//  Start Database
mongoose.connect(mongoUrl).then(() => {
  console.log('DB Connected')
}).catch(error => {console.error(error)})