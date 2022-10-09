const { gql }= require('apollo-server');


const typeDefs = gql`

    type Proyect {
        title: String
        id: ID
    }

    type Token {
        token: String
    }

    type Homework {
        title: String
        proyect: String
        state: Boolean
        id: ID
        
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

    input HomeworkInput {
        title: String!
        proyect: String
    }

    type Mutation {

        #USER
        createUser(input: UserInput): String
        authenticationUser(input: AuthenticationInput) : Token

        #PROYECT
        newProyect(input: ProyectInput) : Proyect
        updateProyect(id: ID!, input: ProyectInput) : Proyect
        deletProyect(id: ID!) : String

        #HOMEWORK
        newHomework(input: HomeworkInput): Homework
        updateHomework(id: ID!, input: HomeworkInput, state: Boolean) : Homework
    }
`;

module.exports = typeDefs;