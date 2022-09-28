const {ApolloServer, gql }= require('apollo-server')


const typeDefs = gql`

    type Query {

    } 
    
`;

const server = new ApolloServer()

server.listen().then( ({url}) =>{
    console.log(`servidor listo en la URL ${url}`)
})