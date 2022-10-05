const { gql }= require('apollo-server');


const typeDefs = gql`

    type Course {
        title: String
        technology: String
    }

    type Technology {
        technology: String
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

    type Mutation {
        createUser(input: UserInput): String
        authenticationUser(input: AuthenticationInput) :String
    }
`;

module.exports = typeDefs;