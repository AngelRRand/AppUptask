const { gql }= require('apollo-server');


const typeDefs = gql`

    type Course {
        title: String
        technology: String
    }

    type Technology {
        technology: String
    }

    type Proyect {
        title: String
        id: ID
    }

    type Token {
        token: String
    }

    type Query {
        getCourse : [Course]
        getTechnology: [Technology]
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
    }
`;

module.exports = typeDefs;