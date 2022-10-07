const express = require('express')
const router = express.Router()
const Catfood = require('../models/catfood')
const upload = require('../middlewares/upload')


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
router.post('/catfoods', upload.single('image'), async (req, res) => {    // upload.single('image') before async
    try {
        req.body.imageURL = req.file.path
        await Catfood.create(req.body)
        res.redirect('/catfoods')
    } catch (error) {
        console.log(`Error creating new catfood:`, error)
    }
})

//* CONFIRM_DELETE route
router.get('/catfoods/:id/delete_confirmation', async (req, res) => {    // confirm delete needs to include the catfood id
    const catfood = await Catfood.findById(req.params.id)
    res.render('delete_confirmation.ejs', {
        catfood: catfood,
        tabTitle: 'Delete Confirmation'
    })
})

//* DELETE route
router.delete('/catfoods/:id', async (req, res) => {
    const catfood = await Catfood.findByIdAndRemove(req.params.id)
    console.log(`Deleted Catfood: `, catfood)
    res.redirect('/catfoods')
})

//* SHOW route
router.get('/catfoods/:id', async (req, res) => {
    try {
        const catfood = await Catfood.findById(req.params.id)
        res.render('show.ejs', {
            catfood: catfood,
            tabTitle: catfood.name
        })
    } catch (error) {
        console.log('Error:', error)
    }
})


module.exports = router