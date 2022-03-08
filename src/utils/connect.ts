const mysql = require('mysql')

// create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'evans',
    database : 'bluesprint-erp'
})
module.exports = db
