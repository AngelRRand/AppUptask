const {ApolloServer, gql }= require('apollo-server')


const typeDefs = gql`

    type Curso {
        titulo: String
        
    }

    type Tecnologia {
      tecnologia: String
    }

    type Query {
        obtenerCursos : [Curso]
        obtenerTecnologias: [Tecnologia]
    } 

`;

const resolvers = {
    Query: {
        obtenerCursos : () => cursos,

        obtenerTecnologias: () => tecnologia
    }
}

const cursos = [
    {
      titulo: "Javascript Moderno Guía definitiva Construye +10 Proyectos",
      tecnologia: "Javascript ES6",
    },
    {
      titulo: "React - La Guía Completa: Hooks Context Redux MERN +15 Apps",
      tecnologia: "React",
    },
    {
      titulo: "Node js - Bootcamp Desarrollo Web inc. MVC y REST API",
      tecnologia: "React",
    },
    {
      titulo: "React js - ReactJS Avanzado - FulllStack React GraphQL y Apollo",
      tecnologia: "React",
    },
  ];

const server = new ApolloServer( { typeDefs, resolvers })

server.listen().then( ({url}) =>{
    console.log(`servidor listo en la URL ${url}`)
})