create table users(
username varchar(255) ,
email varchar(255) ,
pass varchar(255) ,
address varchar(255) ,
phoneNumber int ,
paymentMethod varchar(255)
);

create table auctions(
auctionId int ,
bet float ,
currentWinner varchar(255) ,
startingTime datetime ,
finishingTime datetime ,
creatorUsername varchar(255) ,
participants text
);

create table items(
name varchar(255) ,
category varchar(255) ,
id int ,
description varchar(1000) ,
image longblob
);