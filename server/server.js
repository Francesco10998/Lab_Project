var mysql = require('mysql2');
const express = require("express");

const PORT = 8000;

const app = express();

//----------------- app routing -------------------------
app.get("/", (req, res) => {
  res.json({ "users": ["userOne","userTwo", "userThree"] });
});
//------------------home page ---------------------------
app.get("/home", (req, res) => {
    res.json({ "users": ["userOne","userTwo", "userThree"] });
  });

//------------------login page --------------------------
app.get("/login", (req, res) => {
  //database connection
  var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "FraFeffo_98",
    database : 'golden_auctions'
  });

  //take the username and password passate da react
  var data = req.body

  Query = 'SELECT * FROM users WHERE username ='+data.username+'AND pass ='+data.pass;

  //execute query
  connection.query(Query, function (error, results, fields) {
    if (error) throw error;
    else{
      console.log('user authenticated: ', results);
    }
  });
  
 
  res.json({ "users": ["userOne","userTwo", "userThree"] });
  
  //close database connection
  con.end(function(err) {
    // The connection is terminated now
    console.log('connection terminated')
  });
});

//------------------ register page ------------------------
app.get("/register", (req, res) => {
  res.json({ "users": ["userOne","userTwo", "userThree"] });
});

//----------------- myoffers page -------------------------
app.get("/myoffers", (req, res) => {
  res.json({ "users": ["userOne","userTwo", "userThree"] });
});

//---------------- myauctions page ------------------------
app.get("/myauctions", (req, res) => {
  res.json({ "users": ["userOne","userTwo", "userThree"] });
});





app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
