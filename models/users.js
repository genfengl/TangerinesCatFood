const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({})    //* leave the schema model empty for passport plugin

//? how to add a favourite for this user in the schema?

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', userSchema)

module.exports = User

