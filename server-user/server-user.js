const express = require("express");

const utils = require("./util");

const PORT = 6000;

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

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (emailRegex.test(email) && passwordRegex.test(password)) {
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
                        }
                    });
                    }
                }
                });
            }
            }
        });  
    }
    else{
        if (!emailRegex.test(email)) {
            res.json({ "results": ["Email not satisfies"] });
        }
        else{
            res.json({ "results": ["Password not satisfies"] });
        }
    }
});

//----------------- enter settings page ------------------------
app.post("/settings", (req, res) => {

let{mode,username,modifyParameter,newUsername,password,newPassword,newEmail,newAddress,newPhone,newPayment}= req.body;
console.log(mode,username,password,newPassword,modifyParameter);

//------when open setting return all the data react will put on the placeholder--------//
if(mode=="enter"){
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
    
    console.log(modifyParameter);

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
                res.json({ "data_user": ["username modified"] });
                } else {
                console.log("Username not modified");
                res.json({ "data_user": ["username not modified"] });
                }
            });
            }
        });
    }
    
    ///##################################### CHANGE EMAIL ###############################################
    else if(modifyParameter=='1'){

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (emailRegex.test(newEmail)) {
            console.log("L'indirizzo email è valido.");
            /// check if the new email already exist 
            QueryCheckNewEmail = "SELECT * FROM users where email = '"+newEmail+"'";
            utils.pool.query(QueryCheckNewEmail, function (error, results, fields) {
                if (error){
                res.status(500).json({ "data_user": ["server error"] });
                throw error;
                }
                if (results.length !== 0) {
                //// ---------- email already exists -------------------
                console.log("Email not modified, already exists");
                res.json({ "data_user": ["email already exists"] });
                } else {
                /// -----------change the email --------------
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
            });
            }else{
            console.log("Email not satisfies the requirements");
            res.json({ "data_user": ["email not satisfies"] });
        }
    }

    ////################################## CHANGE PHONENUMBER ############################
    else if(modifyParameter=='2'){
        QueryModifyPhone = "UPDATE users SET phoneNumber = '" + newPhone + "' WHERE username = '" + username + "'";
        console.log("ARRIVATO DOPO QUERY PHONE");

        const regex = /^\d{1,9}$/;
        if (regex.test(newPhone)) {
            console.log('phone number valid');
            //execute query
            utils.pool.query(QueryModifyPhone, function (error, results, fields) {
                if (error){
                    console.error("Error executing query:", error);
                    res.status(500).json({ "data_user": ["server error"] });
                } else if (results.affectedRows > 0) {
                    console.log("Phone modified");
                    res.json({ "data_user": ["Phone modified"] });
                } else {
                    console.log("Phone not modified");
                    res.json({ "data_user": ["Phone not modified"] });
                }
            });
        }
        else {
            console.log('Phone number not valid');
            res.json({ "data_user": ["Phone number not valid"] });
        }
    }
    ///################################ CHANGE PASSWORD ###################################
    else if(modifyParameter=='3'){
        const cryptoNew = utils.sha256(String(newPassword))
        const cryptoOld = utils.sha256(String(password))

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        
        if (passwordRegex.test(newPassword)) {
            console.log("La password è valida.");
            //check old password
            QueryExist = "SELECT username,pass FROM users WHERE username = '"+username+"'";
            utils.pool.query(QueryExist, function (error, results, fields) {
            if (error){
                res.status(500).json({ "data_user": ["server error"] });
                throw error;
            }
            if (results.length !== 0) {
                //console.log(results[0].pass,cryptoOld,cryptoNew);
                //update new password
                if(results[0].pass==cryptoOld){
                QueryModifyPassword = "UPDATE users SET pass = '" + cryptoNew + "' WHERE username = '" + username + "'";
                utils.pool.query(QueryModifyPassword, function (error, results, fields) {
                    if (error){
                    res.status(500).json({ "data_user": ["server error"] });
                    throw error;
                    }
                    if (results.length !== 0) {
                    console.log(results);
                    res.json({ "data_user": ["Password updated"] });
                    } else {
                    console.log("Password not modified");
                    res.json({ "data_user": ["Password mismatch"] });
                    }
                });
            } else {
                console.log("Password mismatch");
                res.json({ "data_user": ["Password mismatch"] });
            }
            }
            });
        }else{
            console.log("Password does not satisfies the requirements");
                res.json({ "data_user": ["Password not satisfies"] });
        }
    }

    //################################### CHANGE ADDRESS #############################
    else if(modifyParameter=='4'){
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
    
    ///################################ CHANGE PAYMENT METHOD ###################
    else if(modifyParameter=='5'){
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
    else if(modifyParameter=='6'){
        Query = "DELETE from users WHERE username='"+username+"'";
        //execute query
        utils.pool.query(Query, function (error, results, fields) {
            if (error){
                res.status(500).json({ "data_user": ["server error"] });
                throw error;
            }
            if (results.length !== 0) {
                console.log(results);
                res.json({ "data_user": ["User deleted"] });
            } else {
                console.log("User not deleted");
                res.json({ "data_user": ["User not deleted"] });
            }
        });
    }
    }
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});