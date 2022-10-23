const { urlencoded } = require('express')
const express = require('express')
const connectDB= require('./config/db')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleWare/errorMiddleware')
const port = process.env.port || 4000 


connectDB()
const app = express()

app.use(express.json())
app.use(urlencoded({extended: false }))

app.use('/api/website',require('./routes/WebsiteRoutes'))
app.use('/api/instructor',require('./routes/instructorRoutes'))



app.use(errorHandler)


app.listen(port,() => console.log(`server started on port ${port}`))

