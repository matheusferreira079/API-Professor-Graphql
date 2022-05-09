var common = require('../../../modules/common/mysql')
var validacao = require('../../../../functions/validacao')
var db = require('../../../../database/database')

exports.func = async (id, _,) => {
    const client = await db.conect()

    await common.init(client)

    await validacao.professorValue(client)
    
    var resp = await common.getProfessorId(client, id);

    respStringificado = JSON.stringify(resp)
    respJson = JSON.parse(respStringificado)

    client.quit()

    return respJson[0]
}
exports.funcEmail = async (email, _,) => {
    const client = await db.conect()

    await common.init(client)

    var resp = await common.getProfessorEmail(client, email);
    respStringificado = JSON.stringify(resp)
    respJson = JSON.parse(respStringificado)

    client.quit()

    return respJson[0]
}

