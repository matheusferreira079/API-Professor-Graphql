const database = require('../../../database');

module.exports = {
    Query: {
        disciplinas() {
            return database.disciplinas;
        },
    },
};