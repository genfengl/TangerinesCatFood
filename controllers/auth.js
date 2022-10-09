const express = require('express')
const router = express.Router()

router.get('/register', (req, res) => {
    res.render('register.ejs', {
        tabTitle: 'Register'
    })
})

router.get('/login', (req, res) => {
    res.render('login.ejs', {
        tabTitle: 'Login'
    })
})

module.exports = router