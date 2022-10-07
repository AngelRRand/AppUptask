const {ApolloServer }= require('apollo-server')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: '.env'})
const typeDefs = require('./db/schema')
const resolvers = require('./db/resolvers')
const conectDB = require('./config/db')

conectDB();

const server = new ApolloServer( { 
    typeDefs, 
    resolvers,
    context: ({req}) => {
       const token = req.headers['authorization'] || ''
       //console.log(token)
       if(token){
        try {
            const user = jwt.verify(token, process.env.SECRET)
            return {
                user
            }
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