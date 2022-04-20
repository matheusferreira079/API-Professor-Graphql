
var common = require('../../../modules/common/mysql')
var validacao = require('../../../../functions/validacao')

const Client = require('serverless-mysql')
exports.insertProf = async (data, _,) => {
    var client = Client({
        config: {
            host: "localhost",
            database: "graphqlExemple",
            user: "root",
            password: "password"
        }
    })
    await common.init(client)
    console.log(data)
    var resp = await common.postProfessor(client, data);


    client.quit()
    return resp
}


