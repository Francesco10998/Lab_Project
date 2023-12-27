var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "FraFeffo_98"
});

con.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
     
      console.log('connected as id ' + con.threadId);
});



con.end(function(err) {
    // The connection is terminated now
    console.log('connection terminated')
  });