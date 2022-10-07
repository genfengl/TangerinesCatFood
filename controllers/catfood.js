const express = require('express')
const router = express.Router()
const Catfood = require('../models/catfood')







//* INDEX route
router.get('/catfoods', async (req, res) => {
    try {
        const catfoods = await Catfood.find()
        res.render('index.ejs', {
            catfoods: catfoods,
            tabTitle: 'Catalogue'
        })
    } catch (error) {
        console.log(`Error:`, error)
    }
})

//* NEW route
router.get('/new', (req, res) => {
    res.render('new.ejs', {
        tabTitle: 'Add New Item'
    })
})

//* CREATE route
router.post('/catfoods', async (req, res) => {
    try {
        console.log(req.body)
        await Catfood.create(req.body)
        res.redirect('/catfoods')
    } catch (error) {
        console.log(`Error creating new catfood:`, error)
    }
})


module.exports = router