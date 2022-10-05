const user = require('../models/users.js')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: 'variables.env'})

const createToken = (user, secret, expiresIn) =>{
    const {id, email} = user
    return jwt.sign( {id, email}, secret, {expiresIn})
}

const resolvers = {
    Mutation: {
        createUser: async (root, {input}, ctx) => {
            const {email, password} = input;

            const existUser = await user.findOne({email});
            if(existUser){
                throw new Error('El usuario ya esta registrado');
            }
            try {

                //Hash Password
                const salt = await bcryptjs.genSaltSync(10)
                input.password = await bcryptjs.hash(password, salt)

                //Create user
                let newUser = new user(input);
                newUser.save();
                return 'Usuario creado correctamente'
            } catch (error) {
                console.log(error)
            }
        },
        authenticationUser: async (root, {input}, ctx) => {
            const {email, password} = input;
            const existUser = await user.findOne({email});

            if(!existUser){
                throw new Error('El usuario no esta registrado');
            }

            const truePassword = await bcryptjs.compare(password, existUser.password)
            if(!truePassword){
                throw new Error('La contraseña no es correcta');
            }

            return {
                token: createToken(existUser, process.env.SECRET, '2hr')
            }
        }
    }
};



module.exports = resolvers;