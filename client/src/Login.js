import { Link, Navigate } from "react-router-dom";
import React, { useEffect,useState } from 'react';
import './css/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add other headers if necessary
        },
        body: JSON.stringify({username: username,
          password: password,}),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);


  return (
    <div className="title">
    <div style={{margin:'auto'}}>
      <h2>Login</h2>
      <form className='loginform' onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={username} onChange={handleUsernameChange} required />
        <input type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
        <input type="submit" value="Login" style={{ backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }} />
      </form>
    </div>
    </div>
  )
}
export default Login;

