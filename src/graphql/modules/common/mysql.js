var common = require('../../modules/Disciplinas/querys/mysql_getDisciplinas')
exports.init = async (client) => {
    await client.query(`
    CREATE TABLE IF NOT EXISTS disciplina
    (
        id MEDIUMINT UNSIGNED not null AUTO_INCREMENT, 
        nome varchar(100) not null,
        cargaHoraria int, 
        PRIMARY KEY (id)
    );  
    `)

    await client.query(`
    CREATE TABLE IF NOT EXISTS professor
    (
        id MEDIUMINT UNSIGNED not null AUTO_INCREMENT, 
        nome varchar(100) not null,
        email varchar(100) not null,
        disciplina int,
        PRIMARY KEY (id)
    );  
    `)
}
exports.getDisciplinas = async (client) => {
    let users = await client.query('select * from disciplina');

    return users;
}
exports.getProfessorId = async (client, id) => {
    let users = await client.query(`select * from professor where id = ?`, [id]);

    return users;
}
exports.getProfessorEmail = async (client, email) => {
    let users = await client.query(`select * from professor where email = ?`, [email]);

    return users
}
exports.getTodosProfessores = async (client) => {
    let users = await client.query(`select * from professor`);

    return users
}
exports.getDisciplinaPorId = async (client, id) => {

    let users = await client.query(`select * from disciplina where id = ?`, [id]);
    return users;
}
