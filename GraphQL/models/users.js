const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    register: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('user', usersSchema)