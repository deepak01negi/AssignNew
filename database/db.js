const mysql = require('mysql2/promise');
const config = require('../config');

const db = {};

async function initialize() {
    const { database, password, user, port, host } = config;

    const connection = await mysql.createConnection({ host, user, password, database });

    connection.connect();

    await connection.query(`Create database if not exists ${database}`)

    db.connection = connection;
}

initialize();

module.exports = db;