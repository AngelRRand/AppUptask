const {ApolloServer, qsl }= require('apollo-server')


const server = new ApolloServer()

server.listen().then( ({url}) =>{
    console.log(`servidor listo en la URL ${url}`)
})