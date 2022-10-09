const express = require('express')
const ensureLogin = require('connect-ensure-login')
// ensureLogin.ensureLoggedIn() to set a page to show only if logged in: login gate

const Catfood = require('../models/catfoods')
const upload = require('../middlewares/upload')

const router = express.Router()

router.use(ensureLogin.ensureLoggedIn())
// All routes below will now be accessible only to logged-in users

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
router.get('/catfoods/new', (req, res) => {
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

//* EDIT route
router.get('/catfoods/:id/edit', async (req, res) => {
    const catfood = await Catfood.findById(req.params.id)
    res.render('edit.ejs', {
        catfood: catfood,
        tabTitle: `Edit: ${catfood.name}`
    })
})

//* UPDATE route
router.put('/catfoods/:id', async (req, res) => {
    const catfood = await Catfood.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    console.log(`Updated: `, catfood)
    res.redirect(`/catfoods/${req.params.id}`)

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