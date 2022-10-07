const {ApolloServer }= require('apollo-server')
const jwt = require('jsonwebtoken')
require('dotenv').config('.env')
const typeDefs = require('./db/schema')
const resolvers = require('./db/resolvers')
const conectDB = require('./config/db')

conectDB();


const server = new ApolloServer( { 
    typeDefs, 
    resolvers,
    context: ({req}) => {
       const token = req.headers['Authorization'] || ''
       console.log(token)
       if(token){
        try {
            const user = jwt.verify(token, process.env.SECRET)
            console.log(user)
        } catch (error) {
            console.log('hola')
            console.log(error)      
        }
       }
    }
 })

server.listen().then( ({url}) =>{
    console.log(`servidor listo en la URL ${url}`)
})