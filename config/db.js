//declaration des données de connection à la base de données
let mysql = require('mysql');
let consql = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'pascaline',
    database:'bsi_salarie'
});
consql.connect();
//exporte le module
module.exports= consql;