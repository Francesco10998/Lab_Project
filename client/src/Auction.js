import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './css/Auction.css';
import trending from "./images/trending.png"
import iphone from "./images/iphone.jpg"
import time from "./images/time.png"

const Auction = () => {
  /*const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);
  const navigate = useNavigate();*/

  function Titolo(){
    return (
      <div style={{ textAlign: 'center',backgroundColor:'#333333',height:'30px'}}>
       <img src={trending} style={{height:'100px', width:'430px', margin:'auto', marginTop:'-15px'}}></img>
      </div>
    
    )
  }

  function Navbar(){
    return (<div className="topnav">
  <Link className="active" to="/login">Login</Link>
  <Link to="/settings">Settings</Link>
  <a href="#MyOffers">My Offers</a>
  <a href="/MyAuctions">My Auctions</a>
  <a href="/">Home</a>
  
      <form action="/search" method="get" style={{padding:'13px'}}>
        <input type="text" id="search" name="search" placeholder="Search..." style={{borderRadius:'10px'}}/>
        <input type="submit" value="Search"style={{borderRadius:'10px'}} />
      </form>
  
  </div>
  )
  }


  return (<div>
      <Titolo/>
      <Navbar/>

      <div id="auction-container">
        <div id="item-image">
            <img src={iphone} alt="Item Image" height="300"/>
        </div>
        <div id="item-details">
            <div id="first-row">
              <div id="item-name">Iphone 14</div>
              <img src={time} id="time-image" alt="Time Image" height="30"/>
              <div id="time-remaining">Ends in: 12 hrs</div>
            </div>
            <div id="seller-name">Seller: Luca Masi</div>
            <div id="item-description">Iphone 14 sealed in original box untouched, duplicate Gift.</div>
            <div id="leading-offer">Leading Offer: 500$</div>
            <div id="current-winner">Current Winner: Fede11</div>
            <div id="offer-row">
              <div id="offer-label">Make an offer:</div>
              <input type="text" id="bid-input" placeholder="00,00 $"></input>
              <input type="submit" id="bid-button" value="Surpass" style={{ backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }} />
            </div>
            <div id="condition">Offer will not be accepted if it is less or equal to the leading one*</div>
        </div>
    </div>

  </div>
  )
}
export default Auction;
