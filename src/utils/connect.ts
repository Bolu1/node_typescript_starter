const mysql = require('mysql')

// create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'npg'
})
module.exports = db
