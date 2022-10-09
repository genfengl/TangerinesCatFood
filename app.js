require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const mongoDBSession = require('connect-mongodb-session')
const methodOverride = require('method-override')

const User = require('./models/users')
const authController = require('./controllers/auth')
const catfoodsController = require('./controllers/catfoods')

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
app.use(flash())    //* must be after app.use(session())

//* Configure passport
app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

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

