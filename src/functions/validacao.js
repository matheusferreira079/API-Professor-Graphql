const { ModuleLoader } = require("graphql-tools")


exports.disciplinaValue = async (client) => {

    const qtdDisciplinas = await client.query("select * from disciplina")

    if (qtdDisciplinas.length === 0) {
        await client.query('INSERT INTO disciplina values(null, "PI",100),(null,"BD",100),(null,"ALG",140),(null,"TI",60),(null,"ARQUICOMP",100);')
    }

}
exports.professorValue = async (client) => {
    const qtdprofessores = await client.query("select * from professor")

    if (qtdprofessores.length === 0) {
        await client.query('INSERT INTO professor values(null, "alex","Alex.barreira@bandtec.com.br",1),(null, "Celia","celia.taniwaki@bandtec.com.br",2),(null, "Yosh","jose.yoshiriro@bandtec.com.br",3);')
    }
}