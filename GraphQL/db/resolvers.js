const Course = [
    {
        title: "Javascript Moderno Guía definitiva Construye +10 Proyectos",
        technology: "Javascript ES6",
    },
    {
        title: "React - La Guía Completa: Hooks Context Redux MERN +15 Apps",
        technology: "React",
    },
    {
        title: "Node js - Bootcamp Desarrollo Web inc. MVC y REST API",
        technology: "React",
    },
    {
        title: "React js - ReactJS Avanzado - FulllStack React GraphQL y Apollo",
        technology: "React",
    },
];

const resolvers = {
    Query: {
        getCourse: () => Course,

        getTechnology: () => technology
    },
    Mutation: {
        createUser: () => {
            console.log('creando usuario')
        }
    }
};



module.exports = resolvers;