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

    type Mutation {
        createUser: String
    }
`;

module.exports = typeDefs;