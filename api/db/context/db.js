// ORM (Object Relational Mapping)
const pgp = require('pg-promise'); 

const db = pgp()({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'tasks',
    port: 5432
});

module.exports = db;