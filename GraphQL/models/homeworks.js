const { default: mongoose } = require('mongoose');
const mongose = require('mongoose');

const homeworkShema = new mongose.Schema({
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


module.exports = mongose.model('homework', homeworkShema)