var common = require('../../../modules/common/mysql')
var validacao = require('../../../../functions/validacao')

const Client = require('serverless-mysql')
exports.func = async (id, _,) => {
    var client = Client({
        config: {
            host: "localhost",
            database: "graphqlExemple",
            user: "root",
            password: "password"
        }
    })
    await common.init(client)

    var resp = await common.getTodosProfessores(client);

    respStringificado = JSON.stringify(resp)
    respJson = JSON.parse(respStringificado)

    client.quit()
    console.log(respJson, "get professores")

    return respJson
}