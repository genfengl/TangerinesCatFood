require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const catfoodsController = require('./controllers/catfood')

const app = express()
const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL


app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

app.use(catfoodsController)






mongoose.connect(dbURL, () => {
    console.log('Mongoose connected to:', dbURL)
})

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})

