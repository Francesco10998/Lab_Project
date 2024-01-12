import { Link, Navigate } from "react-router-dom";
import React, { useEffect,useState } from 'react';
import './css/Register.css';

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
    <div className="title">
    <div style={{margin:'auto'}}>
      <h2>Register</h2>
      <form className='loginform' onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={username} onChange={handleUsernameChange} required />
        <input type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} required />
        <input type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
        <input type="submit" value="Submit" style={{ backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }} />
      </form>
    </div>
    </div>
  )
}
export default Register;
