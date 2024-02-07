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
        Query = 'SELECT * FROM auctions INNER JOIN items ON auctions.AuctionId = items.id WHERE finishingTime > STR_TO_DATE("'+data+'", "%m/%d/%Y, %H:%i:%s") LIMIT 6';
      }
      else{
        Query = 'SELECT * FROM auctions INNER JOIN items ON auctions.AuctionId = items.id WHERE finishingTime > STR_TO_DATE("'+data+'", "%m/%d/%Y, %H:%i:%s") AND name LIKE "%' + searchText + '%" LIMIT 6';
        //Query = 'SELECT * FROM items WHERE name LIKE "%' + searchText + '%" LIMIT 6';
      }
    }
    else{
      if(searchText==""){
        Query = 'SELECT * FROM auctions INNER JOIN items ON auctions.AuctionId = items.id WHERE finishingTime > STR_TO_DATE("'+data+'", "%m/%d/%Y, %H:%i:%s") AND category="'+cat+'" LIMIT 6';
        //Query = 'SELECT * FROM items WHERE category="'+cat+'" LIMIT 6';
      }
      else{
        Query = 'SELECT * FROM auctions INNER JOIN items ON auctions.AuctionId = items.id WHERE finishingTime > STR_TO_DATE("'+data+'", "%m/%d/%Y, %H:%i:%s") AND name LIKE "%' + searchText + '%" AND category="'+cat+'" LIMIT 6';
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
  const { username, id, bet, category } = req.body;
  console.log(req.body)

  amqp.connect('amqp://localhost:5672', (err, connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel((err, channel) => {
        if (err) {
            throw err;
        }

        let exchangeName = 'ExchangeOffer';
        let routingKey = category.toString(); //Routing Key for a specific Worker
        let arrayToSend = [bet, username.toString(), id];

        // Converti l'array in una stringa JSON
        let message = JSON.stringify(arrayToSend);

        channel.assertExchange(exchangeName, 'direct', {
            durable: false
        });

        channel.publish(exchangeName, routingKey, Buffer.from(message));
        console.log(`Sent message to worker with ID ${routingKey}`);

        res.json("OK");

        setTimeout(() => {
            connection.close();
        }, 1000);
    });
  });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
