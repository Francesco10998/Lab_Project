import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './css/MyAuctions.css';
import trending from "./images/trending.png"
import iphone from "./images/iphone.jpg"

const MyAuctions = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);

  const handleLogout = () => {
    sessionStorage.removeItem('userData');
  };

  const Begin = async () => {
    setUsername(sessionStorage.getItem('userData'));
    try {
      const response = await fetch('/myauctions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://localhost:8000',
          // Add other headers if necessary
        },
        body: JSON.stringify({
          username: username
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = await response.json();
      setData(result);

      console.log(result.length);

    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() =>{
    if (counter < 2) {
      Begin();
      setCounter(counter + 1);
    }
  }, [counter]);


  function Titolo(){
    return (
      <div style={{ textAlign: 'center',backgroundColor:'#333333',height:'30px'}}>
       <img src={trending} style={{height:'100px', width:'430px', margin:'auto', marginTop:'-15px'}}></img>
      </div>
    
    )
  }

  function NavbarLogged(){
    return (<div className="topnav">
      <a href="/" onClick={handleLogout} class="logout">Logout</a>
      <a class="username">{username}</a>
      <Link to="/settings">Settings</Link>
      <a href="MyOffers">My Offers</a>
      <a href="MyAuctions">My Auctions</a>
      <a href="/">Home</a>

      <form action="/search" method="get" style={{padding:'13px'}}>
        <input type="text" id="search" name="search" placeholder="Search..." style={{borderRadius:'10px'}}/>
        <input type="submit" value="Search"style={{borderRadius:'10px'}} />
      </form>

    </div>
    )
  }

  function showAuctions(){
    return(
      <div id="auction-container">
          <div class="auction-item">
            <img src={iphone} class="image"></img>
            <div class="item-details">
              <h3 class="object">Iphone</h3>
              <p class="bet">Current Bet: $100</p>
              <p class="deadline">Ends in 7 hrs</p>
            </div>
          </div>
      </div>   
    )
  }


  return (<div>
      <Titolo/>
      <NavbarLogged/>
      <h1 class="title">My Auctions</h1>
      {showAuctions()}
  </div>
  )
}
export default MyAuctions;


/*
<div id="auction-container">
            <div class="auction-item">
              <img src={iphone} class="image"></img>
              <div class="item-details">
                <h3 class="object">Iphone 14</h3>
                <p class="bet">Current Bet: $100</p>
                <p class="deadline">Ends in 7 hrs</p>
              </div>
            </div>
        </div>   
      )
*/