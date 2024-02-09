import { Link, Navigate, useRouteLoaderData } from "react-router-dom";
import {React, useEffect, useState } from 'react';
import './css/Settings.css';
import golden from "./images/goldenauctions.png"
import card from "./images/Card.png"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {

  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState("");
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [pay, setPay] = useState('');
  const [username, setUsername] = useState(sessionStorage.getItem('userData'));
  const [oldUsername, setOldUsername] = useState('');
  const [mode,setMode] = useState('');
  const [parameter, setParameter] = useState('');
  const [counter, setCounter] = useState(0);
  let newParameter ='1';

  const [isPopupVisible, setPopupVisibility] = useState(false);

  const openPopup = () => {
    setPopupVisibility(true);
  };

  const closePopup = () => {
    setPopupVisibility(false);
  };


  const handleOldPasswordChange = (e) => {
    console.log("Old Password Change:", e.target.value);
    setOldPassword(e.target.value);
  };
  
  const handleNewPasswordChange = (e) => {
    console.log("New Password Change:", e.target.value);
    setNewPassword(e.target.value);
  };


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userData');
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
    if(event.target.id=='passwordSubmit'){
      newParameter = '3';
      console.log('Cambio password richiesto');
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
          username: oldUsername,
          modifyParameter : newParameter,
          newUsername : username,
          password: oldPassword,
          newPassword: newPassword,
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

      //-------------------------------check server response to visualize error ------------------------------
      //check the server response for the username
      if(newParameter==0){ 
        if(result.data_user[0]==["username modified"]){
          //update the variable oldusername to contain the old current user appena sostituito da newusername
          sessionStorage.setItem('userData',result.data_user[0]);
          setOldUsername(username);
          toast.success('Username updated!',{
            position: 'top-left',
          });
        }
        else if(result.data_user[0]==["username not modified"]){
          toast.error('Username not updated!',{
            position: 'top-left',
          });
        }else{
          toast.error("Username inserted not respected the following rules.",{
            position: 'top-left',
          });
        }
      }

      //check the server response for the email 
      if(newParameter==1){
        if(result.data_user[0]==["email modified"]){
          toast.success('Email updated!',{
            position: 'top-left',
          });
        }
        else if(result.data_user[0]==["email already exists"]){
          toast.error("Email already exists!",{
            position: 'top-left',
          });
        }else if(result.data_user[0]==["email not satisfies"]){
          toast.error("Email inserted doesn't respected the rules.",{
            position: 'top-left',
          });
        }else{
          toast.error("Email inserted is wrong",{
            position: 'top-left',
          });
        }
      }

      //check the server response for the phone number 
      if(newParameter==2){
        if(result.data_user[0]==["Phone modified"]){
          toast.success('Phone number updated!',{
            position: 'top-left',
          });
        }else{
          toast.error("Phone number is wrong",{
            position: 'top-left',
          });
        }
      }

      //check the server response for the address 
      if(newParameter==4){
        if(result.data_user[0]==["Address modified"]){
          // Set to 10sec
          toast.success('Address updated!',{
            position: 'top-left',
          });
        }else{
          toast.error('Address not updated!',{
            position: 'bottom-right',
          });
        }
      }

      //check the server response for the payment method 
      if(newParameter==5){
        if(result.data_user[0]==["Payment modified"]){
          toast.success('Payment method updated!',{
            position: 'top-left',
          });
        }else{
          toast.error('Address not updated!',{
            position: 'top-left',
          });
        }
      }

      // check server response for the password
      if(newParameter==3){
        if(result.data_user[0]==["Password mismatch"]){
          toast.error('Old password is wrong!',{
            position: 'top-left',
          });
        }
        else if(result.data_user[0]==["Password not satisfies"]){
          toast.error("Password doesn't satisfies requirements!",{
            position: 'top-left',
          });
        }else if(result.data_user[0]==["Password updated"]){
          toast.success('Pasword updated!',{
            position: 'top-left',
          });
        }else{
          toast.error('Password not updated!',{
            position: 'top-left',
          });
        }
      }
      ///--------------------------------------------------------------------------------------------
      console.log(parameter,email,result,sessionStorage.getItem('userData'));

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
        <img src={golden} style={{height:'70px', width:'400px', margin:'auto', marginTop:'5px'}}></img>
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

      <form action="/searchresults" method="get" style={{padding:'13px'}}>
        <input type="text" id="searchText" name="searchText" placeholder="Search..." style={{borderRadius:'10px'}}/>
        <select id="category" name="category" style={{borderRadius:'10px'}}>
          <option value="all"selected>All</option>
          <option value="tech">Tech</option>
          <option value="videogames">Videogames</option>
          <option value="books">Books</option>
        </select>
        <input type="submit" value="Search"style={{borderRadius:'10px'}} />
      </form>

    </div>
    )
  }

  const Display = async () => {

    console.log(mode,username);
    setUsername(sessionStorage.getItem('userData'));
    setOldUsername(sessionStorage.getItem('userData'));


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
    console.log("CANSU");
    if (counter < 2) {
      Display();
      setCounter(counter + 1);
    }
  }, [counter]);

  function Popupper(){
    return (
      <div>
        <Popup
          open={isPopupVisible}
          onClose={closePopup}
          modal
          closeOnDocumentClick
        >
          <div>
            <label htmlFor="oldPassword">Vecchia Password:</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={handleOldPasswordChange}
            />
  
            <label htmlFor="newPassword">Nuova Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
  
            <button id="passwordSubmit"onClick={submitChange}>Cambia Password</button>
            <button onClick={closePopup}>Annulla</button>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          </div>
        </Popup>
      </div>
    );
  };


  return (<div>
      <Titolo/>
      <NavbarLogged/>

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
          <button type="submit" class="button" onClick={openPopup}>Change</button>
        </div>

        {Popupper()}

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

      <ToastContainer />

  </div>
  )
}
export default Settings;