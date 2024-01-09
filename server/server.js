const express = require("express");

const utils = require("./util");


const PORT = 8000;

const app = express();
app.use(express.json());
const cors = require('cors');

//-----allow-cross-origin------//

/*app.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
 res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
 res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
 next();
});
*/
app.use(cors({ origin: 'http://localhost:3000' }));

//----------------- app routing -------------------------
app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});
//------------------home page ---------------------------
app.get("/home", (req, res) => {
  res.json({ message: "Hello from server!" });
  });

//------------------login page --------------------------
app.post("/login", (req, res) => {

  console.log('ciao');
  //take the username and password passate da react
  var data = req.query;

  const { username, password } = req.body;
  console.log(username,password);

  /* username = data.username;
  password = data.password;
  encoded_password = utils.sha256(password)//per dopo
  */

  //control the username in the database
  QueryUsername = 'SELECT * FROM users WHERE username="'+username+'"';

  //execute query
  utils.pool.query(QueryUsername, function (error, results, fields) {
    if (error) throw error;
    else{
      console.log(results);
      console.log(results.length);
      if(results.length!=0){
        console.log('usernames exists');
        //control the password
        QueryPassword = 'SELECT * FROM users WHERE username="'+username+'" AND '+'pass="'+password+'"';
        utils.pool.query(QueryPassword, function (error, results, fields) {
          if (error) throw error;
          else{
            if(results.lenght != 0){
              console.log('user authenticated');
              res.json({ "results": ["authenticated"] });
            }else{
              console.log('password inserted is wrong');
              res.json({ "results": ["wrong password"] });
            }
            //close database connection
            //utils.pool.end(function(err) {
            // The connection is terminated now
            //console.log('connection with database terminated')
            //});
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
app.post("/register", (req, res) => {
  //take the username ,email and password passate da react
  var data = req.query;
  //console.log(data)

  username = data.username;
  email = data.email;
  password = data.password;
  address = data.address
  cell = data.cell
  paymentMethod = data.paymentMethod

  encoded_password = utils.sha256(password)

  //control if the username is already used
  QueryUsername = 'SELECT * FROM users WHERE username="'+username+'"';

  //execute query
  utils.pool.query(QueryUsername, function (error, results, fields) {
    if (error) throw error;
    else{
      if(results.length != 0){//username already exist part
        console.log('usernames already exists: ');
        res.json({ "results": ["username_already_exists"] });
      }
      else{//ok username , check the email
        QueryEmail = 'SELECT * FROM users WHERE email="'+email+'"';
        utils.pool.query(QueryEmail, function (error, results, fields) {
          if (error) throw error;
          else{
            if(results.length != 0){//email already exist part
              console.log('email already exists: ');
              res.json({ "results": ["email_already_exists"] });
            }
            else{//ok email, create the account in the database
              QueryNewUser = 'INSERT INTO users (username, email, pass, address, phoneNumber, paymentMethod) VALUES ("'+username+'", "'+email+'", "'+encoded_password+'", "'+address+'","'+cell+'","'+paymentMethod+'")';
              utils.pool.query(QueryNewUser, function (error, results, fields) {
                if (error) throw error;
                else{
                  if(results.length != 0){//user inserted
                    console.log('username inserted: ');
                    res.json({ "results": ["user_inserted"] });
                  }else{//user not inserted
                    console.log('username not inserted, expected some problem: ');
                    res.json({ "results": ["user_not_inserted"] });
                  }
                  //close database connection
                  utils.pool.end(function(err) {
                  // The connection is terminated now
                  console.log('connection with database terminated')
              });
                }
              });
            }
          }
        });
      }
    }
  });
        
       
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
