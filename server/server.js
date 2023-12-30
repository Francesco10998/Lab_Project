//const db = require("./DB_Connection");
const express = require("express");

const PORT = 8000;

const app = express();

app.get("/api", (req, res) => {
    res.json({ "users": ["userOne","userTwo", "userThree"] });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

/*
// database
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
  });*/
