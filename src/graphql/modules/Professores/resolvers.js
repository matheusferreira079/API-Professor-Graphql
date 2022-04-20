const database = require('../Disciplinas/querys/mysql_getDisciplinas');
const professorFind = require('../Disciplinas/querys/getProfessorFiltro');
const insertProf = require('../Disciplinas/querys/insertProfessor');

const filtros = require('../Disciplinas/querys/getProfessorFiltro')
const todosProfessores = require('..//Disciplinas/querys/getProfessores')
const update = require('..//Disciplinas/querys/updateProfessor')
const deletar = require('..//Disciplinas/querys/deletarProfessor')

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
        async disciplina(professor) {
            /* 
                Esse resolver tem a função de procurar a disciplina do professor que foi passado como 
                parametro e retorna a disciplina se for achado.
            */
            let disciplinaFiltrada = await database.funcDisciplinaId(professor.disciplina)
            //console.log("Professor", disciplinaFiltrada)

            return disciplinaFiltrada[0];
        },
    },
    Query: {
        /* 
            Bloco de querys, que são aonde pesquisamos as informações da api.
        */
        async professor(_, { filtro }) {
            /* 
                Esse resolver procura um professor atraves de um filtro
                que pode ser o Email ou ID do professor
            */
            let filtrado = await filtros

            if (filtro.id) {
                let retornoId = filtrado.func(filtro.id)

                return retornoId
            } else if (filtro.email) {
                let retornoEmail = filtrado.funcEmail(filtro.email)
                return retornoEmail;
            }
        },
        professores: () => todosProfessores.func(),
        /* 
            O  resolver professores retorna a lista de professores que existe na base de dados.
        */
    },
    Mutation: {
        /* 
            Bloco das mutations da API, aonde criamos editamos e excluimos informações.
        */
        async criarProfessor(_, { data }) {
            /* 
                Esse resolver tem a função de criar um novo professor 
                com os dados que foi passado no parametro data,
                faz algumas validações e retorna o professor caso ele seja criadocom sucesso.

            */
            const { email } = data;
            const professorExistente = await professorFind.funcEmail(email)
            const obj = Object.assign({}, data)

            if (typeof professorExistente !== "undefined") {
                throw new Error(`Professor ${data.nome} já existe no Base de Dados`);
            }

            const novoProfessor = {
                nome: obj.nome,
                email: obj.email,
                disciplinas_id: obj.disciplina
            };
            await insertProf.insertProf(novoProfessor)
            const resposta = await filtros.funcEmail(obj.email)
            return resposta;
        },
        async atualizaProfessor(_, { id, data }) {
            /* 
                Esse resolver é aonde atualizamos o professor, ele recebe o ID do professor que queremos
                atualizar e a informação que queemos atualizar, que pode ser apenas uma ou 
                todas as informações do professor. E retorna o professor atualizado
            */
            const professor = await filtros.func(id)
            console.log(professor)
            const objAtualizacao = Object.assign({}, data)

            let newObj = { ...professor, ...objAtualizacao }
            console.log(newObj)

            await update.insertProf(newObj)

            return newObj;
        },
        async deletaProfessor(_, email) {
            /* 
                Esse resolver é aonde deletamos os professores, ele pede como parametro o ID do professor 
                ou o email, apenas um deles, se existir um professor com alguma dessas chaves o mesmo é deletado.
                E a função retorna se deu certo ou não a mutation.
            */
            let resposta = await deletar.deleteProf(email.email)
            console.log(email.email)
            return resposta;
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