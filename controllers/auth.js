const express = require('express')
const passport = require('passport')    // used in login route
const User = require('../models/users')
const router = express.Router()


//* Register page route
router.get('/register', (req, res) => {
    res.render('register.ejs', {
        tabTitle: 'Register'
    })
})

//* Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body
    const user = await User.register(
        new User({ username: username }),
        password
    )
    req.login(user, () => {
        res.redirect('/catfoods')
    })
})

//* Login route
router.get('/login', (req, res) => {
    res.render('login.ejs', {
        tabTitle: 'Login'
    })
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/catfoods'
}))

//* Logout route
router.post('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/')
    })
})

module.exports = router