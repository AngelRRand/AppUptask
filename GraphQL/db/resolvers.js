const user = require('../models/users.js')
const proyect = require('../models/proyects.js')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: '.env'})

const createToken = (user, secret, expiresIn) =>{
    const {id, email} = user
    return jwt.sign( {id, email}, secret, {expiresIn})
}

const resolvers = {
    Query: {
        getProyects: async(root, {input}, ctx)=>{
            const proyects = await proyect.find({author: ctx.user.id})
            return proyects
        }
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
            if(!truePassword){
                throw new Error('La contraseña no es correcta');
            }

            return {
                token: createToken(existUser, process.env.SECRET, '2hr')
            }
        },
        newProyect: async (root, {input}, ctx) => {

            console.log('Desde resolver', ctx)
            try {
                const newProyect = new proyect(input)

                newProyect.author = ctx.user.id


                const result = await newProyect.save()

                return result
            } catch (error) {
                console.log(error)
            }
            
        },
        updateProyect: async (root, {id, input}, ctx) => {
            //Existe?
            let updateProyect = await proyect.findById(id)
            if(!updateProyect){
                throw new Error('Proyecto no encontrado')
            }
            //Revisar que la persona trata de editarlo
            if(updateProyect.author.toString() !== ctx.user.id){
                throw new Error('No tienes las credenciales para editar')
            }
            //Guardar
            updateProyect = await proyect.findOneAndUpdate({_id: id}, input, {new: true})
            return updateProyect
        },
        deletProyect: async (root, {id, input}, ctx) => {
            let deletProyect = await proyect.findById(id)

            if(!deletProyect){
                throw new Error('Proyecto no encontrado')
            }
            if(deletProyect.author.toString() !== ctx.user.id){
                throw new Error('No tienes las credenciales para editar')
            }

            await proyect.findByIdAndDelete({_id: id})
            return 'proyecto eliminado'
        }
    }
};



module.exports = resolvers;