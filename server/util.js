//hash function definition
var crypto = require('crypto');

function sha256(content) {  
  return crypto.createHash('sha256').update(content).digest('hex')
}

//database connection

var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "FraFeffo_98",
    database : 'golden_auctions'
  });



module.exports = { sha256,connection };