const user = require('../models/users.js')

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
                let newUser = new user(input);
                newUser.save();
                return 'Usuario creado correctamente'
            } catch (error) {
                console.log(error)
            }
        }
    }
};



module.exports = resolvers;