import { Link, Navigate, useRouteLoaderData } from "react-router-dom";
import React, { useEffect,useState } from 'react';
import './css/Settings.css';
import trending from "./trending.png"
import card from "./Card.png"

const Settings = () => {

  const [data, setData] = useState(null);

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
  <Link to="/myauctions">My Auctions</Link>
  
      <form action="/search" method="get" style={{padding:'13px'}}>
        <input type="text" id="search" name="search" placeholder="Search..." style={{borderRadius:'10px'}}/>
        <input type="submit" value="Search"style={{borderRadius:'10px'}} />
      </form>
  
  </div>
  )
  }

  const username=sessionStorage.getItem('userData');
  const mode='enter';

  const Display = async () => {

    try {
      const response = await fetch('/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://localhost:8000',
          // Add other headers if necessary
        },
        body: JSON.stringify({
          mode : mode,
          username: username,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = response.json();
      console.log(result['PromiseResult']);

    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }

  }

  useEffect(() =>{
      Display();
  })




  return (<div>
      <Titolo/>
      <Navbar/>

      <div class="form-container">
        <h1>Profile Info</h1>

        <div class="form-group">
          <label class="label" for="username">Username:</label>
          <input type="text" id="username" style={{width:'300px'}} name="username" required />
          <button type="submit" class="button" id="usernameSubmit">Change</button>
        </div>

        <div class="form-group">
          <label class="label" for="email">Email:</label>
          <input type="email" id="email" style={{width:'300px'}} name="email" required />
          <button type="submit" class="button" id="emailSubmit">Change</button>
        </div>

        <div class="form-group">
          <label class="label" for="phone">Phone Number:</label>
          <input type="tel" id="phone" style={{width:'300px'}} name="phone" required />
          <button type="submit" class="button" id="phoneSubmit">Change</button>
        </div>

        <div class="form-group">
          <label class="label" for="password">Password:</label>
          <input type="password" style={{width:'300px'}} id="password" name="password" required />
          <button type="submit" class="button" id="passwordSubmit">Change</button>
        </div>

        <div class="form-group">
          <label class="label" for="address">Address:</label>
          <input type="text" style={{width:'300px'}} id="address" name="address" required />
          <button type="submit" class="button" id="addressSubmit">Change</button>
        </div>
      </div>


      <div class="payment-container">
        <h1>Payment Method</h1>

        <img src={card} alt="Credit Card" class="payment-image" style={{height:'200px', marginTop:'25px'}}/>

        <div class="form-group" style={{marginTop:'35px'}}>
          <label class="label" for="iban">IBAN:</label>
          <input type="text" id="payment" style={{width:'300px'}} name="payment" required />
          <button type="submit" class="button" id="paymentSubmit">Change</button>
        </div>
      </div>

  </div>
  )
}
export default Settings;
