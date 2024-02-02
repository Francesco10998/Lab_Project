import { Link, Navigate } from "react-router-dom";
import React, { useEffect,useState } from 'react';
import './css/Register.css';
import trending from "./images/trending.png"

const Register = () => {
  const [username, setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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
      <Link className="register" to="/register">Register</Link>
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


  const handleSubmit = async () => {

    try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://localhost:8000',
            // Add other headers if necessary
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        });
        
        console.log(username,password);
  
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
  
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

  };

  return (
    <div>
      <Titolo/>
      <Navbar/>
      <div className="title" style={{margin:'auto'}}>
      <div style={{margin:'auto'}}>
        <br />
        <br />
        <h2>Register</h2>
        <form className='loginform' onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" value={username} onChange={handleUsernameChange} required />
          <input type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} required />
          <input type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
          <input type="submit" value="Submit" style={{ backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }} />
        </form>
      </div>
      </div>
    </div>
  )
}
export default Register;
