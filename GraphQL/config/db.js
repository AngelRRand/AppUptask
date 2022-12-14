const mongoose = require('mongoose');
require('dotenv').config({path: '.env'});


const conectDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
        });
        console.log('DB Conectada')
    } catch (error) {
        console.log('Hubo un error');
        console.log(error);
        process.exit(1);
    }
}

module.exports = conectDB;