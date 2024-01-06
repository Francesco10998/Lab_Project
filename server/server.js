const express = require("express");

const utils = require("./util");


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

  //take the username and password passate da react
  var data = req.query;
  //console.log(data)

  username = data.username;
  password = data.password;
  encoded_password = utils.sha256(password)//per dopo

  //control the username in the database
  QueryUsername = 'SELECT * FROM users WHERE username="'+username+'"';

  //execute query
  utils.connection.query(QueryUsername, function (error, results, fields) {
    if (error) throw error;
    else{
      if(results != null){
        console.log('usernames exists: ', results);
        //control the password
        QueryPassword = 'SELECT * FROM users WHERE username="'+username+'" AND '+'pass="'+password+'"';
        utils.connection.query(QueryPassword, function (error, results, fields) {
          if (error) throw error;
          else{
            if(results != null){
              console.log('user authenticated');
              res.json({ "results": ["authenticated"] });
              //close database connection
              utils.connection.end(function(err) {
                // The connection is terminated now
                console.log('connection with database terminated')
              });
            }else{
              console.log('password inserted is wrong');
              res.json({ "results": ["wrong password"] });
            }
          }
        });
      }else{
        console.log('username wrong');
        res.json({ "results": ["wrong username"] });
      }
    }
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
