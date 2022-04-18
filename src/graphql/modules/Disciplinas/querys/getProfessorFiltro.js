
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

    var resp = await common.getProfessorId(client, id);

    respStringificado = JSON.stringify(resp)
    respJson = JSON.parse(respStringificado)

    client.quit()

    return respJson[0]
}
exports.funcEmail = async (email, _,) => {
    var client = Client({
        config: {
            host: "localhost",
            database: "graphqlExemple",
            user: "root",
            password: "password"
        }
    })
    await common.init(client)

    var resp = await common.getProfessorEmail(client, email);
    respStringificado = JSON.stringify(resp)
    respJson = JSON.parse(respStringificado)

    client.quit()

    return respJson[0]
}

