var common = require('../../../modules/common/mysql')
var validacao = require('../../../../functions/validacao')

const Client = require('serverless-mysql')
exports.deleteProf = async (email, _,) => {
    let retorno = true;
    var client = Client({
        config: {
            host: "localhost",
            database: "graphqlExemple",
            user: "root",
            password: "password"
        }
    })
    await common.init(client)

    var resp = await common.getProfessorEmail(client, email)
    if (typeof resp[0] == "undefined") {
        throw new Error(`Professor não existe no Base de Dados`);
    }
    respStringificado = JSON.stringify(resp)
    respJson = JSON.parse(respStringificado)
    await common.deletProfessor(client, respJson[0].id)
    client.quit()
    if (typeof respJson[0] == "undefined") {
        throw new Error(`Professor não existe no Base de Dados`);
    }

    return `Professor do email ${respJson[0].email} deletado com sucesso`;
}