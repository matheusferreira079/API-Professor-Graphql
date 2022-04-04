const database = require('../../../database');
/* 
Esses são os resolvers do objeto professor.
*/


function geradorDeId(lista) {
    /* 
    Essa função gera os ids automaticamente para cada professor criado.
    */
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
            /* 
                Esse resolver tem a função de procurar a disciplina do professor que foi passado como 
                parametro e retorna a disciplina se for achado.
            */
            return database.disciplinas.find((d) => d.id === professor.disciplina);
        },
    },
    Query: {
        /* 
            Bloco de querys, que são aonde pesquisamos as informações da api.
        */
        professor(_, { filtro }) {
            /* 
                Esse resolver procura um professor atraves de um filtro
                que pode ser o Email ou ID do professor
            */
            if (filtro.id) {
                return database.professores.find((db) => db.id === filtro.id);
            } else if (filtro.email) {
                return database.professores.find((db) => db.email === filtro.email);
            } 
        },
        professores: () => database.professores,
        /* 
            O  resolver professores retorna a lista de professores que existe na base de dados.
        */
    },
    Mutation: {
        /* 
            Bloco das mutations da API, aonde criamos editamos e excluimos informações.
        */
        criarProfessor(_, { data }) {
            /* 
                Esse resolver tem a função de criar um novo professor 
                com os dados que foi passado no parametro data,
                faz algumas validações e retorna o professor caso ele seja criadocom sucesso.

            */
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
            /* 
                Esse resolver é aonde atualizamos o professor, ele recebe o ID do professor que queremos
                atualizar e a informação que queemos atualizar, que pode ser apenas uma ou 
                todas as informações do professor. E retorna o professor atualizado
            */
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
            /* 
                Esse resolver é aonde deletamos os professores, ele pede como parametro o ID do professor 
                ou o email, apenas um deles, se existri um professor com alguma dessas chaves o mesmo é deletado.
                E a função retorna se deu certo ou não a mutation.
            */
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