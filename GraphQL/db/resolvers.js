const user = require('../models/users.js')
const proyect = require('../models/proyects.js')
const homework = require('../models/homeworks.js')
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
        },
        getHomeworks: async(root, {input}, ctx)=>{
            const homeworks = await homework.find({author: ctx.user.id}).where('proyect').equals(input.proyect)
            return homeworks
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
        deletProyect: async (root, {id}, ctx) => {
            let deletProyect = await proyect.findById(id)

            if(!deletProyect){
                throw new Error('Proyecto no encontrado')
            }
            if(deletProyect.author.toString() !== ctx.user.id){
                throw new Error('No tienes las credenciales para editar')
            }

            await proyect.findByIdAndDelete({_id: id})
            return 'proyecto eliminado'
        },
        newHomework: async (root, {input}, ctx) => {
            try {
                const newHomework = new homework(input)
                newHomework.author = ctx.user.id
                const result = await newHomework.save()
                return result
            } catch (error) {
                console.log(error)
            }
        },
        updateHomework: async (root, {id, input, state}, ctx) => {
            let updateHomework = await homework.findById(id)

            if(!updateHomework){
                throw new Error('Tarea no encontrada')
            }

            if(updateHomework.author.toString() !== ctx.user.id){
                throw new Error('No tienes las credenciales para editar')
            }

            input.state = state

            updateHomework = await homework.findOneAndUpdate({_id : id}, input, {new : true})
            return updateHomework
        },
        deletHomework: async (root, {id}, ctx) => {
            let updateHomework = await homework.findById(id)

            if(!updateHomework){
                throw new Error('Tarea no encontrada')
            }

            if(updateHomework.author.toString() !== ctx.user.id){
                throw new Error('No tienes las credenciales para editar')
            }

            await homework.findOneAndDelete({_id: id})

            return "Tarea Eliminada"
        }
    }
};



module.exports = resolvers;