const database = require('../../../database');

function geradorDeId(lista) {
    let novoId;
    let ultimo = lista[lista.length - 1];

    if (!ultimo) {
        novoId = 0;
    } else {
        novoId = ultimo.id;
    }

    return ++novoId;
}

module.exports = {
    Professor: {
        disciplina(professor) {
            return database.disciplinas.find((d) => d.id === professor.disciplina);
        },
    },
    Query: {
        professor(_, { filtro }) {
            if (filtro.id) {
                return database.professores.find((db) => db.id === filtro.id);
            } else if (filtro.email) {
                return database.professores.find((db) => db.email === filtro.email);
            } 
        },
        professores: () => database.professores,
    },
    Mutation: {
        criarProfessor(_, { data }) {
            const { email } = data;

            const professorExistente = database.professores.some((p) => p.email === email);


            if (professorExistente) {
                throw new Error(`Professor ${data.nome} já existe no Base de Dados`);
            }

            const novoProfessor = {
                ...data,
                id: geradorDeId(database.professores),
                disciplinas_id: 1
            };

            database.professores.push(novoProfessor);

            return novoProfessor;
        },
        atualizaProfessor(_, { id, data }) {
            const professor = database.professores.find((p) => p.id === id);
            const indice = database.professores.findIndex((u) => u.id === id);

            const novoProfessor = {
                ...professor,
                ...data,
            };

            database.professores.splice(indice, 1, novoProfessor);

            return novoProfessor;
        },
        deletaProfessor(_, { filtro: { id, email } }) {
            return deletaProfessorFiltro(id ? { id } : { email });
        },
    },
};

function deletaProfessorFiltro(filtro) {
    const chave = Object.keys(filtro)[0];
    const valor = Object.values(filtro)[0];

    const professorEncontrado = database.professores.find((p) => p[chave] === valor);
    database.professores = database.professores.filter((p) => p[chave] !== valor);

    return !!professorEncontrado;
}