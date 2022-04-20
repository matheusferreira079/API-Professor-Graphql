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
    const emailStringfy = String(email)
    let del = await client.query(`select * from professor where email = ?`, [emailStringfy]);

    return del;
}
exports.getTodosProfessores = async (client) => {
    let users = await client.query(`select * from professor`);

    return users;
}
exports.getDisciplinaPorId = async (client, id) => {

    let users = await client.query(`select * from disciplina where id = ?`, [id]);
    return users;
}
exports.postProfessor = async (client, data) => {
    let users = await client.query(`insert  into professor values
    (null,?,?,?);`, [data.nome, data.email, data.disciplinas_id])
    return users;
}
exports.updateProfessor = async (client, data) => {
    let user = await client.query(`update professor set nome = ?, email=?, disciplina = ? where id = ?;`, [data.nome, data.email, data.disciplina, data.id])
    console.log(user)
}
exports.deletProfessor = async (client, id) => {
    console.log("delet professor", id);
    let user = await client.query(`delete from professor where id = ?;`, [id])
    console.log(user)
}
