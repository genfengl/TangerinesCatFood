require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const mongoDBSession = require('connect-mongodb-session')
const methodOverride = require('method-override')
const authController = require('./controllers/auth')
const catfoodsController = require('./controllers/catfood')

const app = express()
const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL
const MongoDBStore = mongoDBSession(session)
const sessionStore = new MongoDBStore({
    uri: dbURL,
    collection: 'sessions'
})


app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'Sooper sekrit phrase',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}))

app.get('/', (req, res) => {
    res.render('home.ejs', {
        tabTitle: 'Home'
    })
})

app.use(authController)
app.use(catfoodsController)






mongoose.connect(dbURL, () => {
    console.log('Mongoose connected to:', dbURL)
})

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})

