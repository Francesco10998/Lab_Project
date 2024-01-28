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

app.post("/", (req, res) => {
  const { mode, id } = req.body;
  console.log(req.body)

  if(mode == "auctions"){
    //Control the Auctions in the Database
    Query = 'SELECT * FROM auctions';

    //Execute Query
    utils.pool.query(Query, function (error, results, fields) {
      if (error) throw error;
      else{
        //console.log(results);
        //console.log(results.length);
        if(results.length!=0){
          console.log("Returning the User's Auction");
          res.json(results)
          console.log(results);
        }
      }
    });
  }
  else{
    Query = 'SELECT * FROM items WHERE id="'+id+'"';

    //Execute Query
    utils.pool.query(Query, function (error, results, fields) {
      if (error) throw error;
      else{
        //console.log(results);
        //console.log(results.length);
        if(results.length!=0){
          console.log("Returning the User's Auction");
          res.json(results)
          console.log(results);
        }
      }
    });
  }
});

//------------------home page ---------------------------
app.get("/home", (req, res) => {
  res.json({ message: "Hello from server!" });
  });

//------------------login page --------------------------
app.post("/login", (req, res) => {

  //take the username and password passate da react
  const { username, password } = req.body;
  console.log(username,password);

  /* username = data.username;
  password = data.password;
  */
  encoded_password = utils.sha256(password)//per dopo
  

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
        QueryPassword = 'SELECT * FROM users WHERE username="'+username+'" AND '+'pass="'+encoded_password+'"';
        utils.pool.query(QueryPassword, function (error, results, fields) {
          if (error) throw error;
          else{
            if(results.length != 0){
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
  const { username, email, password } = req.body;
  //console.log(data)

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
              //QueryNewUser = 'INSERT INTO users (username, email, pass, address, phoneNumber, paymentMethod) VALUES ("'+username+'", "'+email+'", "'+encoded_password+'", "'+address+'","'+cell+'","'+paymentMethod+'")';
              QueryNewUser = 'INSERT INTO users (username, email, pass) VALUES ("'+username+'", "'+email+'", "'+encoded_password+'")';
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
                  /*utils.pool.end(function(err) {
                  // The connection is terminated now
                  console.log('connection with database terminated')
                  });*/
                }
              });
            }
          }
        });
      }
    }
  });
        
       
});
//----------------- enter settings page ------------------------
app.post("/settings", (req, res) => {

  let{mode,username,modifyParameter,newUsername,newEmail,newAddress,newPhone,newPayment}= req.body;
  console.log(mode,username,modifyParameter);

  //------when open setting return all the data react will put on the placeholder--------//
  if(mode=="enter"){
    //username = "feffo98";
    //take all data of the user
    QueryData = 'SELECT * FROM users WHERE username="'+username+'"';

    //execute query
    utils.pool.query(QueryData, function (error, results, fields) {
      if (error){
        res.json({ "data_user": ["user not found"] });
        throw error;
      }
      else{
        if(results.length!=0){
          //send user data to client
          res.json({'data_user': [results[0]]});
          console.log(results[0]);

        }
      }
    });

  }else if(mode=="modify"){/////-------------modify user parameters-------------------

    if(modifyParameter=='0'){

      QueryExistUsername = "SELECT * FROM users WHERE username = '"+newUsername+"'";
      utils.pool.query(QueryExistUsername, function (error, results, fields) {
        if (error){
          res.status(500).json({ "data_user": ["Server error"] });
          throw error;
        }
        if (results.length !== 0) {
          console.log(results);
          res.json({ "data_user": [username] });
        } else {
          QueryModifyUsername = "UPDATE users SET username = '"+newUsername+"'WHERE username = '"+username+"'";
          //execute query
          utils.pool.query(QueryModifyUsername, function (error, results, fields) {
            if (error){
              res.status(500).json({ "data_user": ["server error"] });
              throw error;
            }
            if (results.length !== 0) {
              console.log(results);
              res.json({ "data_user": [newUsername] });
            } else {
              console.log("Username not modified");
              res.json({ "data_user": [username] });
            }
          });
        }
      });
    }


      /*
      QueryModifyUsername = "UPDATE users SET username = '"+newUsername+"'WHERE username = '"+username+"'";
      //execute query
      utils.pool.query(QueryModifyUsername, function (error, results, fields) {
        if (error){
          res.status(500).json({ "data_user": ["server error"] });
          throw error;
        }
        if (results.length !== 0) {
          console.log(results);
          res.json({ "data_user": ["Username modified"] });
        } else {
          console.log("Email not modified");
          res.json({ "data_user": ["Username not modified"] });
        }
      });
      
    }
    /*
    if(modifyParameter==3){
      QueryModifyPassword = "UPDATE users SET pass = "+newPassword+"WHERE username = "+username+"";
      //execute query
      utils.pool.query(QueryModifyPassword, function (error, results, fields) {
        if (error){
          res.json({ "data_user": ["user not found"] });
          throw error;
        }
        else{
          if(results.length!=0){
            //debugging
            console.log(results)
            //send user data to client
            res.json({ "data_user": ["password modified"] });
          }
        }
      });
    }
    */
    if(modifyParameter=='1'){
      QueryModifyEmail = "UPDATE users SET email = '" + newEmail + "' WHERE username = '" + username + "'";
      //execute query
      utils.pool.query(QueryModifyEmail, function (error, results, fields) {
        if (error){
          res.status(500).json({ "data_user": ["server error"] });
          throw error;
        }
        if (results.length !== 0) {
          console.log(results);
          res.json({ "data_user": ["email modified"] });
        } else {
          console.log("Email not modified");
          res.json({ "data_user": ["email not modified"] });
        }
      });
    }
    if(modifyParameter=='4'){
      QueryModifyAddress = "UPDATE users SET address = '" + newAddress + "' WHERE username = '" + username + "'";
      //execute query
      utils.pool.query(QueryModifyAddress, function (error, results, fields) {
        if (error){
          res.status(500).json({ "data_user": ["server error"] });
          throw error;
        }
        if (results.length !== 0) {
          console.log(results);
          res.json({ "data_user": ["Address modified"] });
        } else {
          console.log("Address not modified");
          res.json({ "data_user": ["Address not modified"] });
        }
      });
    }
    if(modifyParameter=='2'){
      QueryModifyPhone = "UPDATE users SET phoneNumber = '" + newPhone + "' WHERE username = '" + username + "'";
      //execute query
      utils.pool.query(QueryModifyPhone, function (error, results, fields) {
        if (error){
          res.status(500).json({ "data_user": ["server error"] });
          throw error;
        }
        if (results.length !== 0) {
          console.log(results);
          res.json({ "data_user": ["Phone modified"] });
        } else {
          console.log("Phone not modified");
          res.json({ "data_user": ["Phone not modified"] });
        }
      });
    }
    if(modifyParameter=='5'){
      QueryModifyPayment = "UPDATE users SET paymentMethod = '"+newPayment+"'WHERE username = '"+username+"'";
      //execute query
      utils.pool.query(QueryModifyPayment, function (error, results, fields) {
        if (error){
          res.status(500).json({ "data_user": ["server error"] });
          throw error;
        }
        if (results.length !== 0) {
          console.log(results);
          res.json({ "data_user": ["Payment modified"] });
        } else {
          console.log("Payment not modified");
          res.json({ "data_user": ["Payment not modified"] });
        }
      });
    }

  }

});


//----------------- myoffers page -------------------------
app.get("/myoffers", (req, res) => {
  res.json({ "users": ["userOne","userTwo", "userThree"] });
});

//---------------- myauctions page ------------------------
app.post("/myauctions", (req, res) => {
  const { username } = req.body;

  //Control the Auction of the User in the Database
  QueryUsername = 'SELECT * FROM auctions WHERE creatorUsername="' + username + '"';

  //execute query
  utils.pool.query(QueryUsername, function (error, results, fields) {
    if (error) throw error;
    else{
      console.log(results);
      console.log(results.length);
      if(results.length!=0){
        console.log("Returning the User's Auction");
        res.json(results)
      }
    }
  });

});





app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
