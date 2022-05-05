var common = require('../../../modules/common/mysql')
var validacao = require('../../../../functions/validacao')
var db = require('../../../../database/database')

exports.insertProf = async (data, _,) => {
    const client = await db.conect()

    await common.init(client)
    console.log(data)
    var resp = await common.updateProfessor(client, data);


    client.quit()
    return resp
}


