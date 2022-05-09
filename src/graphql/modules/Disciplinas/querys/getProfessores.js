var common = require('../../../modules/common/mysql')
var validacao = require('../../../../functions/validacao')
var db = require('../../../../database/database')

exports.func = async (id, _,) => {
    const client = await db.conect()

    await common.init(client)

    await validacao.professorValue(client)
    
    var resp = await common.getTodosProfessores(client);

    respStringificado = JSON.stringify(resp)
    respJson = JSON.parse(respStringificado)

    client.quit()
    console.log(respJson, "get professores")

    return respJson
}