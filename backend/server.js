const { urlencoded } = require('express')
const express = require('express')
const connectDB= require('./config/db')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errormiddleware')
const port = process.env.port || 3000 


connectDB()
const app = express()

app.use(express.json())
app.use(urlencoded({extended: false }))

app.use('/api/website',require('./routes/Websiteroutes'))
app.use(errorHandler)
app.listen(port,() => console.log(`server started on port ${port}`))

