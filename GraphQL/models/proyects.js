const mongoose = require('mongoose');

const proyectShema = new mongoose.Schema({
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
    }
})


module.exports = mongoose.model('proyect', proyectShema)