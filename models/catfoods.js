const mongoose = require('mongoose')
const Schema = mongoose.Schema

const catfoodSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    brand: {type: String, required: true},
    description: String,
    imageURL: String,
    favouritedBy: [String]
})

const Catfood = mongoose.model('Catfood', catfoodSchema)

module.exports = Catfood