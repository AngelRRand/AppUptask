const user = require('../models/users.js')
const bcryptjs = require('bcryptjs')

const resolvers = {
    Query: {
        getCourse: () => Course,

        getTechnology: () => technology
    },
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
            console.log(truePassword)
        }
    }
};



module.exports = resolvers;