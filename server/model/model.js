const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        isAdmin: {type: Boolean, default: false}
    },
    {
        collection: 'users'
    }
)

const schema2 = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        plainTextPassword: {type: String, required: true},
        isAdmin: {type: Boolean, default: false}
    },
    {
        collection: 'passwordDB'
    }
)

const userDB = mongoose.model('userDB', schema)
const passwordDB = mongoose.model('passwordDB', schema2)
exports.passwordDB = passwordDB
exports.userDB = userDB
