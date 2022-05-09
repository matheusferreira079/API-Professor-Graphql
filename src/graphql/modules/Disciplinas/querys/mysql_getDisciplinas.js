var common = require('../../../modules/common/mysql')
var validacao = require('../../../../functions/validacao')
var db = require('../../../../database/database')

exports.func = async (_,) => {

    const client = await db.conect()

    await common.init(client)

    await validacao.disciplinaValue(client)

    var resp = await common.getDisciplinas(client);
    respStringificado = JSON.stringify(resp)
    respJson = JSON.parse(respStringificado)

    client.quit()
    return respJson
}
exports.funcDisciplinaId = async (id, _) => {

    const client = await db.conect()

    await common.init(client)
    var resp = await common.getDisciplinaPorId(client, id)
    respStringificado = JSON.stringify(resp)
    respJson = JSON.parse(respStringificado)

    client.quit()
    return respJson
}
