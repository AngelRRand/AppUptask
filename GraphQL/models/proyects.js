const mongose = require('mongoose');

const proyectShema = new mongose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    author:{
        type: mongose.Schema.Types.ObjectId,
        ref: 'user'
    },
    create: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongose.model('proyect', proyectShema)