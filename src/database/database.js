const mysql = require('mysql')
const Client = require('serverless-mysql')

exports.conect = async (_,) => {
    
   let client = Client({
        config: {
            host: "localhost",
            database: "sptech",
            user: "root",
            password: "password"
        }
    })
    return client
}