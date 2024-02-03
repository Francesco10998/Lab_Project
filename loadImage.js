//This part is used for adding an image to DB
const fs = require('fs');

// Inserisci un nuovo utente con immagine
const image1Path = '../client/src/images/iphone.jpg';
const image1Content = fs.readFileSync(image1Path);

// Converti l'immagine in formato base64
//const image1Base64 = Buffer.from(image1Content).toString('base64');
//console.log(image1Base64);

const query1 = 'UPDATE items SET image = ?';

//execute query
utils.pool.query(query1, [image1Content], function (error, results, fields) {
  if (error) throw error;
  else{
    console.log(results);
    console.log(results.length);
    if(results.length!=0){
      console.log("Returning the User's Auction");
    }
  }
});