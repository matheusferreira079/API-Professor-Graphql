// var common = require('../../src/graphql/modules/common/mysql');
// var validacao = require('../../src/functions/validacao');
const mysql = require('mysql')
const Client = require('serverless-mysql')
/*
var client = mysql.createConnection({
        host: "localhost",
        port: 3306,
        database: "graphqlexemple",
        user: "root",
        password: "password"
})
console.log(client)
module.exports = {
    client
}*/

exports.conect = async (_,) => {
    
   let client = Client({
        config: {
            host: "localhost",
            database: "graphqlExemple",
            user: "root",
            password: "password"
        }
    })
    return client
}