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
    try {
        const user = await User.register(
            new User({ username: username }),
            req.body.password
        )
        req.login(user, () => {
            res.redirect('/catfoods')
        })
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/register')
    }
})

//* Login route
router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/catfoods')
    } else {
        res.render('login.ejs', {
            tabTitle: 'Login'
        })
    }
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/catfoods',
    failureFlash: true
}))

//* Logout route
router.post('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/')
    })
})

module.exports = router