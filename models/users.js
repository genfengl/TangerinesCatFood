const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    favourite: [String]
})    
//* leave the schema model empty for passport plugin at the beginning

//? how to add a favourite for this user in the schema? Dido suggests just adding to the schema

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', userSchema)

module.exports = User

