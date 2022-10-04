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


    input userInput {
        name: String!
        email: String!
        password: String!
    }

    type Mutation {
        createUser(input: userInput): String
    }
`;

module.exports = typeDefs;