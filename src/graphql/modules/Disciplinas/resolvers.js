const database = require('../../../database');
/*
Aqui é onde definimos os resolvers das disciplinas; 
ou seja, a logica do processo e como iremos retorna os dados da api.
*/
module.exports = {
    Query: {
        disciplinas() {
            /*
                Esse resolver retorna todas as disciplinas encontradas no database (database/index.js)
            */
            return database.disciplinas;
        },
    },
};