const express = require("express");

const utils = require("./util");

const amqp = require('amqplib/callback_api');

const PORT = 5000;

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

const multer = require('multer'); 
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

//----------------- app routing -------------------------

//------------------home page ---------------------------
app.post("/", (req, res) => {
  const { mode, id } = req.body;
  console.log(req.body)

  if(mode == "auctions"){
    //Control the Auctions in the Database
    //Query = 'SELECT * FROM auctions';

    const options = {
      timeZone: 'Europe/Rome', 
      hour12: false,
    };
    const data = new Date().toLocaleString('en-US', options);

    Query = "SELECT * FROM auctions WHERE finishingTime > STR_TO_DATE('"+data+"', '%m/%d/%Y, %H:%i:%s') ORDER BY ABS(DATEDIFF(finishingTime, STR_TO_DATE('"+data+"', '%m/%d/%Y, %H:%i:%s'))) LIMIT 6";

    console.log("QUERY "+Query);

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
  else if(mode == "item"){
    Query = 'SELECT * FROM items WHERE id="'+id+'"';

    //Execute Query
    utils.pool.query(Query, function (error, results, fields) {
      if (error) throw error;
      else{
        //console.log(results);
        //console.log(results.length);
        if(results.length!=0){
          console.log("Returning the User's Auction");
          res.json(results);
          console.log(results);
        }
      }
    });
  }
});


//----------------- myoffers page -------------------------
app.post("/myoffers", (req, res) => {
  const { mode, user, id } = req.body;

  if(mode == "auctions"){

    const options = {
      timeZone: 'Europe/Rome', 
      hour12: false,
    };
    const data = new Date().toLocaleString('en-US', options);

    Query = "SELECT * FROM auctions WHERE FIND_IN_SET('"+user+"', participants) > 0 ORDER BY ABS(DATEDIFF(finishingTime, STR_TO_DATE('"+data+"', '%m/%d/%Y, %H:%i:%s')))";

    console.log("QUERY "+Query);

    //Execute Query
    utils.pool.query(Query, function (error, results, fields) {
      if (error) throw error;
      else{
        //console.log("OFFER "+results);
        //console.log(results.length);
        if(results.length!=0){
          console.log("Returning the User's Auction");
          res.json(results)
          console.log(results);
        }
      }
    });
  }
  else if(mode == "item"){
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

//---------------- myauctions page ------------------------
app.post("/myauctions", (req, res) => {
  const { mode, user, id } = req.body;

  if(mode == "auctions"){
    //Control the Auctions in the Database
    //Query = 'SELECT * FROM auctions';

    const options = {
      timeZone: 'Europe/Rome', 
      hour12: false,
    };
    const data = new Date().toLocaleString('en-US', options);

    Query = "SELECT * FROM auctions WHERE creatorUsername='"+user+"' ORDER BY ABS(DATEDIFF(finishingTime, STR_TO_DATE('"+data+"', '%m/%d/%Y, %H:%i:%s')))";

    console.log("QUERY "+Query);

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
  else if(mode == "item"){
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


//---------------- auction page ------------------------
app.post("/auction", (req, res) => {
  const { mode, id } = req.body;

  if(mode == "auction"){
    Query = "SELECT * FROM auctions WHERE auctionId='"+id+"'";

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

//---------------- searchresults page ------------------------
app.post("/searchresults", (req, res) => {
  const { mode, searchText, id, cat } = req.body;
  console.log(req.body)

  if(mode == "auctions"){

    const options = {
      timeZone: 'Europe/Rome', 
      hour12: false,
    };
    const data = new Date().toLocaleString('en-US', options);

    Query = "SELECT * FROM auctions WHERE auctionId='"+id+"' AND finishingTime > STR_TO_DATE('"+data+"', '%m/%d/%Y, %H:%i:%s')";

    //Execute Query
    utils.pool.query(Query, function (error, results, fields) {
      if (error) throw error;
      else{
        //console.log(results);
        //console.log(results.length);
        if(results.length!=0){
          console.log("AUCTION");
          res.json(results)
          console.log(results);
        }
      }
    });
  }
  else if(mode == "items"){
    const options = {
      timeZone: 'Europe/Rome', 
      hour12: false,
    };
    const data = new Date().toLocaleString('en-US', options);
    
    if(cat=="all"){
      if(searchText==""){
        //Query = 'SELECT * FROM items LIMIT 6';
        Query = 'SELECT * FROM auctions INNER JOIN items ON auctions.AuctionId = items.id WHERE finishingTime > STR_TO_DATE("'+data+'", "%m/%d/%Y, %H:%i:%s") ORDER BY ABS(DATEDIFF(finishingTime, STR_TO_DATE("'+data+'", "%m/%d/%Y, %H:%i:%s"))) LIMIT 6';
      }
      else{
        Query = 'SELECT * FROM auctions INNER JOIN items ON auctions.AuctionId = items.id WHERE finishingTime > STR_TO_DATE("'+data+'", "%m/%d/%Y, %H:%i:%s") AND name LIKE "%' + searchText + '%" ORDER BY ABS(DATEDIFF(finishingTime, STR_TO_DATE("'+data+'", "%m/%d/%Y, %H:%i:%s"))) LIMIT 6';
        //Query = 'SELECT * FROM items WHERE name LIKE "%' + searchText + '%" LIMIT 6';
      }
    }
    else{
      if(searchText==""){
        Query = 'SELECT * FROM auctions INNER JOIN items ON auctions.AuctionId = items.id WHERE finishingTime > STR_TO_DATE("'+data+'", "%m/%d/%Y, %H:%i:%s") AND category="'+cat+'" ORDER BY ABS(DATEDIFF(finishingTime, STR_TO_DATE("'+data+'", "%m/%d/%Y, %H:%i:%s"))) LIMIT 6';
        //Query = 'SELECT * FROM items WHERE category="'+cat+'" LIMIT 6';
      }
      else{
        Query = 'SELECT * FROM auctions INNER JOIN items ON auctions.AuctionId = items.id WHERE finishingTime > STR_TO_DATE("'+data+'", "%m/%d/%Y, %H:%i:%s") AND name LIKE "%' + searchText + '%" AND category="'+cat+'" ORDER BY ABS(DATEDIFF(finishingTime, STR_TO_DATE("'+data+'", "%m/%d/%Y, %H:%i:%s"))) LIMIT 6';
        //Query = 'SELECT * FROM items WHERE category="'+cat+'" AND name LIKE "%' + searchText + '%" LIMIT 6';
      }
    }

    console.log("%%%%% "+Query);

    //Execute Query
    utils.pool.query(Query, function (error, results, fields) {
      if (error) throw error;
      else{
        //console.log(results);
        //console.log(results.length);
        if(results.length!=0){
          console.log("ITEMS");
          res.json(results);
          console.log(results);
        }
      }
    });
  }
});

//---------------- offer management ------------------------
app.post("/offer", (req, res) => {
  const { username, id, bet,current_bet, category } = req.body;
  console.log(req.body)

  Query = "SELECT bet FROM auctions where auctionId = '"+id+"'";
    utils.pool.query(Query, function (error, results, fields) {
        if (error){
          res.status(500).json({ "data_check": ["server error"] });
          console.log("aoooooooooooooooooooo");
          throw error;
        }
        if (results.length !== 0) {
          if(bet > results[0].bet){
            amqp.connect('amqp://rabbit:5672', (err, connection) => {
              if (err) {
                  throw err;
              }
              connection.createChannel((err, channel) => {
                  if (err) {
                      throw err;
                  }

                  let exchangeName = 'ExchangeOffer';
                  let routingKey = category.toString(); //Routing Key for a specific Worker
                  let arrayToSend = [bet, username.toString(), id, current_bet];

                  // Converti l'array in una stringa JSON
                  let message = JSON.stringify(arrayToSend);

                  channel.assertExchange(exchangeName, 'direct', {
                      durable: false
                  });

                  channel.publish(exchangeName, routingKey, Buffer.from(message));
                  console.log(`Sent message to worker with ID ${routingKey}`);

                  res.json({ "data_check": ["OK"] });

                  setTimeout(() => {
                      connection.close();
                  }, 1000);
              });
            });
          }
          else{
            res.json({ "data_check": ["offer already surpassed"] })
          }
        } 
        else {
          //If auction doesn't exists
        }
    });
});


//---------------- create auctions ------------------------
app.post("/createauctions", upload.single('image'), (req, res) => { 
  const formData = JSON.parse(req.body.postData);
  const imageBuffer = JSON.parse(req.body.image);

  const buffer = Buffer.from(imageBuffer);

  const options = {
    timeZone: 'Europe/Rome', 
    hour12: false,
  };
  const date = new Date().toLocaleString('en-US', options);

  const moment = require('moment');

  const startDate = moment(date, 'MM/DD/YYYY, HH:mm:ss').toDate();
 
  let { name, description, finishDate, category ,username} = formData; 
   
  const getMaxIdQuery = 'SELECT MAX(id) AS max_id FROM items'; 
 
  utils.pool.query(getMaxIdQuery, (error, results) => { 
    if (error) { 
      console.error('Errore nel recupero del massimo ID:', error); 
      res.status(500).json({ error: 'Internal Server Error' }); 
    } else { 
      const maxId = results[0].max_id || 0; // Se non ci sono record, imposta maxId a 0 
      console.log('Massimo ID:', maxId); 
      const QueryItem = 'INSERT INTO items (name,category , id ,description,image) VALUES (?, ?, ?, ?, ?)'; 
      utils.pool.query(QueryItem, [name,category , maxId+1 ,description, buffer], (error, results) => { 
        if (error) { 
          console.error('Errore nell\'inserimento dell\'oggetto nel database:', error); 
          res.status(500).json({ error: 'Internal Server Error' }); 
        } else { 
          console.log('Oggetto Item inserito nel database con successo!'); 
          console.log(results); 
 
          //query di auctions 
          const QueryAuction= 'INSERT INTO auctions (auctionID,bet,currentWinner,startingTime,finishingTime,creatorUsername,participants) VALUES (?, ?, ?, ?, ?,?,?)'; 
          utils.pool.query(QueryAuction, [maxId+1,0, null, startDate, finishDate,username,null], (error, results) => { 
            if (error) { 
              console.error('Errore nell\'inserimento dell\'oggetto nel database:', error); 
              res.status(500).json({ error: 'Internal Server Error' }); 
            } else { 
              console.log('Oggetto Auction inserito nel database con successo!'); 
              console.log(results); 
          // Puoi rispondere al client con un messaggio di successo o qualsiasi altra cosa sia necessaria 
              res.status(200).json({ success: true }); 
            } 
          }); 
        } 
      }); 
    } 
  });
 
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});