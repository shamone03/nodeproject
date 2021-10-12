const express = require('express')
const dotenv = require('dotenv')
const app = express()
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path');
dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT
const connectDB = require('./server/database/connection')

app.set('view engine', 'ejs')

// log requests
app.use(morgan('tiny'))
// connect to db
connectDB()
// parse request to body parser
app.use(express.urlencoded({ extended: true })) 
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))

app.use('/js', express.static(path.resolve(__dirname, "assets/js")))       

// load routers
app.use('/', require('./server/routes/router'))
  
app.listen(PORT, () => { 
    console.log('server running on port 1234')
})