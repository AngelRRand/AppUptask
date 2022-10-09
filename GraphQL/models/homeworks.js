const mongoose = require('mongoose');

const homeworkShema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    create: {
        type: Date,
        default: Date.now()
    },
    proyect: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'proyect'
    },
    state: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('homework', homeworkShema)