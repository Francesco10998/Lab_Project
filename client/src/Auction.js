import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './css/Auction.css';
import trending from "./images/trending.png"
import iphone from "./images/iphone.jpg"

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

      <div class="container">
        <div class="left-column">
            <div class="thumbnail-images">
                <img class="thumbnail-image" src={iphone} alt="Thumbnail 1" onclick="changeImage('thumbnail1.jpg')"/>
                <img class="thumbnail-image" src={iphone} alt="Thumbnail 2" onclick="changeImage('thumbnail2.jpg')"/>
                <img class="thumbnail-image" src={iphone} alt="Thumbnail 3" onclick="changeImage('thumbnail3.jpg')"/>
                <img class="thumbnail-image" src={iphone} alt="Thumbnail 4" onclick="changeImage('thumbnail4.jpg')"/>
                <img class="thumbnail-image" src={iphone} alt="Thumbnail 5" onclick="changeImage('thumbnail5.jpg')"/>
            </div>
            <img class="main-image" src={iphone} alt="Oggetto in vendita"/>          
        </div>

        <div class="right-column">
            <h2>Seller: Nome Seller</h2>
            <h2>Iphone 14</h2>
            <h3>Ends in <span class="timer">XX hours</span></h3>
            <p>Dettagli dell'oggetto...</p>
            <p>Leading offer: 500$</p>
            <p>Current winner: Fede11</p>
            <p>Gestione della Bet: 10</p>
        </div>
    </div>

  </div>
  )
}
export default Auction;
