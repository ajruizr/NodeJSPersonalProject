// ORM (Object Relational Mapping)
const pgp = require('pg-promise');
const camelize = require('camelize');

function camelizeColumnNames(data) {
    //returning in camelCase just in case it returns info
    if (data.length !=0) {
        var names = Object.keys(data[0]);
        var camels = names.map(n=> {
            return camelize(n);
        });
        data.forEach(d=> {
            names.forEach((n, i)=> {
                var c = camels[i];
                if (!(c in d)) {
                    d[c] = d[n];
                    delete d[n];
                }
            });
        });    
    }else{
        return data
    }
    
}

const db = pgp({receive: camelizeColumnNames})({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'tasks',
    port: 5432
});
module.exports = db;