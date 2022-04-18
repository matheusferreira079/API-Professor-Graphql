
var common = require('../../../modules/common/mysql')
var validacao = require('../../../../functions/validacao')

const Client = require('serverless-mysql')
exports.func = async (_,) => {
    var client = Client({
        config: {
            host: "localhost",
            database: "graphqlExemple",
            user: "root",
            password: "password"
        }
    })
    await common.init(client)

    await validacao.disciplinaValue(client)

    var resp = await common.getDisciplinas(client);
    respStringificado = JSON.stringify(resp)
    respJson = JSON.parse(respStringificado)

    client.quit()
    return respJson
}
exports.funcDisciplinaId = async (id, _) => {
    var client = Client({
        config: {
            host: "localhost",
            database: "graphqlExemple",
            user: "root",
            password: "password"
        }
    })
    await common.init(client)
    var resp = await common.getDisciplinaPorId(client, id)
    respStringificado = JSON.stringify(resp)
    respJson = JSON.parse(respStringificado)

    client.quit()
    return respJson
}
