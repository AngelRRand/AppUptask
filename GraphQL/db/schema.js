const { gql }= require('apollo-server');


const typeDefs = gql`

    type Proyect {
        title: String
        id: ID
    }

    type Token {
        token: String
    }

    type Query {
        getProyects: [Proyect]
    } 


    input UserInput {
        name: String!
        email: String!
        password: String!
    }

    input AuthenticationInput {
        email: String!
        password: String!
    }

    input ProyectInput {
        title: String!
    }

    type Mutation {
        createUser(input: UserInput): String
        authenticationUser(input: AuthenticationInput) : Token
        newProyect(input: ProyectInput) : Proyect
        updateProyect(id: ID!, input: ProyectInput) : Proyect
    }
`;

module.exports = typeDefs;