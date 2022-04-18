/*
Aqui é onde definimos os resolvers das disciplinas; 
ou seja, a logica do processo e como iremos retorna os dados da api.
*/

module.exports = {
    Query: {
        disciplinas: require("./querys/mysql_getDisciplinas").func

    },

};
