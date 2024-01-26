import { Link, Navigate, useRouteLoaderData } from "react-router-dom";
import React, { useEffect,useState } from 'react';
import './css/Settings.css';
import trending from "./images/trending.png"
import card from "./images/Card.png"

const Settings = () => {

  const [data, setData] = useState(null);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [pay, setPay] = useState('');
  const [username, setUsername] = useState('');
  const [mode,setMode] = useState('');
  const [parameter, setParameter] = useState('');
  const [counter, setCounter] = useState(0);
  let newParameter ='1';

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const submitChange = async (event) => {

    const newMode = 'modify';

    if(event.target.id=='usernameSubmit'){
      newParameter = '0';
      console.log('Username cambiato');
    }
    if(event.target.id=='emailSubmit'){
      newParameter = '1';
      console.log('email cambiata');
    }
    if(event.target.id=='phoneSubmit'){
      newParameter = '2';
      console.log('telefono cambiato');
    }
    if(event.target.id=='addressSubmit'){
      newParameter = '4';
      console.log('Indirizzo cambiato');
    }
    if(event.target.id=='paymentSubmit'){
      newParameter = '5';
      console.log('IBAN cambiato');
    }



    try {
      const response = await fetch('/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://localhost:8000',
          // Add other headers if necessary
        },
        body: JSON.stringify({
          mode : newMode,
          username: username,
          modifyParameter : newParameter,
          newUsername : username,
          newEmail : email,
          newAddress : address,
          newPhone :phone,
          newPayment : pay,

        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = await response.json();
      console.log(parameter,email,result);

    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
    
  };
 
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleIbanChange = (event) => {
    setPay(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

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

  const Display = async () => {

    console.log(mode,username);
    setUsername(sessionStorage.getItem('userData'));
    

    try {
      const response = await fetch('/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://localhost:8000',
          // Add other headers if necessary
        },
        body: JSON.stringify({
          mode : "enter",
          username: username,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = await response.json();
      console.log(result);

      setEmail(result.data_user[0]['email']);
      setPassword('password');
      setPay(result.data_user[0]['paymentMethod']);
      setPhone(result.data_user[0]['phoneNumber']);
      setAddress(result.data_user[0]['address']);
      console.log(password);

    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }

  }

  useEffect(() =>{
    if (counter < 2) {
      Display();
      setCounter(counter + 1);
    }
  }, [counter]);


  return (<div>
      <Titolo/>
      <Navbar/>

      <div class="form-container">
        <h1>Profile Info</h1>

        <div class="form-group">
          <label class="label" for="username">Username:</label>
          <input type="text" id="username" value={username} style={{width:'300px'}} onChange={handleUsernameChange} name="username" required />
          <button type="submit" class="button" id="usernameSubmit"onClick={submitChange}>Change</button>
        </div>

        <div class="form-group">
          <label class="label" for="email">Email:</label>
          <input type="email" id="email" value={email} style={{width:'300px'}} onChange={handleEmailChange} name="email" required />
          <button type="submit" class="button" id="emailSubmit"onClick={submitChange}>Change</button>
        </div>

        <div class="form-group">
          <label class="label" for="phone">Phone Number:</label>
          <input type="tel" id="phone"value={phone} style={{width:'300px'}} onChange={handlePhoneChange} name="phone" required />
          <button type="submit" class="button" id="phoneSubmit" onClick={submitChange}>Change</button>
        </div>

        <div class="form-group">
          <label class="label" for="password">Password:</label>
          <input type="password" value={password} style={{width:'300px'}} id="password" name="password" required />
          <button type="submit" class="button" id="passwordSubmit"onClick={submitChange}>Change</button>
        </div>

        <div class="form-group">
          <label class="label" for="address">Address:</label>
          <input type="text" value={address} style={{width:'300px'}}  onChange={handleAddressChange}id="address" name="address" required />
          <button type="submit" class="button" id="addressSubmit"onClick={submitChange}>Change</button>
        </div>
      </div>


      <div class="payment-container">
        <h1>Payment Method</h1>

        <img src={card} alt="Credit Card" class="payment-image" style={{height:'200px', marginTop:'25px'}}/>

        <div class="form-group" style={{marginTop:'35px'}}>
          <label class="label" for="iban">IBAN:</label>
          <input type="text" id="payment" value={pay} style={{width:'300px'}} onChange={handleIbanChange} name="payment" required />
          <button type="submit" class="button" id="paymentSubmit"onClick={submitChange}>Change</button>
        </div>
      </div>

  </div>
  )
}
export default Settings;
