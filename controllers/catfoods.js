const express = require('express')
const ensureLogin = require('connect-ensure-login')
// ensureLogin.ensureLoggedIn() to set a page to show only if logged in: login gate

const Catfood = require('../models/catfoods')
const User = require('../models/users')
const upload = require('../middlewares/upload')

const router = express.Router()

router.use(ensureLogin.ensureLoggedIn())
// All routes below will now be accessible only to logged-in users

//* INDEX route
router.get('/catfoods', async (req, res) => {
    try {
        const catfoods = await Catfood.find()
        // console.log(catfoods)
        res.render('index.ejs', {
            catfoods: catfoods,
            tabTitle: 'Catalogue',
            user: req.user,
        })
    } catch (error) {
        console.log(`Error:`, error)
    }
})

//* NEW route
router.get('/catfoods/new', (req, res) => {
    res.render('new.ejs', {
        tabTitle: 'Add New Item',
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

//* UPDATE route
router.put('/catfoods/:id', upload.single('image'), async (req, res) => {    // need upload.single('image')
    console.log(req.body)    //! req.body is empty (sth to do with the image?)
    if (req.file) {
        req.body.imageURL = req.file.path
    }
    const catfood = await Catfood.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    console.log(`Updated: `, catfood)
    res.redirect(`/catfoods`)
})

//* EDIT route
router.get('/catfoods/:id/edit', async (req, res) => {
    const catfood = await Catfood.findById(req.params.id)
    res.render('edit.ejs', {
        catfood: catfood,
        tabTitle: `Edit: ${catfood.name}`,
    })
})

//* CONFIRM_DELETE route
router.get('/catfoods/:id/delete_confirmation', async (req, res) => {    // confirm delete needs to include the catfood id
    const catfood = await Catfood.findById(req.params.id)
    res.render('delete_confirmation.ejs', {
        catfood: catfood,
        tabTitle: 'Delete Confirmation',
    })
})

//* DELETE route
router.delete('/catfoods/:id', async (req, res) => {
    const catfood = await Catfood.findByIdAndRemove(req.params.id)
    console.log(`Deleted Catfood: `, catfood)
    res.redirect('/catfoods')
})

//* BRAND route
router.get('/catfoods/brand/:brandname', async (req, res) => {
    const brandCatfood = await Catfood.find(
        {brand: req.params.brandname}
    )
    res.render('brand.ejs', {
        brandCatfood: brandCatfood,
        brandName: req.params.brandname,
        tabTitle: req.params.brandname
        
    })
})

//* ADD TO USER FAVOURITE route    (find a way to add the if statements to make sure there's no duplicate)
router.put('/catfoods/:id/favourite', async (req, res) => {
    console.log(req.params.id)
    const catfood = await Catfood.updateOne(
        {_id: req.params.id},
        {$push: {favouritedBy: `${req.user.username}`}}
    )
    console.log(`Added ${catfood.name} to favourite`)
    res.redirect('/catfoods')
    
    // const user = await User.updateOne(
    //     req.user,
    //     {$push: {"Favourite": req.params.id}}
    // )
    // console.log(req.user)
})

//* USER FAVOURITE route    (needs to go before SHOW route)
router.get('/catfoods/favourite/', async (req, res) => {
    console.log(req.user)
    const favouritedCatfood = await Catfood.find({favouritedBy: {$in: [`${req.user.username}`]}})
    res.render('userFavourite.ejs', {
        favouritedCatfood : favouritedCatfood,
        user: req.user,
        tabTitle: `${req.user.username}'s Favourites`
    })
})

//* SHOW route
router.get('/catfoods/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        const catfood = await Catfood.findById(req.params.id)
        res.render('show.ejs', {
            catfood: catfood,
            tabTitle: catfood.name,
        })
    } catch (error) {
        console.log('Error:', error)
    }
})

module.exports = router