const amqp = require('amqplib/callback_api');

const utils = require("./util");

amqp.connect('amqp://rabbit:5672', (err, connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel((err, channel) => {
        if (err) {
            throw err;
        }

        let exchangeName = 'ExchangeOffer';
        let routingKey = 'Videogames'; // Chiave di instradamento per uno specifico worker

        channel.assertExchange(exchangeName, 'direct', {
            durable: false
        });

        channel.assertQueue('Videogames', {
            exclusive: false
        }, (err, q) => {
            if (err) {
                throw err;
            }

            channel.bindQueue(q.queue, exchangeName, routingKey);
            //channel.bindQueue(q.queue, exchangeName);

            channel.consume(q.queue, (msg) => {
                console.log(`Received: ${msg.content.toString()}`);

                message = JSON.parse(msg.content)

                Query = "UPDATE auctions SET bet = '"+message[0]+"', currentWinner= '"+message[1]+"'WHERE auctionId = '"+message[2]+"'";
                
                //execute query
                utils.pool.query(Query, function (error, results, fields) {
                    if (error){
                        throw error;
                    }
                    else{
                        //se è la prima volta che si fa l offerta viene aggiunto l username nel campo participants
                        if(message[3]>0){
                            Query2 = "UPDATE auctions SET participants = CONCAT(participants, ',"+message[1]+"') WHERE FIND_IN_SET('"+message[1]+"', participants) = 0 AND auctionId='"+message[2]+"'";
                            utils.pool.query(Query2, function (error, results, fields) {
                                if (error){
                                    throw error;
                                }
                                else{
                                    console.log("Offer changed");
                                }
                            });
                        }else{
                            Query2 = "UPDATE auctions SET participants ='"+message[1]+"'WHERE  auctionId='"+message[2]+"'";
                            utils.pool.query(Query2, function (error, results, fields) {
                                if (error){
                                    throw error;
                                }
                                else{
                                    console.log("Offer changed");
                                }
                            });
                        }
                    }
                });


                channel.ack(msg);
            }, {
                noAck: false
            });
        });
    });
});
